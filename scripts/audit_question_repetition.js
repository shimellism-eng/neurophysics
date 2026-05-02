#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const manifestPath = path.join(dataRoot, 'manifest.json')
const reportOnly = process.argv.includes('--report-only')
const qualityRules = {
  duplicateIds: 0,
  duplicateExactStems: 0,
  nearDuplicateStems: 0,
  correctAnswerMismatches: 0,
  missingFromAll: 0,
  changedVsAll: 0,
}
const strictSchemaKeys = [
  'id',
  'examBoard',
  'subject',
  'topic',
  'topicSlug',
  'subtopic',
  'subtopicSlug',
  'conceptFamily',
  'difficulty',
  'responseMode',
  'patternId',
  'contextType',
  'skill',
  'stem',
  'options',
  'correctAnswer',
  'correctIndex',
  'explanation',
  'misconceptionTag',
  'diagramJson',
  'authorNotes',
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function resolveDataPath(value) {
  return path.join(root, 'public', value.replace(/^\//, ''))
}

function questionText(question) {
  return String(question.stem || question.question || '').trim()
}

function normalizeExact(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

function normalizeNear(value) {
  return normalizeExact(value)
    .replace(/\b\d+(?:\.\d+)?\b/g, '#')
    .replace(/\b(?:m\/s\^?2|m\/s|cm|mm|km|kg|g|nm|j|n|w|pa|v|a|hz|kwh|s|m)\b/g, 'unit')
    .replace(/[^a-z#\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function groupBy(items, keyFn) {
  const groups = new Map()
  for (const item of items) {
    const key = keyFn(item)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(item)
  }
  return [...groups.entries()]
    .filter(([, values]) => values.length > 1)
    .sort((a, b) => b[1].length - a[1].length || String(a[0]).localeCompare(String(b[0])))
}

function countBy(items, keyFn) {
  const counts = new Map()
  for (const item of items) {
    const key = keyFn(item) || '__MISSING__'
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
}

function summarizeSchema(questions) {
  const summary = {
    strict: 0,
    strictPlusRuntimeExtras: 0,
    missingStrictKeys: 0,
    answerMismatches: [],
    optionLengths: new Map(),
  }

  for (const question of questions) {
    const keys = Object.keys(question)
    const missing = strictSchemaKeys.filter((key) => !(key in question))
    const extras = keys.filter((key) => !strictSchemaKeys.includes(key))
    const exactOrder = keys.length === strictSchemaKeys.length && strictSchemaKeys.every((key, index) => keys[index] === key)

    if (!missing.length && !extras.length && exactOrder) summary.strict += 1
    if (!missing.length && extras.length) summary.strictPlusRuntimeExtras += 1
    if (missing.length) summary.missingStrictKeys += 1

    if (Array.isArray(question.options)) {
      summary.optionLengths.set(question.options.length, (summary.optionLengths.get(question.options.length) || 0) + 1)
      if (question.correctAnswer !== question.options[question.correctIndex]) {
        summary.answerMismatches.push(question.id)
      }
    } else {
      summary.optionLengths.set('not-array', (summary.optionLengths.get('not-array') || 0) + 1)
      summary.answerMismatches.push(question.id)
    }
  }

  return {
    ...summary,
    optionLengths: [...summary.optionLengths.entries()],
  }
}

function summarizeQuestions(label, questions) {
  const duplicateIds = groupBy(questions, (question) => question.id)
  const duplicateStems = groupBy(questions, (question) => normalizeExact(questionText(question)))
  const nearDuplicateStems = groupBy(questions, (question) => normalizeNear(questionText(question)))
  const repeatedOptions = groupBy(questions, (question) => JSON.stringify(question.options || []))
  const schema = summarizeSchema(questions)

  console.log(`\n## ${label}`)
  console.log(`questions: ${questions.length}`)
  console.log(`duplicate IDs: ${duplicateIds.length}`)
  console.log(`duplicate exact stems: ${duplicateStems.length}`)
  console.log(`near-duplicate stems: ${nearDuplicateStems.length}`)
  console.log(`repeated option sets: ${repeatedOptions.length}`)
  console.log(`correctAnswer mismatches: ${schema.answerMismatches.length}`)
  console.log(`schema strict: ${schema.strict}`)
  console.log(`schema strict + runtime extras: ${schema.strictPlusRuntimeExtras}`)
  console.log(`schema missing strict keys: ${schema.missingStrictKeys}`)
  console.log(`option lengths: ${JSON.stringify(schema.optionLengths)}`)

  const printGroups = (title, groups) => {
    console.log(`${title}:`)
    for (const [key, values] of groups.slice(0, 8)) {
      const ids = values.slice(0, 8).map((question) => question.id).join(', ')
      console.log(`  - ${values.length}x ${key || '__EMPTY__'} :: ${ids}`)
    }
  }

  printGroups('top duplicate exact stems', duplicateStems)
  printGroups('top near-duplicate stems', nearDuplicateStems)
  printGroups('top repeated options', repeatedOptions)

  console.log('topic distribution:')
  for (const [topic, count] of countBy(questions, (question) => question.topic).slice(0, 12)) {
    console.log(`  - ${topic}: ${count}`)
  }

  console.log('subtopic distribution:')
  for (const [subtopic, count] of countBy(questions, (question) => question.subtopic).slice(0, 12)) {
    console.log(`  - ${subtopic}: ${count}`)
  }

  return {
    duplicateIds: duplicateIds.length,
    duplicateExactStems: duplicateStems.length,
    nearDuplicateStems: nearDuplicateStems.length,
    repeatedOptions: repeatedOptions.length,
    correctAnswerMismatches: schema.answerMismatches.length,
  }
}

function compareAllWithTopicFiles(manifest, boardId, allQuestions) {
  const allById = new Map(allQuestions.map((question) => [question.id, question]))
  const topicEntries = Object.entries(manifest.boards?.[boardId]?.topics || {})
  let missingInAll = 0
  let changedInAll = 0
  let topicOnlyCount = 0

  for (const [topicKey, topicPath] of topicEntries) {
    const payload = readJson(resolveDataPath(topicPath))
    const topicQuestions = payload.questions || []
    topicOnlyCount += topicQuestions.length
    const missing = []
    const changed = []

    for (const question of topicQuestions) {
      const fromAll = allById.get(question.id)
      if (!fromAll) missing.push(question.id)
      else if (JSON.stringify(fromAll) !== JSON.stringify(question)) changed.push(question.id)
    }

    missingInAll += missing.length
    changedInAll += changed.length
    if (missing.length || changed.length) {
      console.log(`  - ${boardId}/${topicKey}: missingInAll=${missing.length}, changedInAll=${changed.length}`)
      if (missing.length) console.log(`    missing sample: ${missing.slice(0, 8).join(', ')}`)
      if (changed.length) console.log(`    changed sample: ${changed.slice(0, 8).join(', ')}`)
    }
  }

  console.log(`  topic-file question references: ${topicOnlyCount}`)
  console.log(`  missing from all.json: ${missingInAll}`)
  console.log(`  changed vs all.json: ${changedInAll}`)

  return {
    missingFromAll: missingInAll,
    changedVsAll: changedInAll,
  }
}

function collectFailures(boardId, summary, topicFileSummary) {
  const failures = []
  const metrics = { ...summary, ...topicFileSummary }

  for (const [metric, maxAllowed] of Object.entries(qualityRules)) {
    if ((metrics[metric] || 0) > maxAllowed) {
      failures.push(`${boardId}: ${metric}=${metrics[metric]} > ${maxAllowed}`)
    }
  }

  return failures
}

function main() {
  const manifest = readJson(manifestPath)
  const failures = []
  console.log(`# Question repetition audit`)
  console.log(`manifest generatedAt: ${manifest.generatedAt || 'unknown'}`)
  console.log(`manifest total: ${manifest.counts?.total ?? 'unknown'}`)

  for (const boardId of Object.keys(manifest.boards || {})) {
    const board = manifest.boards[boardId]
    const allPayload = readJson(resolveDataPath(board.all))
    const allQuestions = allPayload.questions || []
    const questionSummary = summarizeQuestions(`${boardId}/all.json`, allQuestions)
    console.log(`\n## ${boardId}/all.json vs topic files`)
    const topicFileSummary = compareAllWithTopicFiles(manifest, boardId, allQuestions)
    failures.push(...collectFailures(boardId, questionSummary, topicFileSummary))
  }

  if (failures.length) {
    console.error(`\n## Quality gate failed`)
    for (const failure of failures) {
      console.error(`  - ${failure}`)
    }
    if (!reportOnly) {
      process.exitCode = 1
    }
    return
  }

  console.log(`\n## Quality gate passed`)
}

main()
