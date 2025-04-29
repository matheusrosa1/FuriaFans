// src/components/Button.tsx

import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // 👈 ícone opcional
  disabled?: boolean;
  fullWidth?: boolean;
  reverseColor?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  icon,
  disabled = false,
  fullWidth = false,
  reverseColor = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border border-black text-black px-2 py-1 rounded flex items-center gap-2 transition-colors
       
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${fullWidth ? "w-full justify-center" : ""}
        ${reverseColor ? "bg-purple-700 text-white  hover:text-black hover:bg-white" : "bg-white text-black  hover:text-white hover:bg-purple-700"}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
