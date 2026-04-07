'use client';
import { useEffect } from 'react';

interface GYGProps {
  partnerId: string;
  q: string;
  size?: number;
}

export default function GetYourGuideWidget({ partnerId, q, size = 3 }: GYGProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div style={{ margin: '40px 0' }}>
      <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.1em',
        textTransform: 'uppercase', fontWeight: '600' }}>REKOMMENDERADE UPPLEVELSER</p>
      <div data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-locale-code="sv-SE"
        data-gyg-widget="activities"
        data-gyg-number-of-items={size}
        data-gyg-partner-id={partnerId}
        data-gyg-q={q} />
    </div>
  );
}
