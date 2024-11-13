import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import ReactSelect, { components } from "react-select";
import { XMarkIcon } from "@heroicons/react/24/solid";

const DropdownField = ({
  className,
  isDisabled,
  placeholdernotVisible,
  isMulti,
  inputRef,
  control,
  error,
  dataArray,
  name,
  handleInputChange,
  onInputChange,
  placeholder,
  isClearable,
  maxMenuHeight,
  defaultValue,
  searchIcon,
  isSearchable,
  menuPlacement,
  menuShouldBlockScroll,
  onKeyDown,
  referance,
  // maxMenuHeight
}) => {
  const ref = useRef(null);
  const [width, setWidth] = useState("full");
  const [fullwidth, setFullWidth] = useState(0);
  const placeHolderPositionTop = useRef(null);
  const [placeHolderTop, setPlaceHolderTop] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState(false);

  const fieldValue = useWatch({ control, name, defaultValue });

  useEffect(() => {
    if (fieldValue) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [fieldValue]);

  useEffect(() => {
    placeHolderPositionTop.current = placeHolderTop;
  }, [placeHolderTop]);

  // dummyChanges
  if (menuPlacement) {
  } else {
    menuPlacement = "auto";
  }
  if (menuShouldBlockScroll !== true) {
    menuShouldBlockScroll = false;
  }

  const fnhandleInputChange = (inputValue, { action, prevInputValue }) => {
    handleInputChange(inputValue);
  };

  useLayoutEffect(() => {
    if (isClearable) {
      setWidth(ref.current.offsetWidth - 72);
    } else {
      setWidth(ref.current.offsetWidth - 52);
    }
    setFullWidth(ref.current.offsetWidth);
  }, []);

  if (isSearchable !== true) {
    isSearchable = false;
  }

  let isError = !!error?.message;
  let bgColor = "rgba(255, 255, 255, 1)";

  const selectStyles = {
    singleValue: (Singstyles) => ({
      ...Singstyles,
      paddingLeft: "4px",
      fontSize: "14px",
      // maxWidth: width,
      textOverflow: "clipped",
    }),

    menu: (styles) => ({
      ...styles,
      position: "absolute",
      boxShadow: "0 20px 54px 0 rgba(0,0,0,0.2)",
      zIndex: 50,
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      minWidth: ref.current.offsetWidth,
      width: "fit-content",
      borderRadius:"8px"
    }),
    option: (provided, { isDisabled, isFocused, isSelected }) => ({
      ...provided,
      whiteSpace: "nowrap",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "rgba(222,235,255,1)"
        : isFocused
        ? "rgba(222,235,255,0.5)"
        : undefined,

      color: isDisabled
        ? undefined
        : isSelected
        ? "#000000"
        : isFocused
        ? "#000000"
        : undefined,
    }),
    control: (Colstyles, state) => ({
      ...Colstyles,
      borderRadius: "8px",
      fontSize: "14px",
      minHeight: "36.3px",
      maxHeight: "fit-content",
      textOverflow: "ellipsis",
      display: "flex",
      // flexWrap: isMulti ? "wrap" : "nowrap",
      border: isError
        ? state.isSelected
          ? "1px solid #DEEBFF"
          : state.isFocused
          ? "1px solid #DEEBFF"
          : state.hasValue || state.selectProps.inputValue
          ? "1px solid #d32f2f"
          : "1px solid #d32f2f"
        : state.hasValue || state.selectProps.inputValue
        ? ""
        : "",
    }),

    indicatorSeparator: (styles) => ({ display: "none", paddingX: "2px" }),

    IndicatorContainer: (style) => ({
      ...style,
      display: "none",
      padding: "2px",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      position: "relative",
      // width:'2px',
      fontSize: "14px",
      // maxWidth: width,
      whiteSpace: "nowrap",
      overflow: "visible",
      // border:'2px solid gold',
      display: "grid",
      flexWrap: isMulti ? "wrap" : "nowrap",
      maxHeight: "fit-content",
      textOverflow: "hidden",
      paddingLeft: state.hasValue || state.selectProps.inputValue ? 2 : 5,
      fontStyle: "normal",
      padding: "0px",
    }),
    input: (provided, state) => ({
      ...provided,
      width: "2px",
      fontSize: "14px",
      // maxWidth: width,
      // maxHeight: 'fit-content',
      textOverflow: "ellipsis",
      // display:'flex',
      overflow: "hidden",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: placeholdernotVisible
        ? state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue
          ? "none"
          : "block"
        : "block",

      position: "absolute",
      fontSize: "10px",
      borderRadius: "2px",

      color:
        state.menuIsOpen || state.selectProps.menuIsOpen
          ? isDisabled
            ? "#eaeaea"
            : "#1976D2"
          : isError
          ? "#d32f2f"
          : "#9e9e9e",

      fontSize:
        (state.menuIsOpen ||
          state.selectProps.menuIsOpen ||
          state.hasValue ||
          state.selectProps.inputValue) &&
        11,
      transition: "top 0.1s, font-size 0.1s",

      top:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? isSearchable
            ? -11
            : -11
          : isSearchable
          ? 6
          : "18%",

      paddingLeft:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",

      paddingRight:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 4
          : "",

      // marginTop: state.menuIsOpen || state.selectProps.menuIsOpen || state.hasValue || state.selectProps.inputValue ? 4: "",

      marginBottom:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 2
          : "",

      backgroundColor:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? isDisabled
            ? "#f0f0f0"
            : bgColor
          : "",

      zIndex:
        state.menuIsOpen ||
        state.selectProps.menuIsOpen ||
        state.hasValue ||
        state.selectProps.inputValue
          ? 10
          : "",

      fontStyle: "normal",
    }),
  };
  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption ? true : false);
  };

  const handleClear = (field) => {
    field.onChange(null);
    setSelected(false);
  };

  return (
    <div className=" w-full -mt-6" ref={ref}>
      <label
        className={`relative  text-xs z-30 left-2 bg-white px-1 transition-all duration-200 ${
          isFocused
            ? "top-[8px] text-xs text-blue-600"
            : selected
            ? "top-[8px] text-xs text-gray-500"
            : "top-[29px] text-sm text-gray-500"
        }`}
        htmlFor={name}
      >
        {placeholder}
      </label>
      <FormControl fullWidth sx={{ overFlowX: "hidden" }}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <ReactSelect
              className={className + "text-[14px] text-gray-600 w-full"}
              isDisabled={isDisabled}
              inputRef={inputRef}
              {...field}
              ref={referance}
              onKeyDown={onKeyDown}
              isMulti={isMulti}
              closeMenuOnSelect={isMulti ? false : true}
              maxMenuHeight={maxMenuHeight}
              options={dataArray}
              isClearable={true}
              clearValue={true}
              isSearchable={true}
              placeholder={""}
              defaultValue={defaultValue}
              styles={selectStyles}
              blurInputOnSelect={true}
              menuPlacement={menuPlacement}
              menuShouldBlockScroll={menuShouldBlockScroll}
              onInputChange={onInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              // isOptionSelected={handleSelected}
              // onChange={(selectedOption) => {
              //   field.onChange(selectedOption);
              //   handleChange(selectedOption);
              // }}
              components={{
                DropdownIndicator: () =>
                  isMulti ? (
                    <KeyboardArrowDownIcon className="mx-1 text-gray-600 p-0" />
                  ) : searchIcon ? (
                    <SearchIcon className="mx-1 text-gray-600 p-0" />
                  ) : (
                    <KeyboardArrowDownIcon className="mx-1 text-gray-600 p-0" />
                  ),
                ClearIndicator: (props) => (
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      props.clearValue(); 
                    }}
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-500" />
                  </div>
                ),
                //  ValueContainer: CustomValueContainer,
              }}
            />
          )}
        />
      </FormControl>
    </div>
  );
};

export default DropdownField;
