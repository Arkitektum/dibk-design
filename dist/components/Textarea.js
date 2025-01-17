"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Label = _interopRequireDefault(require("./Label"));
var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));
var _generators = require("../functions/generators");
var _asterisk = _interopRequireDefault(require("../assets/svg/asterisk.svg?url"));
var _TextareaModule = _interopRequireDefault(require("./Textarea.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Textarea = props => {
  const renderValueAsText = (value, defaultContent) => {
    return value ? value : defaultContent;
  };
  const getErrorElementId = () => {
    return "".concat(props.id, "-errorMessage");
  };
  const renderInputField = () => {
    var _props$value, _props$defaultValue, _props$width, _props$resize, _props$errorMessage, _props$ariaDescribed;
    const defaultValue = !((_props$value = props.value) !== null && _props$value !== void 0 && _props$value.length) && (_props$defaultValue = props.defaultValue) !== null && _props$defaultValue !== void 0 && _props$defaultValue.length ? props.defaultValue : false;
    const defaultKey = props.elementKey || null;
    const styleRules = _objectSpread(_objectSpread({}, ((_props$width = props.width) === null || _props$width === void 0 ? void 0 : _props$width.length) && {
      maxWidth: props.width
    }), ((_props$resize = props.resize) === null || _props$resize === void 0 ? void 0 : _props$resize.length) && {
      resize: props.resize
    });
    const textareaElementProps = {
      name: props.name,
      readOnly: props.readOnly,
      disabled: props.disabled,
      required: props.required,
      type: props.type,
      id: props.id,
      key: defaultKey || "".concat(props.id, "-").concat((0, _generators.generateRandomString)(6)),
      onChange: props.onChange,
      onBlur: props.onBlur,
      [defaultValue ? "defaultValue" : "value"]: defaultValue || props.value,
      placeholder: props.placeholder,
      rows: props.rows,
      className: props.hasErrors ? _TextareaModule.default.hasErrors : "",
      "aria-describedby": props.hasErrors && !!((_props$errorMessage = props.errorMessage) !== null && _props$errorMessage !== void 0 && _props$errorMessage.length) ? getErrorElementId() : !!((_props$ariaDescribed = props["aria-describedby"]) !== null && _props$ariaDescribed !== void 0 && _props$ariaDescribed.length) ? props["aria-describedby"] : null,
      "aria-invalid": props.hasErrors ? "true" : null,
      style: styleRules
    };
    return _react.default.createElement("textarea", textareaElementProps);
  };
  return _react.default.createElement("div", {
    className: _TextareaModule.default.textarea
  }, _react.default.createElement(_Label.default, {
    htmlFor: props.id
  }, props.label, props.required && _react.default.createElement("img", {
    src: _asterisk.default,
    alt: "",
    className: _TextareaModule.default.requiredSymbol
  })), !props.contentOnly ? renderInputField() : _react.default.createElement("span", null, renderValueAsText(props.value || props.defaultValue, props.defaultContent)), _react.default.createElement(_ErrorMessage.default, {
    id: getErrorElementId(),
    content: props.errorMessage
  }));
};
Textarea.propTypes = {
  id: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onBlur: _propTypes.default.func,
  name: _propTypes.default.string,
  type: _propTypes.default.string,
  required: _propTypes.default.bool,
  width: _propTypes.default.string,
  resize: _propTypes.default.oneOf(["both", "horizontal", "vertical", "none"]),
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  elementKey: _propTypes.default.string,
  rows: _propTypes.default.string,
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]))]),
  contentOnly: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  defaultContent: _propTypes.default.string,
  "aria-describedby": _propTypes.default.string,
  hasErrors: _propTypes.default.bool,
  errorMessage: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]))])
};
Textarea.defaultProps = {
  onChange: () => {
    return false;
  },
  name: "",
  type: "text",
  required: false,
  label: "",
  contentOnly: false,
  resize: "both",
  placeholder: "",
  defaultContent: "",
  hasErrors: false,
  errorMessage: ""
};
var _default = exports.default = Textarea;