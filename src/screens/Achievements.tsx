import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { useStreak } from '../hooks/useStreak';
import { useAchievements } from '../hooks/useAchievements';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import './Achievements.css';

export function Achievements() {
  const { progress } = useUser();
  const { streak } = useStreak();
  const { settings } = useSettings();
  const { getAchievements, unlockedCount, totalCount } = useAchievements();
  const noAnims = settings.animations === 'none';

  const achievements = useMemo(() => {
    if (!progress) return [];
    return getAchievements(progress, streak);
  }, [progress, streak, getAchievements]);

  if (!progress) return null;

  const stagger = noAnims
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <ScreenWrapper>
      <div className="achievements__header">
        <h1 className="achievements__title">Achievements</h1>
        <p className="achievements__subtitle">
          Your personal milestones. No rush, just celebrate your progress.
        </p>
        <p className="achievements__count">
          {unlockedCount} of {totalCount} unlocked
        </p>
      </div>

      <div className="achievements__grid">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            className={`achievements__card ${a.unlocked ? 'achievements__card--unlocked' : 'achievements__card--locked'}`}
            {...stagger}
            transition={noAnims ? undefined : { delay: i * 0.04 }}
          >
            {!a.unlocked && (
              <span className="achievements__card-lock" aria-hidden="true">🔒</span>
            )}

            <span className="achievements__icon" aria-hidden="true">{a.icon}</span>
            <span className="achievements__label">{a.label}</span>
            <span className="achievements__desc">{a.description}</span>

            {a.unlocked && a.unlockedAt && (
              <span className="achievements__date">
                {new Date(a.unlockedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </span>
            )}

            {!a.unlocked && a.progressInfo && (
              <div className="achievements__progress">
                <div
                  className="achievements__progress-bar"
                  role="progressbar"
                  aria-valuenow={a.progressInfo.current}
                  aria-valuemin={0}
                  aria-valuemax={a.progressInfo.target}
                  aria-label={`${a.label} progress`}
                >
                  <div
                    className="achievements__progress-fill"
                    style={{ width: `${(a.progressInfo.current / a.progressInfo.target) * 100}%` }}
                  />
                </div>
                <span className="achievements__progress-text">
                  {a.progressInfo.current}/{a.progressInfo.target}
                </span>
              </div>
            )}

            {!a.unlocked && !a.progressInfo && (
              <span className="achievements__keep-going">Keep going!</span>
            )}
          </motion.div>
        ))}
      </div>
    </ScreenWrapper>
  );
}
