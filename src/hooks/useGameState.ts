import { useReducer } from "react";
import hiragana from "../../assets/hiragana.json";

type Hiragana = {
  kana: string;
  roumaji: string;
  type: string;
};

type Summary = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
};

export type State = {
  rounds: number;
  currentRound: number;
  score: number;
  currentQuestion: Hiragana | null;
  options: string[];
  feedback: string | null;
  gameStarted: boolean;
  summary: Summary[];
};

export type Action =
  | { type: "SET_ROUNDS"; payload: number }
  | { type: "START_GAME" }
  | {
      type: "GENERATE_QUESTION";
      payload: { question: Hiragana; options: string[] };
    }
  | {
      type: "SET_FEEDBACK";
      payload: { feedback: string; selectedAnswer: string };
    }
  | { type: "NEXT_ROUND" }
  | { type: "END_GAME" }
  | { type: "RESET_GAME" }; // Add new action type

const initialState: State = {
  rounds: 5,
  currentRound: 0,
  score: 0,
  currentQuestion: null,
  options: [],
  feedback: null,
  gameStarted: false,
  summary: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ROUNDS":
      return { ...state, rounds: action.payload };
    case "START_GAME":
      return { ...state, gameStarted: true, score: 0, currentRound: 1 };
    case "GENERATE_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload.question,
        options: action.payload.options,
        feedback: null,
      };
    case "SET_FEEDBACK": {
      const isCorrect = action.payload.feedback === "Correct!";
      return {
        ...state,
        feedback: action.payload.feedback,
        score: isCorrect ? state.score + 1 : state.score,
        summary: [
          ...state.summary,
          {
            question: state.currentQuestion?.kana || "",
            correctAnswer: state.currentQuestion?.roumaji || "",
            userAnswer: action.payload.selectedAnswer || "No Answer", // Use the selected answer from the payload
          },
        ],
      };
    }
    case "NEXT_ROUND": {
      const nextRound = state.currentRound + 1;
      if (nextRound > state.rounds) {
        return {
          ...state,
          gameStarted: false,
        };
      }
      return { ...state, currentRound: nextRound };
    }
    case "END_GAME":
      return {
        ...state,
        gameStarted: false,
      }; // Removed appending to summary to avoid duplication
    case "RESET_GAME":
      return { ...initialState }; // Reset to initial state
    default:
      return state;
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    generateQuestion(); // Generate the first question when the game starts
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    const question = hiragana[randomIndex];
    const shuffledOptions = shuffleOptions(question.roumaji);
    dispatch({
      type: "GENERATE_QUESTION",
      payload: { question, options: shuffledOptions },
    });
  };

  const shuffleOptions = (correctAnswer: string): string[] => {
    const incorrectAnswers = hiragana
      .filter((item) => item.roumaji !== correctAnswer && item.roumaji)
      .map((item) => item.roumaji);
    const randomIncorrect = incorrectAnswers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correctAnswer, ...randomIncorrect].sort(() => 0.5 - Math.random());
  };

  return { state, dispatch, startGame, generateQuestion, resetGame };
};
