import "./App.css";
import Dice from "./components/dice/Dice";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dices, setDices] = useState(allNewDice());
  const [rolled, setRolled] = useState(0);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dices.every((dice) => dice.isSellected);
    const allSameValue = dices.every((dice) => dice.value === dices[0].value);

    if (allHeld && allSameValue) {
      return setTenzies((oldValue) => {
        return true;
      });
    }
  }, [dices]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isSellected: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function sellectedDice(id) {
    setDices((oldDices) =>
      oldDices.map((oldDice) => {
        return oldDice.id === id
          ? { ...oldDice, isSellected: !oldDice.isSellected }
          : oldDice;
      })
    );
  }

  function newRandomDices() {
    setRolled((oldValue) => oldValue + 1);
    setDices((oldDices) => {
      return oldDices.map((oldDice) => {
        return oldDice.isSellected
          ? oldDice
          : { ...oldDice, value: Math.ceil(Math.random() * 6) };
      });
    });
  }

  function newGame() {
    setDices(allNewDice());
    setTenzies(false);
    setRolled(0);
  }

  const diceElements = dices.map((dice) => (
    <Dice
      onClick={() => sellectedDice(dice.id)}
      number={dice.value}
      isSellected={dice.isSellected}
      key={dice.id}
    />
  ));

  return (
    <main className="card">
      {tenzies && <Confetti numberOfPieces={500} gravity={0.05} />}
      <p className="card-title">Tenzies</p>
      <p className="card-text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <span className="rolled-number">You Rolled: {rolled}</span>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={tenzies ? newGame : newRandomDices}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
