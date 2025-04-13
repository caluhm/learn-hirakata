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
    if (isAnswered) return; // Prevent multiple answers

    const isCorrect = answer === state.currentQuestion?.roumaji;
    dispatch({
      type: "SET_FEEDBACK",
      payload: {
        feedback: isCorrect ? "Correct!" : "Incorrect!",
        selectedAnswer: answer,
      },
    });
    setIsAnswered(true);
    setSelectedAnswer(answer); // Track the user's selected answer
  };

  const nextQuestion = () => {
    setIsAnswered(false); // Re-enable buttons for the next question
    setSelectedAnswer(null); // Reset selected answer
    dispatch({ type: "NEXT_ROUND" });
    generateQuestion();
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Round {state.currentRound}</h1>
      <p className="text-lg mb-4">
        What is the pronunciation of {state.currentQuestion?.kana}?
      </p>
      <div className="grid grid-cols-2 gap-4">
        {state.options.map((option: string, index: number) => {
          const isCorrectAnswer = option === state.currentQuestion?.roumaji;
          const isSelectedAnswer = option === selectedAnswer;

          let buttonStyle =
            "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";

          if (isAnswered) {
            if (isCorrectAnswer) {
              buttonStyle =
                "bg-green-700 text-white font-bold py-2 px-4 rounded"; // Highlight correct answer
            } else if (isSelectedAnswer) {
              buttonStyle = "bg-red-500 text-white font-bold py-2 px-4 rounded"; // Highlight incorrect selected answer
            } else {
              buttonStyle =
                "opacity-50 cursor-not-allowed text-white font-bold py-2 px-4 rounded"; // Dim other options
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
      {state.feedback && <p className="mt-4 text-lg">{state.feedback}</p>}
      {isAnswered && state.currentRound === state.rounds ? (
        <button
          onClick={() => dispatch({ type: "END_GAME" })}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Complete Game
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default GamePlay;
