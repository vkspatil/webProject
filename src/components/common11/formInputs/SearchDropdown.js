// SearchDropdown.jsx
import React from "react";
import { Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { MagnifyingGlassIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

// Custom placeholder styles when it should not be visible
const customPlaceholderStyles = (shouldHide) => ({
  placeholder: (provided) => ({
    ...provided,
    display: shouldHide ? "none" : "block",
  }),
});

// Custom SingleValue component to include the search icon
const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    {props.data.label}
    {props.selectProps.searchIcon && (
      <MagnifyingGlassIcon className="ml-2 h-5 w-5 text-gray-500" />
    )}
  </components.SingleValue>
);

const SearchDropdown = ({
  isDisabled = false,
  isMulti = false,
  placeholderNotVisible = false,
  searchIcon = false,
  control,
  error,
  name,
  dataArray = [],
  inputRef,
  placeholder = "",
  label = "",
  handleInputChange,
  menuShouldBlockScroll = false,
  menuPlacement = "bottom",
  isClearable = false,
  onChange,
  onKeyDown,
  defaultValue = [],
  maxMenuHeight = 300,
  referance,
  fontSize = "text-sm", // Font size
  selectSize = "h-10", // Dropdown height
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className={`ml-1 absolute text-sm duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white px-2 ${
            error ? "text-red-500" : "text-gray-500"
          } peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3`}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            isDisabled={isDisabled}
            isMulti={isMulti}
            options={dataArray}
            isSearchable={true}
            placeholder={placeholder}
            onChange={(selected) => {
              field.onChange(selected);
              if (onChange) onChange(selected);
            }}
            onInputChange={handleInputChange}
            menuShouldBlockScroll={menuShouldBlockScroll}
            menuPlacement={menuPlacement}
            isClearable={isClearable}
            onKeyDown={onKeyDown}
            inputRef={inputRef}
            styles={{
              ...customPlaceholderStyles(placeholderNotVisible),
              control: (provided, state) => ({
                ...provided,
                padding: "3px",
                borderRadius: "0.375rem",
                // border: "1px solid transparent", // Remove the border
                boxShadow: "none", // Remove blue focus border
                outline: "none",
                fontSize: "inherit", // Use font size from props
                height: selectSize, // Use dropdown size from props
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 5,
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "inherit", // Use font size from props
              }),
              placeholder: (provided) => ({
                ...provided,
                fontSize: "inherit", // Use font size from props
              }),
              input: (provided) => ({ ...provided, border: "#d1d5db" }),
            }}
            maxMenuHeight={maxMenuHeight}
            components={{
              SingleValue: searchIcon ? CustomSingleValue : undefined,
            }}
          />
        )}
      />
    </div>
  );
};

SearchDropdown.propTypes = {
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  placeholderNotVisible: PropTypes.bool,
  searchIcon: PropTypes.bool,
  control: PropTypes.object.isRequired,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  dataArray: PropTypes.array,
  inputRef: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  handleInputChange: PropTypes.func,
  menuShouldBlockScroll: PropTypes.bool,
  menuPlacement: PropTypes.string,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  defaultValue: PropTypes.array,
  maxMenuHeight: PropTypes.number,
  referance: PropTypes.any,
  fontSize: PropTypes.string,
  selectSize: PropTypes.string,
};

export default SearchDropdown;
