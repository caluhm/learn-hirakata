import React, { useMemo } from "react";
import { State, Action } from "../hooks/useGameState";
import { GameLayout } from "./shared/GameLayout";
import { GameButton } from "./shared/GameButton";

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

  const handleNext = () => {
    if (state.currentRound === state.rounds) {
      dispatch({ type: "END_GAME" });
    } else {
      setIsAnswered(false);
      setSelectedAnswer(null);
      dispatch({ type: "NEXT_ROUND" });
      generateQuestion();
    }
  };

  const getAnswerButtonVariant = (option: string) => {
    if (!isAnswered) return "primary";
    if (option === state.currentQuestion?.roumaji) return "success";
    if (option === selectedAnswer) return "error";
    return "disabled";
  };

  const feedbackColor = useMemo(
    () =>
      state.feedback?.includes("Correct") ? "text-green-400" : "text-red-400",
    [state.feedback]
  );

  return (
    <GameLayout>
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
          {state.options.map((option: string, index: number) => (
            <GameButton
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              variant={getAnswerButtonVariant(option)}
            >
              {option}
            </GameButton>
          ))}
        </div>
      </div>

      {state.feedback && (
        <p className={`text-2xl font-bold mb-6 ${feedbackColor}`}>
          {state.feedback}
        </p>
      )}

      {isAnswered && (
        <GameButton onClick={handleNext} variant="primary">
          {state.currentRound === state.rounds
            ? "Complete Game"
            : "Next Question"}
        </GameButton>
      )}
    </GameLayout>
  );
};

export default GamePlay;
