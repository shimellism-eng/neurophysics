/**
 * notifications.js — cross-platform daily reminder helper
 *
 * Native iOS/Android : @capacitor/local-notifications (scheduled, persists
 *                      across app restarts, fires even when app is closed)
 * Web browser        : Web Notifications API (fires immediately as confirmation;
 *                      true background scheduling isn't supported without a SW)
 */
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

// Stable ID for the one daily-reminder notification slot
const DAILY_REMINDER_ID = 42

// ─── Permission ───────────────────────────────────────────────────────────────
export async function requestNotificationPermission() {
  if (isNative) {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    const { display } = await LocalNotifications.requestPermissions()
    return display === 'granted' ? 'granted' : 'denied'
  }
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  return Notification.requestPermission()
}

export async function checkNotificationPermission() {
  if (isNative) {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    const { display } = await LocalNotifications.checkPermissions()
    return display
  }
  if (!('Notification' in window)) return 'unsupported'
  return Notification.permission
}

// ─── Schedule / cancel ───────────────────────────────────────────────────────
/**
 * Schedule a repeating daily notification at the given hour (24h) and minute.
 * Safe to call multiple times — cancels any existing slot first.
 */
export async function scheduleDailyReminder(hour = 20, minute = 0) {
  if (isNative) {
    const { LocalNotifications } = await import('@capacitor/local-notifications')

    // Clear previous slot first
    await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] }).catch(() => {})

    await LocalNotifications.schedule({
      notifications: [
        {
          id: DAILY_REMINDER_ID,
          title: 'NeuroPhysics 🔬',
          body: "Time to revise! Don't break your streak 🔥",
          schedule: {
            on: { hour, minute },
            repeats: true,
            allowWhileIdle: true,
          },
          iconColor: '#6366f1',
        },
      ],
    })
    return true
  }

  // Web fallback — fire an immediate confirmation; background scheduling
  // is not supported without a service worker / Push API.
  if (Notification.permission === 'granted') {
    new Notification('NeuroPhysics 🔬', {
      body: "Daily reminders are on! Open the app each day to study 📚",
      icon: '/vite.svg',
    })
    return true
  }
  return false
}

export async function cancelDailyReminder() {
  if (isNative) {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] }).catch(() => {})
  }
  // Nothing to cancel on web (no scheduled notification exists)
}
