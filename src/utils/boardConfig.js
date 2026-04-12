// Board configuration — master source of truth for all exam board metadata.
// Add new boards here; the rest of the app reads from this file.

export const BOARDS = {
  'aqa': {
    id: 'aqa',
    name: 'AQA',
    fullName: 'AQA GCSE Physics',
    gradeSystem: '9-1',
    g: 9.8,
    practicalLabel: 'Required Practical',
    practicalShort: 'RP',
    color: '#6366f1',
    flag: '🇬🇧',
    description: 'Most popular in England',
    paperLabels: ['All', 'Paper 1', 'Paper 2'],
  },
  'edexcel': {
    id: 'edexcel',
    name: 'Edexcel',
    fullName: 'Edexcel GCSE Physics (1PH0)',
    gradeSystem: '9-1',
    g: 10,
    practicalLabel: 'Core Practical',
    practicalShort: 'CP',
    color: '#f97316',
    flag: '🇬🇧',
    description: 'Pearson · g = 10 N/kg',
    paperLabels: ['All', 'Paper 1', 'Paper 2'],
  },
  'ocr-a': {
    id: 'ocr-a',
    name: 'OCR Gateway A',
    fullName: 'OCR Gateway Physics A (J249)',
    gradeSystem: '9-1',
    g: 9.8,
    practicalLabel: 'PAG Activity',
    practicalShort: 'PAG',
    color: '#10b981',
    flag: '🇬🇧',
    description: 'Includes Global Challenges module',
    paperLabels: ['All', 'Paper 1', 'Paper 2'],
  },
  'ocr-b': {
    id: 'ocr-b',
    name: 'OCR 21st Century',
    fullName: 'OCR Twenty First Century Physics B (J259)',
    gradeSystem: '9-1',
    g: 9.8,
    practicalLabel: 'PAG Activity',
    practicalShort: 'PAG',
    color: '#06b6d4',
    flag: '🇬🇧',
    description: 'Context-led · Studying the Universe module',
    paperLabels: ['All', 'Paper 1', 'Paper 2'],
  },
  'wjec': {
    id: 'wjec',
    name: 'WJEC / Eduqas',
    fullName: 'WJEC / Eduqas GCSE Physics',
    gradeSystem: '9-1',
    g: 9.8,
    practicalLabel: 'Specified Practical',
    practicalShort: 'SP',
    color: '#fbbf24',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    description: 'Wales & England · Unitised assessment',
    paperLabels: ['All', 'Unit 1', 'Unit 2', 'Unit 3'],
  },
  'ccea': {
    id: 'ccea',
    name: 'CCEA',
    fullName: 'CCEA GCSE Physics',
    gradeSystem: 'A*-G',
    g: 10,
    practicalLabel: 'Prescribed Practical',
    practicalShort: 'PP',
    color: '#e879f9',
    flag: '🇬🇧',
    description: 'Northern Ireland · A*–G grading',
    paperLabels: ['All', 'Unit 1', 'Unit 2'],
  },
}

// Ordered list for board picker UI
export const BOARD_ORDER = ['aqa', 'edexcel', 'ocr-a', 'ocr-b', 'wjec', 'ccea']

// All-boards shorthand — use for topics available on every spec
export const ALL_BOARDS = BOARD_ORDER

// ── CCEA grade system (A*–G with C* grade) ──────────────────────────────────
export const CCEA_GRADES = ['A*', 'A', 'B', 'C*', 'C', 'D', 'E', 'F', 'G']

// Approximate percentage boundaries for CCEA (practice purposes only)
export const CCEA_BOUNDARIES = [
  { grade: 'A*', min: 0.85, color: '#a855f7', bg: 'rgba(168,85,247,0.15)', desc: 'Outstanding' },
  { grade: 'A',  min: 0.75, color: '#6366f1', bg: 'rgba(99,102,241,0.15)',  desc: 'Excellent' },
  { grade: 'B',  min: 0.65, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',  desc: 'Good' },
  { grade: 'C*', min: 0.58, color: '#10b981', bg: 'rgba(16,185,129,0.15)', desc: 'Strong pass' },
  { grade: 'C',  min: 0.50, color: '#10b981', bg: 'rgba(16,185,129,0.12)', desc: 'Standard pass' },
  { grade: 'D',  min: 0.40, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  desc: 'Near pass' },
  { grade: 'E',  min: 0.30, color: '#f97316', bg: 'rgba(249,115,22,0.12)',  desc: 'Below pass' },
  { grade: 'F',  min: 0.20, color: '#ef4444', bg: 'rgba(239,68,68,0.10)',   desc: 'Well below' },
  { grade: 'G',  min: 0.10, color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   desc: 'Developing' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get the board config for a saved board ID, falling back to AQA */
export function getBoard(boardId) {
  return BOARDS[boardId] || BOARDS['aqa']
}

/**
 * Read np_board from localStorage and validate it against known board IDs.
 * Returns the validated ID string, falling back to 'aqa' if missing or tampered.
 * This prevents an injected localStorage value from reaching the rest of the app.
 */
export function getValidatedBoard() {
  try {
    const stored = localStorage.getItem('np_board')
    const validIds = Object.keys(BOARDS)
    return validIds.includes(stored) ? stored : 'aqa'
  } catch {
    return 'aqa'
  }
}

/** Read the currently selected board config from localStorage (validated) */
export function getSelectedBoard() {
  return BOARDS[getValidatedBoard()]
}

/** Save a board selection to localStorage */
export function saveSelectedBoard(boardId) {
  try { localStorage.setItem('np_board', boardId) } catch {}
}

/** Is the given module/topic available for the current board?
 *  boards param: string[] | null | undefined — null/undefined means available for all */
export function isAvailableForBoard(boards, boardId) {
  if (boards == null || !Array.isArray(boards) || boards.length === 0) return true // no restriction = universal
  return boards.includes(boardId)
}
