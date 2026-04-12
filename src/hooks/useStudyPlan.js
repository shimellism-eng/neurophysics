import { useMemo } from 'react'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard } from '../utils/boardConfig'

/**
 * useStudyPlan — exam-aware smart study planner
 *
 * Returns:
 *   examDate, daysLeft, weeksLeft, examStatus ('no_date'|'green'|'amber'|'red'|'passed')
 *   neededPerDay, onTrack
 *   totalTopics, masteredCount, remainingCount
 *   todayTopicId, todayTopic, todayModule, isReview
 *   masteredThisWeek, weeklyTarget, weeklyDots
 */
export function useStudyPlan(progress) {
  return useMemo(() => {
    // ── profile ──────────────────────────────────────────────────────────────
    const profile = (() => {
      try { return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}') }
      catch { return {} }
    })()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const board = getSelectedBoard()

    // ── all topics for the selected board ────────────────────────────────────
    const allTopicIds = MODULES
      .filter(m => !m.boards || m.boards.includes(board.id))
      .flatMap(m => m.topics)
      .filter(id => TOPICS[id])

    const totalTopics   = allTopicIds.length
    const masteredIds   = allTopicIds.filter(id => progress[id]?.mastered)
    const masteredCount = masteredIds.length
    const remainingCount = totalTopics - masteredCount

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

        // Pace check: use earliest masteredAt as proxy start date
        const earliestMastery = masteredIds
          .map(id => progress[id]?.masteredAt)
          .filter(Boolean)
          .sort((a, b) => a - b)[0]

        if (earliestMastery && masteredCount > 0) {
          const daysElapsed = Math.max(1, Math.ceil((Date.now() - earliestMastery) / 86400000))
          const actualRate  = masteredCount / daysElapsed
          onTrack = actualRate >= parseFloat(neededPerDay)
        } else {
          onTrack = true // optimistic default before any mastery
        }
      } else if (daysLeft <= 0) {
        examStatus = 'passed'
      }
    }

    // ── today's priority topic ────────────────────────────────────────────────
    // 1) SR review due today
    const reviewDueIds = allTopicIds.filter(id => {
      const p = progress[id]
      return p?.mastered && p.nextReviewAt && p.nextReviewAt <= Date.now()
    })

    // 2) Next unmastered in module order
    const unmasteredIds = allTopicIds.filter(id => !progress[id]?.mastered)

    const todayTopicId = reviewDueIds[0] || unmasteredIds[0] || allTopicIds[0]
    const todayTopic   = TOPICS[todayTopicId]
    const todayModule  = todayTopicId
      ? MODULES.find(m => m.topics.includes(todayTopicId))
      : null
    const isReview     = reviewDueIds.includes(todayTopicId)

    // ── weekly progress (topics mastered in last 7 days) ─────────────────────
    const oneWeekAgo       = Date.now() - 7 * 86400000
    const masteredThisWeek = masteredIds.filter(id => {
      const p = progress[id]
      return p?.masteredAt && p.masteredAt > oneWeekAgo
    }).length
    const weeklyTarget = 5
    const weeklyDots   = Array.from({ length: weeklyTarget }, (_, i) => i < masteredThisWeek)

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
    }
  }, [progress])
}
