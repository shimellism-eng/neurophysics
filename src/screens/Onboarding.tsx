import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { IconForces, IconElectricity, IconWaves, IconEnergy } from '../components/ui/Icons';
import './Onboarding.css';

export function Onboarding() {
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  function handleStart() {
    completeOnboarding();
    navigate('/home');
  }

  return (
    <main className="onboarding safe-top safe-bot">
      <div className="onboarding__screen">
        <div className="onboarding__logo-wrap">
          <IconForces size={28} className="onboarding__logo-icon" />
          <IconElectricity size={28} className="onboarding__logo-icon" />
          <IconWaves size={28} className="onboarding__logo-icon" />
          <IconEnergy size={28} className="onboarding__logo-icon" />
        </div>
        <div>
          <h1 className="onboarding__headline">NeuroPhysics</h1>
          <p className="onboarding__tagline">Physics. For every brain.</p>
        </div>
        <p className="onboarding__desc">
          GCSE Physics built from the ground up for neurodivergent learners.
          Interactive simulations. Real exam questions. No flashing. No pressure.
        </p>
        <div className="onboarding__features">
          {[
            'Full national curriculum coverage',
            'Interactive simulations and diagrams',
            'Examiner-informed lessons',
            'Designed for neurodivergent minds',
          ].map(f => (
            <div key={f} className="onboarding__feature">
              <span className="onboarding__feature-check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <button className="onboarding__cta" onClick={handleStart}>
          Start learning
        </button>
      </div>
    </main>
  );
}
