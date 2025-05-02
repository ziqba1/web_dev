import React, { useState } from 'react';
import './App.css';

const colors = [
  { name: 'Gold', value: '#FFD700' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Crimson', value: '#DC143C' },
  { name: 'Sapphire Blue', value: '#0F52BA' },
  { name: 'Emerald Green', value: '#50C878' },
];

function App() {
  const [colorIndex, setColorIndex] = useState(0);

  const handleClick = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: colors[colorIndex].value }}
    >
      <div className="content">
        <h1>{colors[colorIndex].name}</h1>
        <button onClick={handleClick}>Press to Change Color</button>
      </div>
    </div>
  );
}

export default App;
