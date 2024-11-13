import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Make sure to install @heroicons/react

const InputField = ({
  name,
  control,
  label,
  error,
  type = "text",
  disabled = false,
  inputRef,
  defaultValue,
  onKeyDown,
  autoComplete,
  maxLength,
  showPasswordIcon = false,
  onChange,
  onClick,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div>
            <input
              type={
                type === "password" && !isPasswordVisible ? "password" : "text"
              }
              id={name}
              className={`block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              ref={inputRef}
              {...field}
              autoComplete={autoComplete}
              maxLength={maxLength}
              onKeyDown={onKeyDown}
              placeholder=""
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              onClick={onClick}
              disabled={disabled}
              {...rest}
            />
            {type === "password" && showPasswordIcon && (
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            )}
            <label
              htmlFor={name}
              className={`ml-1 absolute text-sm duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white px-2 ${
                fieldState.error
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              } peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
            >
              {label}
            </label>
          
          </div>
        )}
      />
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  error: PropTypes.object,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  inputRef: PropTypes.object,
  defaultValue: PropTypes.string,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  showPasswordIcon: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default InputField;
