import React from "react";
import { useGameState } from "./hooks/useGameState";
import GameSummary from "./components/GameSummary";
import GamePlay from "./components/GamePlay";
import GameSetup from "./components/GameSetup";

const HiraganaGame: React.FC = () => {
  const { state, dispatch, startGame, generateQuestion, resetGame } =
    useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      {!state.gameStarted && state.currentRound === state.rounds ? (
        <GameSummary
          state={state}
          startGame={startGame}
          resetGame={resetGame}
        />
      ) : state.gameStarted ? (
        <GamePlay
          state={state}
          dispatch={dispatch}
          generateQuestion={generateQuestion}
        />
      ) : (
        <GameSetup state={state} dispatch={dispatch} startGame={startGame} />
      )}
    </div>
  );
};

export default HiraganaGame;
