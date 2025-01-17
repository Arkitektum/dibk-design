"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CheckBoxInput = _interopRequireDefault(require("./CheckBoxInput"));
var _helpers = require("../functions/helpers");
var _CheckBoxListItemModule = _interopRequireDefault(require("./CheckBoxListItem.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CheckBoxListItem = props => {
  const listItemClassNameArray = [_CheckBoxListItemModule.default.checkBoxListItem, props.checked ? _CheckBoxListItemModule.default.checked : null, props.disabled ? _CheckBoxListItemModule.default.disabled : null, props.compact ? _CheckBoxListItemModule.default.compact : null, props.contentOnly ? _CheckBoxListItemModule.default.contentOnly : null, props.hasErrors ? _CheckBoxListItemModule.default.hasErrors : null];
  const listItemClassNameString = (0, _helpers.classNameArrayToClassNameString)(listItemClassNameArray);
  const inputProps = {
    onChange: props.onChange,
    checked: props.checked,
    disabled: props.disabled,
    required: props.required,
    requiredGroup: props.requiredGroup,
    contentOnly: props.contentOnly,
    hasErrors: props.hasErrors,
    "aria-controls": props["aria-controls"],
    "aria-describedby": props["aria-describedby"],
    id: props.id,
    name: props.name,
    checkmarkCharacter: props.checkmarkCharacter
  };
  return _react.default.createElement("div", {
    className: listItemClassNameString
  }, _react.default.createElement(_CheckBoxInput.default, inputProps, props.children));
};
CheckBoxListItem.propTypes = {
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  required: _propTypes.default.bool,
  requiredGroup: _propTypes.default.bool,
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  contentOnly: _propTypes.default.bool,
  compact: _propTypes.default.bool,
  hasErrors: _propTypes.default.bool,
  checkmarkCharacter: _propTypes.default.string,
  "aria-controls": _propTypes.default.string,
  "aria-describedby": _propTypes.default.string
};
CheckBoxListItem.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
  requiredGroup: false,
  id: "",
  name: "",
  contentOnly: false,
  hasErrors: false,
  checkmarkCharacter: "✔",
  type: "CheckBoxListItem"
};
var _default = exports.default = CheckBoxListItem;