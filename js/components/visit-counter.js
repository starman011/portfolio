const { useState, useEffect } = React;

function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const namespace = 'starmanodyssey.com';
    const key = 'portfolio';

    async function fetchCount() {
      try {
        const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setCount(data.value);
        localStorage.setItem('visitCount', data.value);
      } catch (err) {
        console.error('View count error', err);
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

    fetchCount();
  }, []);

  const renderDigits = () => {
    if (count === null) {
      return 'Loading...';
    }
    return String(count).split('').map((d, i) =>
      React.createElement('span', { key: i, className: 'visit-counter-digit' }, d)
    );
  };

  return React.createElement('div', { className: 'visit-counter-wrapper' },
    React.createElement('div', { className: 'visit-counter-label' }, 'Visitors'),
    React.createElement('div', { className: 'visit-counter-digits' }, renderDigits())
  );
}

ReactDOM.render(
  React.createElement(VisitCounter),
  document.getElementById('visit-counter')
);
