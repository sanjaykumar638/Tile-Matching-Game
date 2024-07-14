import React from 'react';
import './SuccessScreen.css';

function SuccessScreen({ time, moves, handleNewGameClick, onResetUserName }) {
  const handlePlayAgainClick = () => {
    onResetUserName();
    handleNewGameClick();
  };

  return (
    <div className="success-screen">
      <div className="success-box">
        <h1>Congratulations!</h1>
        <p>You completed the game in {time} seconds.</p>
        <p>Total Moves: {moves}</p>
        <button onClick={handlePlayAgainClick}>Play Again</button>
      </div>
    </div>
  );
}

export default SuccessScreen;
