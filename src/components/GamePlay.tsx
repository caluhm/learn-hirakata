import React from "react";
import { State, Action } from "../hooks/useGameState";

type GamePlayProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  generateQuestion: () => void;
};

const GamePlay: React.FC<GamePlayProps> = ({
  state,
  dispatch,
  generateQuestion,
}) => {
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    const isCorrect = answer === state.currentQuestion?.roumaji;
    dispatch({
      type: "SET_FEEDBACK",
      payload: {
        feedback: isCorrect ? "Correct!" : "Incorrect!",
        selectedAnswer: answer,
      },
    });
    setIsAnswered(true);
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    dispatch({ type: "NEXT_ROUND" });
    generateQuestion();
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white/10 rounded-lg backdrop-blur-sm text-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Round {state.currentRound}</h1>
        <p className="text-2xl">Score: {state.score}</p>
      </div>

      <div className="mb-8">
        <p className="text-3xl mb-6">
          What is the pronunciation of{" "}
          <span className="text-4xl font-bold">
            {state.currentQuestion?.kana}
          </span>
          ?
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {state.options.map((option: string, index: number) => {
            const isCorrectAnswer = option === state.currentQuestion?.roumaji;
            const isSelectedAnswer = option === selectedAnswer;

            let buttonStyle =
              "text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors ";

            if (!isAnswered) {
              buttonStyle += "bg-blue-500 hover:bg-blue-700";
            } else {
              if (isCorrectAnswer) {
                buttonStyle += "bg-green-600";
              } else if (isSelectedAnswer) {
                buttonStyle += "bg-red-600";
              } else {
                buttonStyle += "bg-gray-600";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={buttonStyle}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {state.feedback && (
        <p
          className={`text-2xl font-bold mb-6 ${
            state.feedback.includes("Correct")
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {state.feedback}
        </p>
      )}

      {isAnswered &&
        (state.currentRound === state.rounds ? (
          <button
            onClick={() => dispatch({ type: "END_GAME" })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Complete Game
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Next Question
          </button>
        ))}
    </div>
  );
};

export default GamePlay;
