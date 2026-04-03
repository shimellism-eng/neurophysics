import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { useHaptics } from '../../hooks/useHaptics';
import type { AchievementView } from '../../hooks/useAchievements';
import './AchievementToast.css';

interface AchievementToastProps {
  achievement: AchievementView | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  const { settings } = useSettings();
  const { successBuzz } = useHaptics();
  const noAnims = settings.animations === 'none';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!achievement) {
      setVisible(false);
      return;
    }

    setVisible(true);
    successBuzz();
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, noAnims ? 0 : 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [achievement, onDismiss, noAnims, successBuzz]);

  if (noAnims) {
    if (!visible || !achievement) return null;
    return (
      <div className="achievement-toast" role="status" aria-live="polite">
        <span className="achievement-toast__icon" aria-hidden="true">{achievement.icon}</span>
        <div className="achievement-toast__text">
          <span className="achievement-toast__heading">Achievement Unlocked!</span>
          <span className="achievement-toast__name">{achievement.label}</span>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && achievement && (
        <motion.div
          className="achievement-toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -40, x: '-50%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span className="achievement-toast__icon" aria-hidden="true">{achievement.icon}</span>
          <div className="achievement-toast__text">
            <span className="achievement-toast__heading">Achievement Unlocked!</span>
            <span className="achievement-toast__name">{achievement.label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
