import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserSettings } from '../types/content';

const SETTINGS_KEY = 'neurophysics_settings';

const DEFAULT_SETTINGS: UserSettings = {
  font: 'default',
  background: 'light',
  textSize: 'normal',
  animations: 'full',
  sound: false,
  highContrast: false,
  timedQuestions: false,
  haptics: true,
};

interface SettingsContextValue {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply settings to <html> data attributes for CSS selectors
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font', settings.font);
    root.setAttribute('data-background', settings.background);
    root.setAttribute('data-textsize', settings.textSize);
    root.setAttribute('data-animations', settings.animations);
    root.setAttribute('data-contrast', settings.highContrast ? 'high' : 'normal');
  }, [settings]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch { /* storage unavailable */ }
  }, [settings]);

  function updateSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be inside SettingsProvider');
  return ctx;
}
