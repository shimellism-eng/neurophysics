import { useState } from 'react';

interface PhETSimProps {
  url: string;
  title: string;
  aspectRatio?: number; // width/height, default 16/9
}

export function PhETSim({ url, title, aspectRatio = 16 / 9 }: PhETSimProps) {
  const [loaded, setLoaded] = useState(false);

  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div className="phet-sim">
      <div className="phet-sim__ratio" style={{ paddingBottom }}>
        {!loaded && (
          <div className="phet-sim__loading" aria-hidden="true">
            <div className="phet-sim__spinner" />
          </div>
        )}
        <iframe
          src={url}
          title={title}
          allowFullScreen
          allow="fullscreen"
          className="phet-sim__frame"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <p className="phet-sim__credit">
        Simulation by{' '}
        <a
          href="https://phet.colorado.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="phet-sim__link"
        >
          PhET Interactive Simulations
        </a>
        , University of Colorado Boulder
      </p>
    </div>
  );
}
