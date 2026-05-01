import { getTopicStudyRoute } from '../src/features/lesson/routing.js'

const lessonWithHook = getTopicStudyRoute({ hook: 'intro', practicalId: 'rp1' }, 'energy-stores')
if (lessonWithHook !== '/lesson/energy-stores') {
  throw new Error(`Expected hook topic to route to lesson, got ${lessonWithHook}`)
}

const lessonWithSteps = getTopicStudyRoute({ lessonSteps: [{ type: 'explain' }] }, 'forces')
if (lessonWithSteps !== '/lesson/forces') {
  throw new Error(`Expected lessonSteps topic to route to lesson, got ${lessonWithSteps}`)
}

const practical = getTopicStudyRoute({ practicalId: 'rp2' }, 'density')
if (practical !== '/practical/rp2') {
  throw new Error(`Expected practical topic to route to practical, got ${practical}`)
}

const fallback = getTopicStudyRoute({}, 'waves')
if (fallback !== '/practice/waves') {
  throw new Error(`Expected plain topic to route to practice, got ${fallback}`)
}

console.log('topic routing smoke: pass')
