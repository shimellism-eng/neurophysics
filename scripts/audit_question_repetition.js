#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ADAPTIVE_SPEC_MANIFESTS } from '../src/data/adaptiveQuestionSource/specManifests.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const manifestPath = path.join(dataRoot, 'manifest.json')
const reportOnly = process.argv.includes('--report-only')
const qualityRules = {
  duplicateIds: 0,
  duplicateExactStems: 0,
  nearDuplicateStems: 0,
  repeatedOptions: 0,
  correctAnswerMismatches: 0,
  missingQualityMetadata: 0,
  invalidReviewStatus: 0,
  placeholderOptions: 0,
  weakBoilerplateStems: 0,
  scaffoldedAuthoredText: 0,
  overusedObjectiveBuckets: 0,
  overusedAuthoredCorrectObjectiveBuckets: 0,
  duplicateAuthoredDiagramStemPatterns: 0,
  duplicateExplanations: 0,
  missingSpecEntries: 0,
  missingFromAll: 0,
  changedVsAll: 0,
}
const scaffoldedTextPattern = /learning objective|common mix-up|demand focus|use the wording carefully|which option best separates|this exact GCSE Physics idea|the mark scheme is testing|\bfor [^:,.?!]+[:,]\s*(it means|this would mean|the statement|the option|the answer|the claim)|\bmisconception\b/i
const requiredQualityKeys = [
  'specRef',
  'specStatement',
  'paper',
  'courseAvailability',
  'tier',
  'learningObjective',
  'assessmentObjective',
  'demand',
  'commandWord',
  'responseMode',
  'patternId',
  'conceptFamily',
  'contextType',
  'misconceptionTag',
  'authorNotes',
  'review',
]
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
    missingQualityMetadata: [],
    invalidReviewStatus: [],
    placeholderOptions: [],
    weakBoilerplateStems: [],
    scaffoldedAuthoredText: [],
    overusedObjectiveBuckets: [],
    overusedAuthoredCorrectObjectiveBuckets: [],
    duplicateAuthoredDiagramStemPatterns: [],
    duplicateExplanations: [],
    answerMismatches: [],
    optionLengths: new Map(),
  }
  const objectiveBuckets = new Map()
  const authoredCorrectObjectiveBuckets = new Map()
  const authoredDiagramStemPatterns = new Map()
  const explanations = new Map()

  for (const question of questions) {
    const isAuthored = question.review?.source === 'authored' || String(question.patternId || '').startsWith('authored:')
    const keys = Object.keys(question)
    const missing = strictSchemaKeys.filter((key) => !(key in question))
    const extras = keys.filter((key) => !strictSchemaKeys.includes(key))
    const exactOrder = keys.length === strictSchemaKeys.length && strictSchemaKeys.every((key, index) => keys[index] === key)

    if (!missing.length && !extras.length && exactOrder) summary.strict += 1
    if (!missing.length && extras.length) summary.strictPlusRuntimeExtras += 1
    if (missing.length) summary.missingStrictKeys += 1

    const missingQuality = requiredQualityKeys.filter((key) => {
      const value = question[key]
      if (value == null || value === '') return true
      if (key === 'courseAvailability') return !Array.isArray(value) || value.length === 0
      if (key === 'learningObjective') return !value?.id || !value?.statement
      if (key === 'review') return !value?.status
      return false
    })
    if (missingQuality.length) {
      summary.missingQualityMetadata.push(`${question.id}:${missingQuality.join(',')}`)
    }

    if (question.review?.status !== 'reviewed') {
      summary.invalidReviewStatus.push(question.id)
    }

    const text = questionText(question)
    if (/\b(a learner uses|choose the best answer|test a common misconception)\b/i.test(text)) {
      summary.weakBoilerplateStems.push(question.id)
    }
    if (isAuthored) {
      const visibleText = [
        text,
        ...(Array.isArray(question.options) ? question.options : []),
      ].join(' ')
      if (scaffoldedTextPattern.test(visibleText)) {
        summary.scaffoldedAuthoredText.push(question.id)
      }
    }

    const explanation = normalizeExact(question.explanation)
    if (explanation) {
      if (!explanations.has(explanation)) explanations.set(explanation, [])
      explanations.get(explanation).push(question.id)
    }

    if (Array.isArray(question.options)) {
      summary.optionLengths.set(question.options.length, (summary.optionLengths.get(question.options.length) || 0) + 1)
      if (question.options.some((option) => (
        option == null ||
        String(option).trim() === '' ||
        /different answer|all of these|none of these|joke option/i.test(String(option))
      ))) {
        summary.placeholderOptions.push(question.id)
      }
      if (question.correctAnswer !== question.options[question.correctIndex]) {
        summary.answerMismatches.push(question.id)
      }
    } else {
      summary.optionLengths.set('not-array', (summary.optionLengths.get('not-array') || 0) + 1)
      summary.answerMismatches.push(question.id)
    }

    const objectiveBucket = [
      question.examBoard,
      question.specRef,
      question.learningObjective?.id,
      question.assessmentObjective,
      question.demand,
      question.responseMode,
    ].join('|')
    if (!objectiveBuckets.has(objectiveBucket)) objectiveBuckets.set(objectiveBucket, [])
    objectiveBuckets.get(objectiveBucket).push(question.id)

    if (isAuthored) {
      const authoredCorrectObjectiveBucket = [
        question.examBoard,
        question.learningObjective?.statement,
        question.correctAnswer,
      ].join('|')
      if (!authoredCorrectObjectiveBuckets.has(authoredCorrectObjectiveBucket)) {
        authoredCorrectObjectiveBuckets.set(authoredCorrectObjectiveBucket, [])
      }
      authoredCorrectObjectiveBuckets.get(authoredCorrectObjectiveBucket).push(question.id)

      if (question.diagramJson) {
        const diagramStemBucket = [
          JSON.stringify(question.diagramJson),
          normalizeNear(text),
        ].join('|')
        if (!authoredDiagramStemPatterns.has(diagramStemBucket)) authoredDiagramStemPatterns.set(diagramStemBucket, [])
        authoredDiagramStemPatterns.get(diagramStemBucket).push(question.id)
      }
    }
  }

  summary.overusedObjectiveBuckets = [...objectiveBuckets.entries()]
    .filter(([, ids]) => ids.length > 3)
    .map(([bucket, ids]) => `${bucket}:${ids.length}`)
  summary.overusedAuthoredCorrectObjectiveBuckets = [...authoredCorrectObjectiveBuckets.entries()]
    .filter(([, ids]) => ids.length > 3)
    .map(([bucket, ids]) => `${bucket}:${ids.length}`)
  summary.duplicateAuthoredDiagramStemPatterns = [...authoredDiagramStemPatterns.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([bucket, ids]) => `${bucket}:${ids.length}`)
  summary.duplicateExplanations = [...explanations.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([explanation, ids]) => `${ids.length}x:${ids.slice(0, 4).join(',')}:${explanation.slice(0, 80)}`)

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
  console.log(`missing quality metadata: ${schema.missingQualityMetadata.length}`)
  console.log(`invalid review status: ${schema.invalidReviewStatus.length}`)
  console.log(`placeholder options: ${schema.placeholderOptions.length}`)
  console.log(`weak boilerplate stems: ${schema.weakBoilerplateStems.length}`)
  console.log(`scaffolded authored text: ${schema.scaffoldedAuthoredText.length}`)
  console.log(`overused objective buckets: ${schema.overusedObjectiveBuckets.length}`)
  console.log(`overused authored correct-objective buckets: ${schema.overusedAuthoredCorrectObjectiveBuckets.length}`)
  console.log(`duplicate authored diagram/stem patterns: ${schema.duplicateAuthoredDiagramStemPatterns.length}`)
  console.log(`duplicate explanations: ${schema.duplicateExplanations.length}`)
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
    missingQualityMetadata: schema.missingQualityMetadata.length,
    invalidReviewStatus: schema.invalidReviewStatus.length,
    placeholderOptions: schema.placeholderOptions.length,
    weakBoilerplateStems: schema.weakBoilerplateStems.length,
    scaffoldedAuthoredText: schema.scaffoldedAuthoredText.length,
    overusedObjectiveBuckets: schema.overusedObjectiveBuckets.length,
    overusedAuthoredCorrectObjectiveBuckets: schema.overusedAuthoredCorrectObjectiveBuckets.length,
    duplicateAuthoredDiagramStemPatterns: schema.duplicateAuthoredDiagramStemPatterns.length,
    duplicateExplanations: schema.duplicateExplanations.length,
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

function compareSpecCoverage(boardId, allQuestions) {
  const entries = ADAPTIVE_SPEC_MANIFESTS[boardId]?.entries || []
  const missing = []
  const counts = new Map()

  for (const question of allQuestions) {
    const key = `${question.topic}|||${question.subtopic}|||${question.specRef}`
    counts.set(key, (counts.get(key) || 0) + 1)
  }

  for (const entry of entries) {
    const key = `${entry.topic}|||${entry.subtopic}|||${entry.specRef}`
    if (!counts.get(key)) missing.push(key)
  }

  const bySpec = countBy(allQuestions, (question) => question.specRef)
  console.log(`\n## ${boardId}/spec coverage`)
  console.log(`  source manifest entries: ${entries.length}`)
  console.log(`  missing source entries: ${missing.length}`)
  if (missing.length) {
    console.log(`  missing sample: ${missing.slice(0, 8).join('; ')}`)
  }
  console.log('  top specRef coverage:')
  for (const [specRef, count] of bySpec.slice(0, 10)) {
    console.log(`    - ${specRef}: ${count}`)
  }

  return {
    missingSpecEntries: missing.length,
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
    const specCoverageSummary = compareSpecCoverage(boardId, allQuestions)
    failures.push(...collectFailures(boardId, questionSummary, { ...topicFileSummary, ...specCoverageSummary }))
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
