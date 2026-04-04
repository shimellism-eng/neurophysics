import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import {
  IconForces, IconElectricity, IconWaves, IconEnergy,
  IconMagnetism, IconParticles, IconAtomic, IconSpace,
} from '../components/ui/Icons';
import './Topics.css';

const ALL_TOPICS = [
  { id: 'forces',      name: 'Forces',            Icon: IconForces,      color: 'var(--topic-forces)',      paper: 'Paper 2', concepts: ['resultant-forces','newtons-first-law','newtons-second-law','newtons-third-law','weight-and-gravity','momentum','work-and-energy'],                                                                                                                             available: true  },
  { id: 'electricity', name: 'Electricity',        Icon: IconElectricity, color: 'var(--topic-electricity)', paper: 'Paper 1', concepts: ['charge-and-current','potential-difference','resistance','ohms-law','series-circuits','parallel-circuits','power-and-energy'],                                                                                                                              available: true  },
  { id: 'waves',       name: 'Waves',              Icon: IconWaves,       color: 'var(--topic-waves)',       paper: 'Paper 2', concepts: ['transverse-and-longitudinal','wave-properties','wave-equation','reflection-and-refraction','sound-waves','electromagnetic-spectrum','light-and-colour'],                                                                                                   available: true  },
  { id: 'energy',      name: 'Energy',             Icon: IconEnergy,      color: 'var(--topic-energy)',      paper: 'Paper 1', concepts: ['energy-stores-and-transfers','kinetic-energy','gravitational-pe','elastic-pe','conservation-of-energy','efficiency','power'],                                                                                                                              available: true  },
  { id: 'magnetism',   name: 'Magnetism',          Icon: IconMagnetism,   color: 'var(--topic-magnetism)',   paper: 'Paper 2', concepts: ['permanent-temporary-magnets','magnetic-fields','electromagnetism','motor-effect','flemings-left-hand-rule','generators-and-induction','transformers'],                                                                                                    available: true  },
  { id: 'particles',   name: 'Particle Model',     Icon: IconParticles,   color: 'var(--topic-particles)',   paper: 'Paper 1', concepts: ['states-of-matter','particle-model','density','changes-of-state','internal-energy','specific-heat-capacity','specific-latent-heat'],                                                                                                                      available: true  },
  { id: 'atomic',      name: 'Atomic Structure',   Icon: IconAtomic,      color: 'var(--topic-nuclear)',     paper: 'Paper 2', concepts: ['atomic-structure','isotopes','radioactive-decay','alpha-beta-gamma','half-life','uses-of-radiation','nuclear-fission-fusion'],                                                                                                                            available: true  },
  { id: 'space',       name: 'Space Physics',      Icon: IconSpace,       color: 'var(--topic-space)',       paper: 'Paper 2', concepts: ['solar-system','life-cycle-of-stars','orbital-motion','red-shift','big-bang','dark-matter-energy','satellites'],                                                                                                                                          available: true  },
];

export function Topics() {
  const navigate = useNavigate();
  const { topicProgress } = useProgress();

  return (
    <ScreenWrapper>
      <div className="topics__header">
        <h1>Topics</h1>
        <p className="text-muted text-sm">GCSE Physics</p>
      </div>

      <div className="topics__list">
        {ALL_TOPICS.map(t => {
          const pct = topicProgress(t.concepts);
          return (
            <button
              key={t.id}
              className={`topics__card card ${!t.available ? 'topics__card--locked' : ''}`}
              onClick={() => t.available && navigate(`/topic/${t.id}`)}
              disabled={!t.available}
              style={{ '--tc': t.color } as React.CSSProperties}
            >
              <div className="topics__card-left">
                <div className="topics__icon-wrap" aria-hidden="true">
                  <t.Icon size={20} />
                </div>
                <div>
                  <p className="topics__name">{t.name}</p>
                  <p className="topics__meta">{t.paper}{!t.available ? ' · Coming soon' : ` · ${t.concepts.length} concepts`}</p>
                </div>
              </div>
              {t.available ? (
                <ProgressRing percent={pct} size={44} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="topics__lock-icon" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}
