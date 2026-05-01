import {
  COURSE_OPTIONS,
  getBoardOptions,
  getCourseLabel,
  getCourseOption,
} from '../src/features/settings/boardCourseDisplay.js'

if (getCourseLabel('combined') !== 'Combined Science') {
  throw new Error('Expected combined course label to stay unchanged')
}

if (getCourseLabel('physics_only') !== 'Physics Only') {
  throw new Error('Expected physics-only course label to stay unchanged')
}

if (getCourseOption('unknown').id !== 'combined') {
  throw new Error('Expected unknown course to fall back to combined display')
}

if (COURSE_OPTIONS.length !== 2) {
  throw new Error('Expected release course display to expose exactly two course options')
}

const boards = {
  aqa: { id: 'aqa', name: 'AQA' },
  edexcel: { id: 'edexcel', name: 'Edexcel' },
  archived: { id: 'archived', name: 'Archived' },
}
const boardOptions = getBoardOptions(boards, ['aqa', 'missing', 'edexcel'])
if (boardOptions.map(board => board.id).join(',') !== 'aqa,edexcel') {
  throw new Error('Expected board display options to follow supported order and skip missing boards')
}

console.log('board/course display smoke: pass')
