#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const boardId = 'edexcel'
const topicKey = 'atomic_structure'
const manifestPath = path.join(dataRoot, 'manifest.json')

const distractorsBySubtopic = {
  'Atomic Structure': [
    'Electrons are found inside protons in the nucleus.',
    'Neutrons have a positive charge.',
    'The nucleus contains only electrons.',
    'Protons are found in shells around the nucleus.',
    'Neutrons move around the outside of the atom.',
    'Electrons have the same positive charge as protons.',
    'The nucleus contains no mass compared with the electrons.',
    'Atoms contain no empty space between the nucleus and shells.',
    'The electron shells contain protons and neutrons.',
    'All particles in an atom have the same charge.',
  ],
  'Background Radiation': [
    'Radiation produced only in nuclear power stations.',
    'Radiation that exists only inside medical equipment.',
    'Radiation that can only be detected during a nuclear accident.',
    'Radiation that appears only when a source is switched on.',
    'Radiation made only by X-ray machines.',
    'Radiation that is always too dangerous to measure.',
    'Radiation that comes only from human-made sources.',
    'Radiation that disappears completely outdoors.',
    'Radiation that is present only in science laboratories.',
    'Radiation that means an object has become radioactive forever.',
  ],
  'Fission and Fusion': [
    'A small nucleus joins another small nucleus at low temperature without releasing energy.',
    'Electrons split out of atoms and cause chemical burning.',
    'A neutral atom turns into a charged atom only because it gains heat.',
    'Two large nuclei join together without changing mass.',
    'A nucleus absorbs light and turns into an electron.',
    'The outer electron shells split and release gravitational energy.',
    'A large nucleus cools down and becomes chemically neutral.',
    'Two atoms rub together and release sound energy.',
    'The nucleus loses all of its protons but stays the same element.',
    'A magnetic field splits the electrons into smaller particles.',
  ],
  'Radiation Safety': [
    'They both mean radioactive particles have entered the body.',
    'Irradiation makes every object radioactive forever.',
    'Contamination and irradiation both stop as soon as a lead sheet is used.',
    'Irradiation means radioactive material has stuck to clothing.',
    'Contamination means radiation passed through an object without leaving material behind.',
    'Both words mean the same thing in radiation safety.',
    'Irradiation always leaves radioactive atoms inside the object.',
    'Contamination is exposure to radiation only, with no material transfer.',
    'Irradiation can be washed off the skin like dust.',
    'Contamination is impossible if the source is sealed.',
  ],
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, payload) {
  const next = `${JSON.stringify(payload, null, 2)}\n`
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
  if (current === next) return false
  fs.writeFileSync(filePath, next)
  return true
}

function numericValue(option) {
  const match = String(option || '').match(/^-?\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : null
}

function formatCount(value) {
  return `${Number(value.toFixed(2)).toString()} counts per minute`
}

function halfLifeDistractors(question, rowIndex) {
  const correct = numericValue(question.correctAnswer)
  if (!Number.isFinite(correct)) return []

  const multipliers = [
    [2, 4, 0.5],
    [1.5, 3, 0.75],
    [4, 0.25, 2.5],
    [1.25, 2.25, 0.6],
  ][rowIndex % 4]

  return multipliers
    .map((multiplier) => formatCount(correct * multiplier))
    .filter((option) => option !== question.correctAnswer)
}

function replacementWrongOptions(question, rowIndex) {
  if (question.subtopic === 'Half-Life') {
    return halfLifeDistractors(question, rowIndex)
  }

  const pool = distractorsBySubtopic[question.subtopic]
  if (!pool) return question.options.filter((option) => option !== question.correctAnswer)

  const wrong = []
  let offset = rowIndex % pool.length
  while (wrong.length < 3) {
    const option = pool[offset % pool.length]
    if (option !== question.correctAnswer && !wrong.includes(option)) wrong.push(option)
    offset += 1
  }
  return wrong
}

function repairQuestion(question, rowIndex) {
  const wrongOptions = replacementWrongOptions(question, rowIndex)
  if (wrongOptions.length < 3) return question

  const nextOptions = [...question.options]
  let wrongIndex = 0
  for (let optionIndex = 0; optionIndex < nextOptions.length; optionIndex += 1) {
    if (optionIndex === question.correctIndex) {
      nextOptions[optionIndex] = question.correctAnswer
    } else {
      nextOptions[optionIndex] = wrongOptions[wrongIndex]
      wrongIndex += 1
    }
  }

  return {
    ...question,
    options: nextOptions,
    correctIndex: nextOptions.findIndex((option) => option === question.correctAnswer),
  }
}

function main() {
  const manifest = readJson(manifestPath)
  const board = manifest.boards?.[boardId]
  const topicPath = board?.topics?.[topicKey]
  if (!topicPath) throw new Error(`Missing ${boardId}/${topicKey}`)

  const topicFilePath = path.join(root, 'public', topicPath.replace(/^\//, ''))
  const allFilePath = path.join(root, 'public', board.all.replace(/^\//, ''))
  const topicPayload = readJson(topicFilePath)
  const allPayload = readJson(allFilePath)

  const repairedTopicQuestions = (topicPayload.questions || []).map(repairQuestion)
  const repairedById = new Map(repairedTopicQuestions.map((question) => [question.id, question]))
  const repairedAllQuestions = (allPayload.questions || []).map((question) => (
    repairedById.get(question.id) || question
  ))

  let changed = false
  changed = writeJson(topicFilePath, {
    ...topicPayload,
    questions: repairedTopicQuestions,
  }) || changed
  changed = writeJson(allFilePath, {
    ...allPayload,
    questions: repairedAllQuestions,
  }) || changed

  if (changed) {
    manifest.generatedAt = new Date().toISOString()
    writeJson(manifestPath, manifest)
  }

  console.log(`${changed ? 'Repaired' : 'Already repaired'} ${repairedTopicQuestions.length} Edexcel atomic distractor sets.`)
}

main()
