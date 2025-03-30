import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Input = (props) => {
  const {
    label,
    icon,
    type,
    name,
    onChange,
    placeholder,
    className,
    value,
    disabled,
    multiple
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {type !== "password" ? (
        <div>
          <label className="text-gray-700 font-semibold" htmlFor={name}>
            {label}
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-[5]">
              {icon}
            </span>
            <input
              name={name}
              type={type}
              className={`appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              multiple={multiple}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            {label}
          </label>
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-[5]">
            {icon}
          </span>
          <input
            name={name}
            type={showPassword ? "text" : "password"}
            required
            className={`appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
