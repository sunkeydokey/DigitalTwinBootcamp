import './App.css';

import words from 'random-words';
import { useState } from 'react';
import Blank from './components/Blank';

const App = () => {
  const [missionWord, setMissionWord] = useState(
    words({ exactly: 1, maxLength: 6, join: '' }).split('')
  );

  const [mission, setMission] = useState(
    [...new Set(missionWord)].join('').length
  );
  const [choosedArray, setChoosedArray] = useState([]);
  const [chances, setChances] = useState(10);

  const [input, setInput] = useState('');

  const handleReset = () => {
    setMissionWord(words({ exactly: 1, maxLength: 6, join: '' }).split(''));
    setMission([...new Set(missionWord)].join('').length);
    setChoosedArray([]);
    setChances(10);
  };

  return (
    <div className="container">
      <header>
        <h1>행맨!</h1>
      </header>
      {mission ? (
        <div className="alphabets">
          <p>입력한 알파벳</p>
          <p>{choosedArray}</p>
        </div>
      ) : (
        ''
      )}

      <main>
        {mission ? (
          missionWord.map((word, idx) => {
            return <Blank key={idx} text={word} alphabets={choosedArray} />;
          })
        ) : (
          <div>굿!</div>
        )}
      </main>
      {mission && chances ? (
        <div className="container">
          <input
            className="input"
            type="text"
            value={input}
            maxLength={1}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="btn check-btn"
            onClick={() => {
              if (!input || choosedArray.includes(input) || parseInt(input)) {
                setInput('');
                return;
              }

              const newArr = [...choosedArray, input];
              setChoosedArray(newArr);
              if (missionWord.includes(input)) {
                setMission((prev) => prev - 1);
              }
              setInput('');
              setChances(chances - 1);
            }}
          >
            확인
          </button>
          <p>남은 기회 {chances}</p>
        </div>
      ) : (
        <>
          <p>정답은 {missionWord.join('').toUpperCase()}</p>
          <button className="btn reset-btn" onClick={handleReset}>
            다시하기
          </button>
        </>
      )}
    </div>
  );
};

export default App;
