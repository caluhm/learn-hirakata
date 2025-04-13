import React from "react";

type GameButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "success" | "error" | "disabled";
  className?: string;
  children: React.ReactNode;
};

export const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  children,
}) => {
  const baseStyle =
    "text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-700",
    success: "bg-green-600",
    error: "bg-red-600",
    disabled: "bg-gray-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
