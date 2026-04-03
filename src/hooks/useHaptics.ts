// NOTE: When running inside Capacitor (iOS native wrapper), the @capacitor/haptics
// plugin can be used instead of navigator.vibrate for richer haptic feedback on iOS.
// iOS Safari does not support navigator.vibrate, so the web fallback below is a
// no-op on iPhone. To enable native haptics, import { Haptics, ImpactStyle } from
// '@capacitor/haptics' and call Haptics.impact({ style: ImpactStyle.Light }) etc.
// The current implementation is kept as-is for web compatibility.

import { useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';

function vibrate(pattern: number | number[]): void {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function useHaptics() {
  const { settings } = useSettings();
  const enabled = settings.haptics;

  const lightTap = useCallback(() => {
    if (enabled) vibrate(10);
  }, [enabled]);

  const mediumTap = useCallback(() => {
    if (enabled) vibrate(25);
  }, [enabled]);

  const successBuzz = useCallback(() => {
    if (enabled) vibrate([20, 50, 20]);
  }, [enabled]);

  const errorBuzz = useCallback(() => {
    if (enabled) vibrate([50, 30, 50, 30, 50]);
  }, [enabled]);

  return { lightTap, mediumTap, successBuzz, errorBuzz };
}
