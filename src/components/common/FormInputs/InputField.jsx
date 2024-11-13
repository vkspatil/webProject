import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState, forwardRef } from "react";
import { Controller } from "react-hook-form";

const PasswordInput = ({ showPassword, handleClick }) => (
  <InputAdornment position="end">
    <IconButton onClick={handleClick} edge="end">
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </InputAdornment>
);

const InputField = forwardRef(
  (
    {
      sx,
      variant,
      defaultValue,
      inputProps,
      type,
      disabled,
      inputRef,
      name,
      label,
      error,
      control,
      autoComplete = "off",
      color,
      onKeyDown,
      maxLength,
      referance,
      showPasswordIcon,
      InputLabelProps,
      onChange,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <FormControl fullWidth size="small" sx={sx}>
        <Controller
          render={({ field }) => (
            <TextField
              className="h-[36px] text-[14px] bg-white"
              inputRef={inputRef || referance || ref}
              onKeyDown={onKeyDown}
              autoComplete={autoComplete}
              InputLabelProps={InputLabelProps}
              onChange={onChange}
              inputProps={{
                ...inputProps,
                maxLength,
                min: type === "number" ? 0 : undefined,
                style: {
                  fontSize: "14px",
                  height: "18.5px",
                },
              }}
              sx={{
                "& .MuiFormLabel-root": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              onWheel={(e) => {
                if (type === "number") {
                  e.target.blur();
                }
              }}
              type={showPassword ? "text" : type}
              disabled={disabled}
              color={color}
              variant={variant}
              label={label}
              error={!!error?.message}
              placeholder={label}
              name={name}
              fullWidth
              {...field}
              size="small"
              InputProps={
                showPasswordIcon
                  ? {
                      endAdornment: (
                        <PasswordInput
                          showPassword={showPassword}
                          handleClick={handleClickShowPassword}
                        />
                      ),
                    }
                  : undefined
              }
            />
          )}
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </FormControl>
    );
  }
);

export default InputField;
