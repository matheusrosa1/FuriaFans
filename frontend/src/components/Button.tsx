// src/components/Button.tsx

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // 👈 ícone opcional
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  icon,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border border-black text-black px-2 py-1 rounded flex items-center gap-2 transition-colors
        hover:text-white hover:bg-purple-700
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
