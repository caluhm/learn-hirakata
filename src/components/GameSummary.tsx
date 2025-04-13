import React from "react";
import { State } from "../hooks/useGameState";
import { GameLayout } from "./shared/GameLayout";
import { GameButton } from "../components/shared/GameButton";

type ResultsTableProps = {
  summary: State["summary"];
};

const ResultsTable: React.FC<ResultsTableProps> = ({ summary }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-black/20">
          <th className="p-3 text-center border-b border-white/20">Round</th>
          <th className="p-3 text-center border-b border-white/20">Type</th>
          <th className="p-3 text-center border-b border-white/20">Question</th>
          <th className="p-3 text-center border-b border-white/20">
            Your Answer
          </th>
          <th className="p-3 text-center border-b border-white/20">
            Correct Answer
          </th>
          <th className="p-3 text-center border-b border-white/20">Result</th>
        </tr>
      </thead>
      <tbody>
        {summary.map((round, index) => {
          const isCorrect = round.userAnswer === round.correctAnswer;
          return (
            <tr
              key={index}
              className={`border-b border-white/10 ${
                isCorrect ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              <td className="p-3 text-center">{index + 1}</td>
              <td className="p-3 text-center capitalize">
                {round.characterType}
              </td>
              <td className="p-3 text-center text-2xl">{round.question}</td>
              <td className="p-3 text-center">
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    isCorrect ? "bg-green-500/30" : "bg-red-500/30"
                  }`}
                >
                  {round.userAnswer}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className="inline-block bg-green-500/30 px-2 py-1 rounded">
                  {round.correctAnswer}
                </span>
              </td>
              <td className="p-3 text-center">
                <span
                  className={`inline-block font-bold ${
                    isCorrect ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

type GameSummaryProps = {
  state: State;
  startGame: () => void;
  resetGame: () => void;
};

const GameSummary: React.FC<GameSummaryProps> = ({ state, resetGame }) => {
  return (
    <GameLayout>
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-2xl mb-6">
        Final Score: <span className="font-bold">{state.score}</span> /{" "}
        {state.rounds}
      </p>
      <GameButton onClick={resetGame} variant="primary" className="mb-8">
        Play Again
      </GameButton>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Round Summary</h2>
        <ResultsTable summary={state.summary} />
      </div>
    </GameLayout>
  );
};

export default GameSummary;
