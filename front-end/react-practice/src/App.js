import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const rests = count % 4;
  const color = ['red', 'green', 'gold', 'blue'];

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return (
    <div>
      <h1>
        I've rendered
        {count}
        times!
      </h1>
      <h2 style={{ color: color[rests] }}>현재 색깔은 {color[rests]}!!</h2>
    </div>
  );
}

export default App;
