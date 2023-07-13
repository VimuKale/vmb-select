"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _creatable = _interopRequireDefault(require("react-select/creatable"));
var _reactSelect = require("react-select");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const CustomSelect = _ref => {
  let {
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
    crossIcon
  } = _ref;
  const OtherButton = OtherButtonComponent ? OtherButtonComponent : _material.Button;
  const selectRef = (0, _react.useRef)(null);
  const Menu = props => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactSelect.components.Menu, props, /*#__PURE__*/_react.default.createElement("div", null, props.children), allowOther && /*#__PURE__*/_react.default.createElement(OtherButton, {
      fullWidth: true,
      onPointerUp: () => {
        focusOnClick();
      }
    }, OtherButtonText)));
  };
  const Option = props => {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactSelect.components.Option, props, /*#__PURE__*/_react.default.createElement("div", {
      className: "option-container select-checkbox"
    }, /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      checked: props.isSelected,
      onChange: () => null,
      size: "small"
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "option-label"
    }, props.label))));
  };
  const handleRemoveValue = e => {
    const buttonName = e.currentTarget.name;
    const selectName = e.currentTarget.id;
    const removedValue = selectValue.find(val => val.value === buttonName);
    if (!removedValue) return;
    onChange(selectValue.filter(val => val.value !== buttonName), {
      buttonName,
      action: "remove-value",
      removedValue,
      name: selectName
    });
  };
  const OnChange = (selected, action) => {
    onChange(selected, action);
  };
  const focusOnClick = () => {
    selectRef.current.blur();
    setTimeout(selectRef.current.focus(), 0);
  };
  const handleOnCreate = value => {
    var _value$charAt;
    const Capitalized = (value === null || value === void 0 || (_value$charAt = value.charAt(0)) === null || _value$charAt === void 0 ? void 0 : _value$charAt.toUpperCase()) + (value === null || value === void 0 ? void 0 : value.slice(1));
    const newOption = {
      value: Capitalized,
      label: Capitalized,
      __isNew__: true
    };
    const action = {
      action: "create-option",
      name: name,
      option: newOption
    };
    if (Array.isArray(selectValue)) {
      OnChange([...selectValue, newOption], action);
    } else {
      OnChange(newOption, action);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, isLabel && /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    style: LabelStyle,
    required: isRequired,
    className: "inputfield-label"
  }, Label), /*#__PURE__*/_react.default.createElement(_creatable.default, _extends({
    name: name,
    styles: styles,
    value: selectValue,
    onChange: OnChange
  }, handleBlur && {
    onBlur: event => {
      if (name) {
        event.target.name = name;
      }
      handleBlur(event);
    }
  }, {
    isMulti: isMulti,
    openMenuOnFocus: true,
    options: options,
    ref: selectRef,
    components: _objectSpread(_objectSpread({
      Menu
    }, checkBox && {
      Option: Option
    }), {}, {
      IndicatorSeparator: () => null
    }),
    isSearchable: isSearchable,
    closeMenuOnSelect: true,
    onMenuClose: () => {
      selectRef.current.blur();
    },
    controlShouldRenderValue: !checkBox && !isMulti,
    hideSelectedOptions: !checkBox && hideSelectedOptions,
    formatCreateLabel: userInput => "Create \"".concat(userInput, "\""),
    placeholder: Placeholder,
    isDisabled: Disabled,
    isOptionDisabled: () => (selectValue === null || selectValue === void 0 ? void 0 : selectValue.length) >= maxOptions,
    isClearable: false,
    maxMenuHeight: maxMenuHeight,
    onCreateOption: HandleOnCreateOption ? value => HandleOnCreateOption(value, name) : handleOnCreate
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("small", {
    style: {
      marginTop: isValid && "2px",
      display: isValid ? "none" : "block"
    },
    className: "inputfield-message"
  }, Message)), (!selectValue || selectValue.length > 0) && /*#__PURE__*/_react.default.createElement("div", {
    className: !checkBox ? "values-container-flex" : "values-container"
  }, isMulti && checkBox ? selectValue.map(val => /*#__PURE__*/_react.default.createElement("div", {
    key: val.value,
    className: "select-value"
  }, val.label, /*#__PURE__*/_react.default.createElement("button", {
    name: val.value,
    id: name,
    key: val.value,
    onClick: handleRemoveValue,
    className: "xbutton"
  }, crossIcon ? crossIcon : "X"))) : null, isMulti && !checkBox ? selectValue.map(val => /*#__PURE__*/_react.default.createElement("div", {
    key: val.value,
    className: "select-value"
  }, val.label, /*#__PURE__*/_react.default.createElement("button", {
    name: val.value,
    id: name,
    key: val.value,
    onClick: handleRemoveValue,
    className: "xbutton"
  }, crossIcon ? crossIcon : "X"))) : null));
};
var _default = CustomSelect;
exports.default = _default;