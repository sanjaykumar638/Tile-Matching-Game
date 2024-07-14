import React, { useState } from 'react';
import './UserNameEntry.css';

const UserNameEntry = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    localStorage.setItem('userName', name);
    onSubmit(name);
  };

  return (
    <div className="user-entry-box">
      <h1>Enter Your Name</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Your Name"
      />
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
};

export default UserNameEntry;
