import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

export function useStreak() {
  const { progress, updateStreak } = useUser();

  // Update streak on mount (once per session)
  useEffect(() => {
    updateStreak();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    streak: progress?.streak ?? 0,
    lastActiveDate: progress?.lastActiveDate ?? null,
  };
}
