// Board configuration — master source of truth for all exam board metadata.
// Keep the structure extendable so future boards can be re-added safely.

export const BOARDS = {
  aqa: {
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
  edexcel: {
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
}

// Ordered list for board picker UI
export const BOARD_ORDER = ['aqa', 'edexcel']

// All-boards shorthand — use for topics available on every spec
export const ALL_BOARDS = [...BOARD_ORDER]

// Legacy CCEA exports kept as inert constants so older imports do not break.
export const CCEA_GRADES = ['A*', 'A', 'B', 'C*', 'C', 'D', 'E', 'F', 'G']
export const CCEA_BOUNDARIES = [
  { grade: 'A*', min: 0.85, color: '#a855f7', bg: 'rgba(168,85,247,0.15)', desc: 'Stretch target range' },
  { grade: 'A', min: 0.75, color: '#6366f1', bg: 'rgba(99,102,241,0.15)', desc: 'Very strong practice range' },
  { grade: 'B', min: 0.65, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', desc: 'Strong practice range' },
  { grade: 'C*', min: 0.58, color: '#10b981', bg: 'rgba(16,185,129,0.15)', desc: 'Strong pass' },
  { grade: 'C', min: 0.5, color: '#10b981', bg: 'rgba(16,185,129,0.12)', desc: 'Standard pass' },
  { grade: 'D', min: 0.4, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', desc: 'Emerging pass range' },
  { grade: 'E', min: 0.3, color: '#f97316', bg: 'rgba(249,115,22,0.12)', desc: 'Needs more review' },
  { grade: 'F', min: 0.2, color: '#ef4444', bg: 'rgba(239,68,68,0.10)', desc: 'Early practice range' },
  { grade: 'G', min: 0.1, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', desc: 'Early practice range' },
]

function warnUnsupportedBoard(message) {
  if (import.meta.env.DEV) {
    console.warn(message)
  }
}

/** Get the board config for a saved board ID, falling back to AQA */
export function getBoard(boardId) {
  if (BOARDS[boardId]) return BOARDS[boardId]
  if (boardId != null) {
    warnUnsupportedBoard(`[boardConfig] Unsupported board requested: ${boardId}. Using AQA default.`)
  }
  return BOARDS.aqa
}

/**
 * Read np_board from localStorage and validate it against known board IDs.
 * Returns a safe supported ID string, defaulting to 'aqa' if missing or invalid.
 */
export function getValidatedBoard() {
  try {
    const stored = localStorage.getItem('np_board')
    if (stored && BOARDS[stored]) return stored
    if (stored != null && stored !== '') {
      warnUnsupportedBoard(`[boardConfig] Unsupported stored board "${stored}". Resetting to AQA.`)
    }
    return 'aqa'
  } catch {
    return 'aqa'
  }
}

/** Read the currently selected board config from localStorage (validated) */
export function getSelectedBoard() {
  return getBoard(getValidatedBoard())
}

/** Save a board selection to localStorage */
export function saveSelectedBoard(boardId) {
  try {
    if (BOARDS[boardId]) {
      localStorage.setItem('np_board', boardId)
      return
    }
    warnUnsupportedBoard(`[boardConfig] Ignored unsupported board save request: ${boardId}`)
  } catch {}
}

const VALID_COURSES = ['combined', 'physics_only']

/** Read the student's course type: 'combined' or 'physics_only'. Defaults to 'combined'. */
export function getSelectedCourse() {
  try {
    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
    return VALID_COURSES.includes(prefs.course) ? prefs.course : 'combined'
  } catch {
    return 'combined'
  }
}

/** Persist course type selection to neurophysics_prefs */
export function setSelectedCourse(course) {
  try {
    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
    prefs.course = course
    localStorage.setItem('neurophysics_prefs', JSON.stringify(prefs))
  } catch {}
}

/** Is the given module/topic available for the current board?
 *  boards param: string[] | null | undefined — null/undefined means available for all */
export function isAvailableForBoard(boards, boardId) {
  if (boards == null || !Array.isArray(boards) || boards.length === 0) return true
  return boards.includes(boardId)
}
