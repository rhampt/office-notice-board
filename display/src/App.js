import logo from './logo.svg';
import './App.css';
import React from 'react';

const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

function App() {
  const [state, stateSet] = React.useState([{ stateID: 0, text: 'init', timestamp: 'Null' }]);

  React.useEffect(() => {
    async function fetchState() {
      const fullResponse = await fetch('http://localhost:80/state');
      const responseJson = await fullResponse.json();

      const newState = {
        stateID: responseJson.stateID,
        text: responseJson.text,
        timestamp: new Date().toLocaleString('en-US', dateFormat),
      };

      stateSet(newState);
    }
    fetchState();
  }, [state]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // React.useEffect(() => {
  //   console.log(`initializing interval`);
  //   const interval = setInterval(() => {
  //     stateSet({
  //       ...state,
  //       timestamp: new Date().toLocaleString('en-US', dateFormat),
  //     });
  //   }, 1000);

  //   return () => {
  //     console.log(`clearing interval`);
  //     clearInterval(interval);
  //   };
  // }, [state]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{state.timestamp}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{state.text}</p>
      </header>
    </div>
  );
}

export default App;
