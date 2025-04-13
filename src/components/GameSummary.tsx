import React from "react";
import { State } from "../hooks/useGameState";

type GameSummaryProps = {
  state: State;
  startGame: () => void;
  resetGame: () => void;
};

const GameSummary: React.FC<GameSummaryProps> = ({ state, resetGame }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-lg mb-4">Your score: {state.score}</p>
      <button
        onClick={resetGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play Again
      </button>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Round Summary</h2>
        <ul className="list-disc list-inside">
          {state.summary.map((round, index) => (
            <li key={index} className="mb-2">
              <strong>Question:</strong> {round.question} <br />
              <strong>Correct Answer:</strong> {round.correctAnswer} <br />
              <strong>Your Answer:</strong> {round.userAnswer || "No Answer"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameSummary;
