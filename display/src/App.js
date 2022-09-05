import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [state, stateSet] = React.useState([{ stateID: -1, text: 'INIT', timestamp: 'NULL' }]);

  React.useEffect(() => {
    async function fetchState() {
      try {
        const fullResponse = await fetch('http://localhost:80/state');
        const responseJson = await fullResponse.json();
        stateSet(responseJson);
      } catch {
        stateSet({
          stateID: -1,
          text: 'Unable to connect to the config server',
          timestamp: '',
        });
      }
    }
    const interval = setInterval(() => {
      fetchState();
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

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
