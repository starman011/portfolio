const { useState, useEffect } = React;

function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const namespace = 'starmanodyssey.com';
    const key = 'portfolio';
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(err => console.error('View count error', err));
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
