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

  const handleCharacterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "SET_CHARACTER_TYPE",
      payload: event.target.value as "hiragana" | "katakana" | "both",
    });
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white/10 rounded-lg backdrop-blur-sm text-center">
      <h1 className="text-4xl font-bold mb-6">Japanese Character Quiz</h1>
      <div className="space-y-8 mb-8">
        <div>
          <label className="text-2xl mb-4 block">
            Character Type:
            <select
              value={state.characterType}
              onChange={handleCharacterTypeChange}
              className="ml-4 p-2 border rounded bg-white/20 backdrop-blur-sm text-white text-center text-xl w-40"
            >
              <option value="hiragana">Hiragana</option>
              <option value="katakana">Katakana</option>
              <option value="both">Both</option>
            </select>
          </label>
        </div>
        <div>
          <label className="text-2xl mb-4 block">
            Number of Rounds:
            <input
              type="number"
              value={state.rounds}
              onChange={handleRoundsChange}
              min="1"
              className="ml-4 p-2 border rounded bg-white/20 backdrop-blur-sm text-white text-center text-2xl w-24"
            />
          </label>
        </div>
      </div>
      <button
        onClick={startGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
      >
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;
