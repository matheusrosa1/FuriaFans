import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type InputProps = {
  isPassword?: boolean;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  label: string;
}

export default function Input({ isPassword = false, value, handleInputChange, label, name, required = true }: InputProps) {
  const [viewPassword, setViewPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setViewPassword((prev) => !prev);
  };

  return (
    <label className="block mb-6 relative">
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={isPassword && viewPassword ? "password" : "text"}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(e)}
        required={required}
        className="mt-1 block w-full border rounded px-3 py-2"
      />
      { isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute bottom-[8.5%] right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {!viewPassword ? <IoEye /> : <IoEyeOff />}
        </button>
      )}
    </label>
  );
}
