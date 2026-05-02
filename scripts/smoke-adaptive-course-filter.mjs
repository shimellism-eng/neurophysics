import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function hasCourse(question, course) {
  return Array.isArray(question.courseAvailability) && question.courseAvailability.includes(course)
}

globalThis.fetch = async (url) => {
  const pathname = String(url).startsWith('/data/')
    ? path.join(process.cwd(), 'public', String(url))
    : path.join(process.cwd(), 'public', String(url).replace(/^\/+/, ''))
  try {
    const body = await fs.readFile(pathname, 'utf8')
    return {
      ok: true,
      status: 200,
      async json() {
        return JSON.parse(body)
      },
    }
  } catch {
    return {
      ok: false,
      status: 404,
      async json() {
        return {}
      },
    }
  }
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { getQuestions, getTimedPaperQuestions } = await server.ssrLoadModule('/src/lib/questionRepository.js')

  for (const board of ['aqa', 'edexcel']) {
    const combinedAll = await getTimedPaperQuestions({ examBoard: board, course: 'combined' })
    const physicsAll = await getTimedPaperQuestions({ examBoard: board, course: 'physics_only' })

    assert(combinedAll.length > 0, `${board} Combined returned no adaptive questions`)
    assert(physicsAll.length > combinedAll.length, `${board} Physics Only should include more questions than Combined`)
    assert(
      combinedAll.every((question) => hasCourse(question, 'combined')),
      `${board} Combined leaked a Physics-only adaptive question`
    )
    assert(
      physicsAll.every((question) => hasCourse(question, 'combined') || hasCourse(question, 'physics_only')),
      `${board} Physics Only returned a question without valid courseAvailability`
    )
  }

  for (const board of ['aqa', 'edexcel']) {
    const combinedSpace = await getQuestions({ examBoard: board, course: 'combined', topic: 'Space' })
    const physicsSpace = await getQuestions({ examBoard: board, course: 'physics_only', topic: 'Space' })
    assert(combinedSpace.length === 0, `${board} Combined should not see Space questions`)
    assert(physicsSpace.length > 0, `${board} Physics Only should see Space questions`)
  }

  const edexcelCombined = await getTimedPaperQuestions({ examBoard: 'edexcel', course: 'combined' })
  const leakedPRefs = edexcelCombined.filter((question) => /\b\d+(?:\.\d+)?P\b/.test(String(question.specRef || '')))
  assert(
    leakedPRefs.length === 0,
    `Edexcel Combined leaked P-suffixed Physics Only refs: ${leakedPRefs.map((q) => q.id).slice(0, 5).join(', ')}`
  )
} finally {
  await server.close()
}

if (failures.length) {
  console.error('adaptive course filter smoke failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('adaptive course filter smoke: pass')
