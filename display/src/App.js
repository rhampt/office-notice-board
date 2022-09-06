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

const defaultState = {
  stateID: 0,
  text: 'Unknown',
  color: '#f8fb61',
  timestamp: `${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }, dateFormat)} (Offline)`,
};

function App() {
  const [state, stateSet] = React.useState([defaultState]);

  React.useEffect(() => {
    async function fetchState() {
      try {
        const fullResponse = await fetch('http://localhost:80/state');
        const responseJson = await fullResponse.json();
        stateSet(responseJson);
      } catch {
        stateSet(defaultState);
      }
    }
    const interval = setInterval(() => {
      fetchState();
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="App">
      <p className="State" style={{ backgroundColor: state.color }}>
        {state.text}
      </p>
      <img src={logo} className="App-logo" alt="logo" />
      <p>{state.timestamp}</p>
    </div>
  );
}

export default App;
