import { useMemo } from 'react'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard, getSelectedCourse } from '../utils/boardConfig'
import { getVisibleTopicIdsForSelection, isModuleAvailableForSelection } from '../utils/curriculumFilters'

/**
 * useStudyPlan — exam-aware smart study planner
 *
 * Returns all data needed for both the HomeScreen widgets and the full
 * StudyPlanScreen week-by-week breakdown.
 */
export function useStudyPlan(progress, paceOverride = 0) {
  return useMemo(() => {
    // ── profile ──────────────────────────────────────────────────────────────
    const profile = (() => {
      try { return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}') }
      catch { return {} }
    })()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const board = getSelectedBoard()
    const course = getSelectedCourse()

    // ── all topics for the selected board (module order) ─────────────────────
    const allTopicIds = MODULES
      .filter(m => isModuleAvailableForSelection(m, board.id, course))
      .flatMap(m => getVisibleTopicIdsForSelection(m.topics, board.id, course))
      .filter(id => TOPICS[id])

    const totalTopics    = allTopicIds.length
    const masteredIds    = allTopicIds.filter(id => progress[id]?.mastered)
    const masteredCount  = masteredIds.length
    const unmasteredIds  = allTopicIds.filter(id => !progress[id]?.mastered)
    const remainingCount = unmasteredIds.length

    // ── exam countdown ────────────────────────────────────────────────────────
    let examDate     = null
    let daysLeft     = null
    let weeksLeft    = null
    let examStatus   = 'no_date'
    let neededPerDay = null
    let onTrack      = null

    if (profile.examDate) {
      examDate = new Date(profile.examDate)
      examDate.setHours(0, 0, 0, 0)
      daysLeft = Math.ceil((examDate - today) / 86400000)

      if (daysLeft > 0 && daysLeft <= 365) {
        weeksLeft = Math.ceil(daysLeft / 7)

        if (daysLeft > 42)      examStatus = 'green'
        else if (daysLeft > 14) examStatus = 'amber'
        else                    examStatus = 'red'

        neededPerDay = remainingCount > 0 ? (remainingCount / daysLeft).toFixed(1) : '0'

        // Pace: use earliest masteredAt as proxy start
        const earliestMastery = masteredIds
          .map(id => progress[id]?.masteredAt)
          .filter(Boolean)
          .sort((a, b) => a - b)[0]

        if (earliestMastery && masteredCount > 0) {
          const daysElapsed = Math.max(1, Math.ceil((Date.now() - earliestMastery) / 86400000))
          const actualRate  = masteredCount / daysElapsed
          onTrack = actualRate >= parseFloat(neededPerDay)
        } else {
          onTrack = true
        }
      } else if (daysLeft <= 0) {
        examStatus = 'passed'
      }
    }

    // ── today's priority topic ────────────────────────────────────────────────
    const reviewDueIds = allTopicIds.filter(id => {
      const p = progress[id]
      return p?.mastered && p.nextReviewAt && p.nextReviewAt <= Date.now()
    })
    const todayTopicId = reviewDueIds[0] || unmasteredIds[0] || allTopicIds[0]
    const todayTopic   = TOPICS[todayTopicId]
    const todayModule  = todayTopicId
      ? MODULES.find(m => m.topics.includes(todayTopicId))
      : null
    const isReview     = reviewDueIds.includes(todayTopicId)

    // ── weekly progress dots (topics mastered last 7 days) ────────────────────
    const oneWeekAgo       = Date.now() - 7 * 86400000
    const masteredThisWeek = masteredIds.filter(id => {
      const p = progress[id]
      return p?.masteredAt && p.masteredAt > oneWeekAgo
    }).length
    const weeklyTarget = 5
    const weeklyDots   = Array.from({ length: weeklyTarget }, (_, i) => i < masteredThisWeek)

    // ── full weekly plan ──────────────────────────────────────────────────────
    let weeklyPlan = []

    if (examDate && daysLeft > 0) {
      // Find this Monday
      const monday = new Date(today)
      const dow = today.getDay() === 0 ? 6 : today.getDay() - 1 // 0=Mon
      monday.setDate(today.getDate() - dow)

      // How many topics per non-exam week
      const studyWeeks    = Math.max(weeksLeft - 1, 1)
      const topicsPerWeek = paceOverride > 0
        ? Math.min(10, Math.max(1, paceOverride))
        : Math.max(1, Math.ceil(remainingCount / studyWeeks))

      const topicPool = [...unmasteredIds] // consumed week by week
      let weekStart   = new Date(monday)
      let weekIndex   = 0
      let currentWeekIndex = 0

      while (weekStart < examDate && weekIndex < 52) {
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)

        const isCurrent = today >= weekStart && today <= weekEnd
        if (isCurrent) currentWeekIndex = weekIndex

        // Last week before exam = exam week (review only)
        const isExamWeek = weekEnd >= examDate

        if (isExamWeek) {
          weeklyPlan.push({
            weekIndex,
            weekStart: new Date(weekStart),
            weekEnd:   new Date(weekEnd),
            type:      'exam_week',
            topicIds:  [],
            status:    isCurrent ? 'current' : weekStart < today ? 'complete' : 'upcoming',
            masteredInBatch: 0,
            isComplete: false,
          })
          break
        }

        const batch = topicPool.splice(0, topicsPerWeek)
        const masteredInBatch = batch.filter(id => progress[id]?.mastered).length
        const isPast    = weekEnd < today
        const isComplete = isPast || (batch.length > 0 && masteredInBatch === batch.length)

        weeklyPlan.push({
          weekIndex,
          weekStart: new Date(weekStart),
          weekEnd:   new Date(weekEnd),
          type:      'study',
          topicIds:  batch,
          status:    isCurrent ? 'current' : isPast ? 'complete' : 'upcoming',
          masteredInBatch,
          isComplete,
        })

        weekStart.setDate(weekStart.getDate() + 7)
        weekIndex++
      }

      weeklyPlan._currentWeekIndex = currentWeekIndex
      weeklyPlan._topicsPerWeek = topicsPerWeek
    }

    return {
      examDate,
      daysLeft,
      weeksLeft,
      examStatus,
      neededPerDay,
      onTrack,
      totalTopics,
      masteredCount,
      remainingCount,
      todayTopicId,
      todayTopic,
      todayModule,
      isReview,
      masteredThisWeek,
      weeklyTarget,
      weeklyDots,
      weeklyPlan,
    }
  }, [progress, paceOverride])
}
