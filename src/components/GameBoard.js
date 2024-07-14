import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import Card from './Card';
import SuccessScreen from './SuccessScreen';

function GameBoard({ userName, onResetUserName }) {
  const [cards, setCards] = useState(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const items = [
    { emoji: "👇", id: "1", matchFound: false, flipped: false },
    { emoji: "👀", id: "2", matchFound: false, flipped: false },
    { emoji: "🙌", id: "3", matchFound: false, flipped: false },
    { emoji: "👋", id: "4", matchFound: false, flipped: false },
    { emoji: "🙏", id: "5", matchFound: false, flipped: false },
    { emoji: "🤔", id: "6", matchFound: false, flipped: false },
    { emoji: "🤦‍♂️", id: "7", matchFound: false, flipped: false },
    { emoji: "😔", id: "8", matchFound: false, flipped: false }
  ];

  function resetCards() {
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: Math.random() }));
    setCards(shuffled);
  }

  function handleCardClick(e) {
    if (!isGameActive) {
      startTimer();
      setIsGameActive(true);
    }
    firstSelection
      ? setSecondSelection(e.target.dataset.id)
      : setFirstSelection(e.target.dataset.id);
  }

  function resetTurn() {
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves((m) => m + 1);
    setDisabled(false);
  }

  function handleNewGameClick() {
    resetTurn();
    setMoves(0);
    setScore(0);
    resetCards();
    resetTimer();
    setIsGameActive(false);
    setIsGameCompleted(false);
  }

  useEffect(() => {
    if (!secondSelection) return;
    setDisabled(true);
    if (firstSelection === secondSelection) {
      setCards((prev) => {
        return prev.map((card) => {
          if (card.id === firstSelection) {
            return { ...card, matchFound: true };
          } else {
            return card;
          }
        });
      });
      setScore((prev) => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    resetCards();
  }, []);

  useEffect(() => {
    if (cards && cards.every(card => card.matchFound)) {
      stopTimer();
      setIsGameCompleted(true);
    }
  }, [cards]);

  function startTimer() {
    const id = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    setIntervalId(id);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    clearInterval(intervalId);
    setTime(0);
  }

  return (
    <div className="GameContainer">
      {!isGameCompleted ? (
        <>
          <h1 className='heading'>Tile Matching Game</h1> 
          <p>Welcome, {userName}!</p>
          <div className="gameboard">
            {cards && (
              Object.values(cards).map((card) => (
                <Card
                  key={card.key}
                  card={card}
                  disabled={disabled}
                  handleCardClick={handleCardClick}
                />
              ))
            )}
          </div>
          <div className='stats-container'>
            <p className='time'>Time: {time} seconds</p>
            <p className='totalMove'>Total Moves: {moves}</p>
            <p className='totalScore'>Total Score: {score}</p>
          </div>
        </>
      ) : (
        <SuccessScreen
          time={time}
          moves={moves}
          handleNewGameClick={handleNewGameClick}
          onResetUserName={onResetUserName}
        />
      )}
    </div>
  );
}

export default GameBoard;
