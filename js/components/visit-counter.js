const { useState, useEffect } = React;

function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // First register the visit on the backend
    fetch('/api/view', { method: 'POST' })
      .catch(err => {
        console.error('View increment error', err);
      })
      .finally(() => {
        // Then retrieve the current count from MongoDB
        fetch('/api/count')
          .then(res => res.json())
          .then(data => setCount(data.count))
          .catch(err => {
            console.error('View count error', err);
            setCount(0); // fallback to zero on failure
          });
      });
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
