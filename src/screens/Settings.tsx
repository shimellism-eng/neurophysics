import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useUser } from '../context/UserContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import type { UserSettings } from '../types/content';
import './Settings.css';

type OptionGroup<K extends keyof UserSettings> = {
  label: string;
  key: K;
  options: { value: UserSettings[K]; label: string }[];
};

const GROUPS: OptionGroup<any>[] = [
  {
    label: 'Font',
    key: 'font',
    options: [
      { value: 'default',   label: 'Bricolage Grotesque (default)' },
      { value: 'atkinson',  label: 'Atkinson Hyperlegible (dyslexia-friendly)' },
    ],
  },
  {
    label: 'Background',
    key: 'background',
    options: [
      { value: 'dark', label: 'Dark' },
      { value: 'dim',  label: 'Dim'  },
      { value: 'light',label: 'Light'},
    ],
  },
  {
    label: 'Text size',
    key: 'textSize',
    options: [
      { value: 'normal', label: 'Normal (16px)' },
      { value: 'large',  label: 'Large (18px)'  },
      { value: 'xl',     label: 'Extra large (20px)' },
    ],
  },
  {
    label: 'Animations',
    key: 'animations',
    options: [
      { value: 'full',    label: 'Full' },
      { value: 'reduced', label: 'Reduced' },
      { value: 'none',    label: 'None' },
    ],
  },
];

export function Settings() {
  const { settings, updateSetting } = useSettings();
  const { progress } = useUser();
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <h1>Settings</h1>

      {progress && (
        <div className="settings__info card">
          <p><strong>Streak:</strong> {progress.streak} day{progress.streak !== 1 ? 's' : ''}</p>
          <p><strong>Concepts completed:</strong> {progress.completedConcepts.length}</p>
        </div>
      )}

      <section className="settings__section">
        <h2 className="settings__section-title">Accessibility</h2>

        {GROUPS.map(group => (
          <div key={group.key} className="settings__group">
            <p className="settings__group-label" id={`settings-${group.key}-label`}>{group.label}</p>
            <div className="settings__options" role="radiogroup" aria-labelledby={`settings-${group.key}-label`}>
              {group.options.map(opt => {
                const isActive = (settings as any)[group.key] === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    className={`settings__option ${isActive ? 'settings__option--active' : ''}`}
                    onClick={() => updateSetting(group.key as keyof UserSettings, opt.value)}
                    role="radio"
                    aria-checked={isActive}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="settings__group">
          <p className="settings__group-label">High contrast</p>
          <button
            className={`settings__toggle ${settings.highContrast ? 'settings__toggle--on' : ''}`}
            onClick={() => updateSetting('highContrast', !settings.highContrast)}
            role="switch"
            aria-checked={settings.highContrast}
            aria-label="High contrast"
          >
            <span className="settings__toggle-track">
              <span className="settings__toggle-thumb" />
            </span>
            <span>{settings.highContrast ? 'On' : 'Off'}</span>
          </button>
        </div>

        <div className="settings__group">
          <p className="settings__group-label">Haptic feedback</p>
          <button
            className={`settings__toggle ${settings.haptics ? 'settings__toggle--on' : ''}`}
            onClick={() => updateSetting('haptics', !settings.haptics)}
            role="switch"
            aria-checked={settings.haptics}
            aria-label="Haptic feedback"
          >
            <span className="settings__toggle-track">
              <span className="settings__toggle-thumb" />
            </span>
            <span>{settings.haptics ? 'On' : 'Off'}</span>
          </button>
        </div>
      </section>

      <section className="settings__section">
        <h2 className="settings__section-title">Analytics</h2>
        <button
          className="settings__teacher-btn"
          onClick={() => navigate('/dashboard')}
        >
          <span className="settings__teacher-icon" aria-hidden="true">📊</span>
          <div className="settings__teacher-text">
            <span className="settings__teacher-label">Teacher View</span>
            <span className="settings__teacher-desc">Misconceptions, progress, and study patterns</span>
          </div>
          <span className="settings__teacher-arrow" aria-hidden="true">&#8594;</span>
        </button>
      </section>

      <div className="settings__footer">
        <p className="text-muted text-sm">NeuroPhysics v1.0</p>
        <p className="text-muted text-xs">Physics. For every brain.</p>
      </div>
    </ScreenWrapper>
  );
}
