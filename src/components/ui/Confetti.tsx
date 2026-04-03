import { useEffect, useState, useMemo } from 'react';
import { useSettings } from '../../context/SettingsContext';
import './Confetti.css';

const COLORS = [
  'var(--cyan)',
  'var(--pink)',
  'var(--amber)',
  'var(--purple)',
  'var(--blue)',
  'var(--green)',
];

const PARTICLE_COUNT = 30;
const DURATION = 2500;

interface Particle {
  id: number;
  left: string;
  color: string;
  size: number;
  delay: string;
  drift: string;
  spin: string;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 6,
    delay: `${Math.random() * 0.6}s`,
    drift: `${(Math.random() - 0.5) * 200}px`,
    spin: `${360 + Math.random() * 720}deg`,
  }));
}

interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show }: ConfettiProps) {
  const { settings } = useSettings();
  const [visible, setVisible] = useState(false);

  const particles = useMemo(() => (show ? generateParticles() : []), [show]);

  useEffect(() => {
    if (!show) return;
    if (settings.animations === 'none') return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), DURATION);
    return () => clearTimeout(timer);
  }, [show, settings.animations]);

  if (!visible || settings.animations === 'none') return null;

  return (
    <div className="confetti" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti__particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--drift' as any]: p.drift,
            ['--spin' as any]: p.spin,
          }}
        />
      ))}
    </div>
  );
}
