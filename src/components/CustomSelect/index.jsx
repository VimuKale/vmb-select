import { Button, Checkbox, InputLabel } from "@mui/material";
import React, { useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
const CustomSelect = ({
  selectValue = [],
  isLabel = true,
  name = "vmb-select",
  Label = "Select",
  isMulti,
  checkBox,
  isRequired,
  onChange,
  LabelStyle,
  Placeholder = "Select Option",
  Disabled,
  options,
  maxOptions,
  handleBlur,
  isValid,
  Message,
  maxMenuHeight,
  hideSelectedOptions,
  HandleOnCreateOption,
  styles = {},
  allowOther = false,
  OtherButtonComponent,
  OtherButtonText = "Other",
  isSearchable,
  crossIcon,
}) => {
  const OtherButton = OtherButtonComponent ? OtherButtonComponent : Button;
  const selectRef = useRef(null);
  const Menu = (props) => {
    return (
      <>
        <components.Menu {...props}>
          <div>{props.children}</div>
          {allowOther && (
            <OtherButton
              fullWidth
              onPointerUp={() => {
                focusOnClick();
              }}
            >
              {OtherButtonText}
            </OtherButton>
          )}
        </components.Menu>
      </>
    );
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className="option-container select-checkbox">
            <Checkbox
              checked={props.isSelected}
              onChange={() => null}
              size="small"
            />
            <label className="option-label">{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  };

  const handleRemoveValue = (e) => {
    const buttonName = e.currentTarget.name;
    const selectName = e.currentTarget.id;
    const removedValue = selectValue.find((val) => val.value === buttonName);
    if (!removedValue) return;
    onChange(
      selectValue.filter((val) => val.value !== buttonName),
      {
        buttonName,
        action: "remove-value",
        removedValue,
        name: selectName,
      }
    );
  };

  const OnChange = (selected, action) => {
    onChange(selected, action);
  };

  const focusOnClick = () => {
    selectRef.current.blur();
    setTimeout(selectRef.current.focus(), 0);
  };

  const handleOnCreate = (value) => {
    const Capitalized = value?.charAt(0)?.toUpperCase() + value?.slice(1);

    const newOption = {
      value: Capitalized,
      label: Capitalized,
      __isNew__: true,
    };

    const action = {
      action: "create-option",
      name: name,
      option: newOption,
    };
    if (Array.isArray(selectValue)) {
      OnChange([...selectValue, newOption], action);
    } else {
      OnChange(newOption, action);
    }
  };

  return (
    <div>
      {isLabel && (
        <InputLabel
          style={LabelStyle}
          required={isRequired}
          className="inputfield-label"
        >
          {Label}
        </InputLabel>
      )}
      <CreatableSelect
        name={name}
        styles={styles}
        value={selectValue}
        onChange={OnChange}
        {...(handleBlur && {
          onBlur: (event) => {
            if (name) {
              event.target.name = name;
            }
            handleBlur(event);
          },
        })}
        isMulti={isMulti}
        openMenuOnFocus
        options={options}
        ref={selectRef}
        components={{
          Menu,
          ...(checkBox && { Option: Option }),
          IndicatorSeparator: () => null,
        }}
        isSearchable={isSearchable}
        closeMenuOnSelect
        onMenuClose={() => {
          selectRef.current.blur();
        }}
        controlShouldRenderValue={!checkBox && !isMulti}
        hideSelectedOptions={!checkBox && hideSelectedOptions}
        formatCreateLabel={(userInput) => `Create "${userInput}"`}
        placeholder={Placeholder}
        isDisabled={Disabled}
        isOptionDisabled={() => selectValue?.length >= maxOptions}
        isClearable={false}
        maxMenuHeight={maxMenuHeight}
        onCreateOption={
          HandleOnCreateOption
            ? (value) => HandleOnCreateOption(value, name)
            : handleOnCreate
        }
      />
      <div>
        <small
          style={{
            marginTop: isValid && "2px",
            display: isValid ? "none" : "block",
          }}
          className="inputfield-message"
        >
          {Message}
        </small>
      </div>
      {(!selectValue || selectValue.length > 0) && (
        <div
          className={!checkBox ? "values-container-flex" : "values-container"}
        >
          {isMulti && checkBox
            ? selectValue.map((val) => (
                <div key={val.value} className="select-value">
                  {val.label}
                  <button
                    name={val.value}
                    id={name}
                    key={val.value}
                    onClick={handleRemoveValue}
                    className="xbutton"
                  >
                    {crossIcon ? crossIcon : "X"}
                  </button>
                </div>
              ))
            : null}

          {isMulti && !checkBox
            ? selectValue.map((val) => (
                <div key={val.value} className="select-value">
                  {val.label}
                  <button
                    name={val.value}
                    id={name}
                    key={val.value}
                    onClick={handleRemoveValue}
                    className="xbutton"
                  >
                    {crossIcon ? crossIcon : "X"}
                  </button>
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
