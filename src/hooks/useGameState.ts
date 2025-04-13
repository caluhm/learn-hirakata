import { useReducer } from "react";
import hiragana from "../../assets/hiragana.json";
import katakana from "../../assets/katakana.json";

type CharacterType = "hiragana" | "katakana" | "both";

type Kana = {
  kana: string;
  roumaji: string;
  type: string;
  source?: "hiragana" | "katakana";
};

type Summary = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  characterType: "hiragana" | "katakana";
};

export type State = {
  rounds: number;
  currentRound: number;
  score: number;
  currentQuestion: Kana | null;
  options: string[];
  feedback: string | null;
  gameStarted: boolean;
  summary: Summary[];
  characterType: CharacterType;
};

export type Action =
  | { type: "SET_ROUNDS"; payload: number }
  | { type: "SET_CHARACTER_TYPE"; payload: CharacterType }
  | { type: "START_GAME" }
  | {
      type: "GENERATE_QUESTION";
      payload: { question: Kana; options: string[] };
    }
  | {
      type: "SET_FEEDBACK";
      payload: { feedback: string; selectedAnswer: string };
    }
  | { type: "NEXT_ROUND" }
  | { type: "END_GAME" }
  | { type: "RESET_GAME" };

const initialState: State = {
  rounds: 5,
  currentRound: 0,
  score: 0,
  currentQuestion: null,
  options: [],
  feedback: null,
  gameStarted: false,
  summary: [],
  characterType: "hiragana",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ROUNDS":
      return { ...state, rounds: action.payload };
    case "SET_CHARACTER_TYPE":
      return { ...state, characterType: action.payload };
    case "START_GAME":
      return {
        ...state,
        gameStarted: true,
        score: 0,
        currentRound: 1,
        summary: [],
      };
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
            userAnswer: action.payload.selectedAnswer || "No Answer",
            characterType: state.currentQuestion?.source || "hiragana",
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
      };
    case "RESET_GAME":
      return { ...initialState };
    default:
      return state;
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAvailableCharacters = () => {
    const availableChars = [];
    if (state.characterType === "hiragana" || state.characterType === "both") {
      availableChars.push(
        ...hiragana.map((char) => ({ ...char, source: "hiragana" as const }))
      );
    }
    if (state.characterType === "katakana" || state.characterType === "both") {
      availableChars.push(
        ...katakana.map((char) => ({ ...char, source: "katakana" as const }))
      );
    }
    return availableChars;
  };

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    generateQuestion();
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const generateQuestion = () => {
    const availableChars = getAvailableCharacters();
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    const question = availableChars[randomIndex];
    const shuffledOptions = shuffleOptions(question);
    dispatch({
      type: "GENERATE_QUESTION",
      payload: { question, options: shuffledOptions },
    });
  };

  const shuffleOptions = (correctAnswer: Kana): string[] => {
    const sameTypeChars = getAvailableCharacters().filter(
      (item) =>
        item.source === correctAnswer.source &&
        item.roumaji !== correctAnswer.roumaji &&
        item.roumaji &&
        !item.roumaji.includes("(") &&
        /^[a-z]+$/.test(item.roumaji)
    );

    const randomIncorrect = sameTypeChars
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((item) => item.roumaji);

    return [correctAnswer.roumaji, ...randomIncorrect].sort(
      () => 0.5 - Math.random()
    );
  };

  return { state, dispatch, startGame, generateQuestion, resetGame };
};
