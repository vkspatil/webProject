import React from "react";

const CommonButton = ({
  type,
  onClick,
  label,
  className,
  disabled,
  icon,
  iconPosition = "start",
  referance,
  onKeyDown,
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={
        !disabled
          ? `${className} flex items-center justify-center rounded-lg py-1 px-3`
          : "rounded-lg text-base font-medium bg-gray-400 text-white flex items-center justify-center py-1 px-3"
      }
      ref={referance}
      onKeyDown={onKeyDown}
    >
      {icon && iconPosition === "start" && <span className="mr-2">{icon}</span>}

      <span>{label}</span>

      {icon && iconPosition === "end" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default CommonButton;
