"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _RadioButtonIconModule = _interopRequireDefault(require("./RadioButtonIcon.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RadioButtonIcon = props => {
  let inlineStyle = {
    height: props.size,
    width: props.size
  };
  const radioButtonIconProps = {
    className: "".concat(_RadioButtonIconModule.default.radioButtonIcon, " ").concat(props.checked ? _RadioButtonIconModule.default.checked : "", " ").concat(props.disabled ? _RadioButtonIconModule.default.disabled : "", " ").concat(props.hasErrors ? _RadioButtonIconModule.default.hasErrors : ""),
    style: inlineStyle
  };
  return _react.default.createElement("span", radioButtonIconProps);
};
RadioButtonIcon.propTypes = {
  size: _propTypes.default.string,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  hasErrors: _propTypes.default.bool
};
RadioButtonIcon.defaultProps = {
  size: "10px",
  checked: false,
  disabled: false,
  hasErrors: false
};
var _default = exports.default = RadioButtonIcon;