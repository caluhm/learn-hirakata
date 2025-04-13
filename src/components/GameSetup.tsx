import React from "react";
import { State, Action } from "../hooks/useGameState";
import { GameLayout } from "./shared/GameLayout";
import { GameButton } from "./shared/GameButton";

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <label className="text-2xl mb-4 block">
    {label}:
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ml-4 p-2 border rounded bg-white/20 backdrop-blur-sm text-white text-center text-xl w-40"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 1,
}) => (
  <label className="text-2xl mb-4 block">
    {label}:
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const num = parseInt(e.target.value, 10);
        if (!isNaN(num)) onChange(num);
      }}
      min={min}
      className="ml-4 p-2 border rounded bg-white/20 backdrop-blur-sm text-white text-center text-2xl w-24"
    />
  </label>
);

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
  const characterTypeOptions = [
    { value: "hiragana", label: "Hiragana" },
    { value: "katakana", label: "Katakana" },
    { value: "both", label: "Both" },
  ];

  return (
    <GameLayout>
      <h1 className="text-4xl font-bold mb-6">Japanese Character Quiz</h1>
      <div className="space-y-8 mb-8">
        <Select
          label="Character Type"
          value={state.characterType}
          onChange={(value) =>
            dispatch({
              type: "SET_CHARACTER_TYPE",
              payload: value as "hiragana" | "katakana" | "both",
            })
          }
          options={characterTypeOptions}
        />
        <NumberInput
          label="Number of Rounds"
          value={state.rounds}
          onChange={(value) => dispatch({ type: "SET_ROUNDS", payload: value })}
        />
      </div>
      <GameButton onClick={startGame} variant="primary">
        Start Game
      </GameButton>
    </GameLayout>
  );
};

export default GameSetup;
