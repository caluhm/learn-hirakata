import React from "react";

type GameLayoutProps = {
  children: React.ReactNode;
};

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => (
  <div className="max-w-4xl w-full mx-auto p-6 bg-white/10 rounded-lg backdrop-blur-sm text-center">
    {children}
  </div>
);
