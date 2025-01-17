"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _helpers = require("../functions/helpers");
var _ErrorBoxModule = _interopRequireDefault(require("./ErrorBox.module.scss"));
var _infoSign = _interopRequireDefault(require("../assets/svg/info-sign.svg?url"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ErrorBox = props => {
  return _react.default.createElement("div", {
    className: (0, _helpers.classNameArrayToClassNameString)([_ErrorBoxModule.default.errorBoxContainer, _ErrorBoxModule.default[props.type], props.fullScreen && _ErrorBoxModule.default.fullScreen])
  }, _react.default.createElement("div", {
    className: (0, _helpers.classNameArrayToClassNameString)([_ErrorBoxModule.default.errorBox, props.fullScreen && _ErrorBoxModule.default.fullScreen])
  }, _react.default.createElement("img", {
    src: _infoSign.default,
    alt: "",
    className: _ErrorBoxModule.default.infoSign
  }), props.children));
};
ErrorBox.propTypes = {
  type: _propTypes.default.oneOf(["warning", "error"]),
  fullScreen: _propTypes.default.bool
};
ErrorBox.defaultProps = {
  children: "",
  type: "warning",
  fullScreen: false
};
var _default = exports.default = ErrorBox;