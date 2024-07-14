import React, { useState } from 'react';
import './App.css';
import UserNameEntry from './components/UserNameEntry';
import GameBoard from './components/GameBoard';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  const handleResetUserName = () => {
    localStorage.removeItem('userName');
    setUserName('');
  };

  return (
    <div className="App">
      {userName ? (
        <GameBoard userName={userName} onResetUserName={handleResetUserName} />
      ) : (
        <UserNameEntry onSubmit={handleNameSubmit} />
      )}
    </div>
  );
}

export default App;
