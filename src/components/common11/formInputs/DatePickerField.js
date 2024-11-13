import React from "react";
import { Controller } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";

function DatePickerFieldNew({
  name,
  label,
  control,
  defaultValue,
  disabled,
  minDate,
  maxDate,
  error,
  ...rest
}) {
  return (
    <div className="w-full">
      <Label htmlFor={name} value={label} />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextInput
            id={name}
            type="date"
            ref={ref}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            min={minDate}
            max={maxDate}
            disabled={disabled}
            className={error ? "border-red-500" : ""}
            {...rest}
          />
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default DatePickerFieldNew;
