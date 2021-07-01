import { useEffect, useState } from 'react';
import sampleSize from 'lodash.samplesize';
import cardDict from './cardDict';
import Board from './components/board';
import './App.css';

function App() {
  let [cards, setCards] = useState([]);
  let [level, setLevel] = useState(1);
  let [curScore, setCurScore] = useState(0);
  let [numClicked, setNumClicked] = useState(0);
  let [bestScore, setBestScore] = useState(0);

  const scrambleBoard = (cardsCopy = cards) => {
    // shuffle cards using Durstenfeld shuffle
    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
    }

    setCards(cardsCopy);
  };

  // reset to level 1
  // ran when user clicked on an image that they have seen
  const resetRound = () => {
    setLevel(1);
    setCurScore(0);
    setNumClicked(0);

    let newCards = sampleSize(cardDict, level + 3);
    newCards = newCards.map((card) => ({ ...card, clicked: false }));
    setCards(newCards);
  };

  const handleCardSelect = (event) => {
    let targetId = event.currentTarget.id;
    let targetCard = cards.filter((card) => {
      return card.id === targetId;
    })[0];

    if (targetCard.clicked) {
      resetRound();
    } else {
      // set card to clicked
      let cardsCopy = JSON.parse(JSON.stringify(cards));
      cardsCopy = cardsCopy.map((card) =>
        card.id === targetId ? { ...card, clicked: true } : card
      );

      setCurScore(curScore + 1);
      setNumClicked(numClicked + 1);
      scrambleBoard(cardsCopy);
    }
  };

  useEffect(() => {
    if (level > 10) {
      setLevel(10);
    }
    let newCards = sampleSize(cardDict, level + 3);
    newCards = newCards.map((card) => ({ ...card, clicked: false }));
    setCards(newCards);
    setNumClicked(0);
  }, [level]);

  useEffect(() => {
    if (numClicked === level + 3) {
      setLevel(level + 1);
    }
  }, [numClicked]);

  useEffect(() => {
    if (curScore > bestScore) {
      setBestScore(curScore);
    }
  }, [curScore]);

  return (
    <div className="App">
      <h1 className="header">Memory Card Game</h1>
      <p>
        <em>Try to not select the same card twice in a level.</em>
      </p>
      <h2>Level {level}</h2>
      <p>Current Score: {curScore}</p>
      <p>Best Score: {bestScore}</p>
      <Board cards={cards} handleCardSelect={handleCardSelect} />
    </div>
  );
}

export default App;
