import React from "react";
import { State, Action } from "../hooks/useGameState";

type GameSetupProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  startGame: () => void;
};

const GameSetup: React.FC<GameSetupProps> = ({
  state,
  dispatch,
  startGame,
}) => {
  const handleRoundsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rounds = parseInt(event.target.value, 10);
    if (!isNaN(rounds)) {
      dispatch({ type: "SET_ROUNDS", payload: rounds });
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Hiragana Quiz</h1>
      <label className="block text-lg mb-2">
        Number of Rounds:
        <input
          type="number"
          value={state.rounds}
          onChange={handleRoundsChange}
          className="ml-2 p-1 border rounded"
        />
      </label>
      <button
        onClick={startGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;
