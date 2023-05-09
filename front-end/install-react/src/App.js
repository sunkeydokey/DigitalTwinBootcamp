import React from 'react';

import arrayData from './arrayData';
import objectData from './objectData';

const App = () => {
  console.log('arrayData: ', typeof arrayData);
  console.log(arrayData);
  console.log('objectData: ', typeof objectData);
  console.log(objectData);

  const newArrayData = arrayData.map((item, index) => {
    return (
      <li key={index}>
        {item.name}({item.age}) from {item.country}
      </li>
    );
  });
  // end of newArrayData

  return (
    <div className="App">
      <ul>{newArrayData}</ul>
      <h1>{objectData.welcomeMessage}</h1>
      <h2>you connected to {objectData.localAddress}</h2>
      {objectData.isDevEnv ? (
        <span>this is development environment</span>
      ) : null}
    </div>
  );
};

export default App;
