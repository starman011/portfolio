import React, { useState, useEffect } from 'https://esm.sh/react@17.0.2';

export default function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        await fetch('/api/view', { method: 'POST' });
        const res = await fetch('/api/count');
        if (!res.ok) throw new Error('Backend response was not ok');
        const data = await res.json();
        setCount(data.count);
        localStorage.setItem('visitCount', data.count);
      } catch (err) {
        console.error('Backend view count error, falling back to CountAPI', err);
        try {
          const namespace = 'starmanodyssey.com';
          const key = 'portfolio';
          const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
          if (!res.ok) throw new Error('CountAPI response was not ok');
          const data = await res.json();
          setCount(data.value);
          localStorage.setItem('visitCount', data.value);
        } catch (err2) {
          console.error('CountAPI error', err2);
          const stored = localStorage.getItem('visitCount');
          if (stored !== null) {
            const parsed = parseInt(stored, 10) || 0;
            const newCount = parsed + 1;
            localStorage.setItem('visitCount', newCount);
            setCount(newCount);
          } else {
            setCount(0);
          }
        }
      }
    }

    fetchCount();
  }, []);

  const renderDigits = () => {
    if (count === null) {
      return 'Loading...';
    }
    return String(count)
      .split('')
      .map((d, i) => <span key={i} className="visit-counter-digit">{d}</span>);
  };

  return (
    <div className="visit-counter-wrapper">
      <div className="visit-counter-label">Visitors</div>
      <div className="visit-counter-digits">{renderDigits()}</div>
    </div>
  );
}

