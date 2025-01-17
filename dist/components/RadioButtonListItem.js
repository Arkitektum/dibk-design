"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _RadioButtonInput = _interopRequireDefault(require("./RadioButtonInput"));
var _helpers = require("../functions/helpers");
var _RadioButtonListItemModule = _interopRequireDefault(require("./RadioButtonListItem.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RadioButtonListItem = props => {
  const listItemClassNameArray = [_RadioButtonListItemModule.default.radioButtonListItem, props.checked ? _RadioButtonListItemModule.default.checked : null, props.disabled ? _RadioButtonListItemModule.default.disabled : null, props.compact ? _RadioButtonListItemModule.default.compact : null, props.contentOnly ? _RadioButtonListItemModule.default.contentOnly : null, props.hasErrors ? _RadioButtonListItemModule.default.hasErrors : null];
  const listItemClassNameString = (0, _helpers.classNameArrayToClassNameString)(listItemClassNameArray);
  const inputProps = {
    onChange: props.onChange,
    inputValue: props.inputValue,
    checked: props.checked,
    disabled: props.disabled,
    required: props.required,
    requiredGroup: props.requiredGroup,
    contentOnly: props.contentOnly,
    hasErrors: props.hasErrors,
    "aria-controls": props["aria-controls"],
    "aria-describedby": props["aria-describedby"],
    id: props.id,
    name: props.name
  };
  return _react.default.createElement("div", {
    className: listItemClassNameString
  }, _react.default.createElement(_RadioButtonInput.default, inputProps, props.children));
};
RadioButtonListItem.propTypes = {
  inputValue: _propTypes.default.string.isRequired,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  required: _propTypes.default.bool,
  requiredGroup: _propTypes.default.bool,
  name: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func,
  contentOnly: _propTypes.default.bool,
  compact: _propTypes.default.bool,
  hasErrors: _propTypes.default.bool,
  "aria-controls": _propTypes.default.string,
  "aria-describedby": _propTypes.default.string
};
RadioButtonListItem.defaultProps = {
  name: "",
  checked: false,
  required: false,
  requiredGroup: false,
  disabled: false,
  contentOnly: false,
  hasErrors: false,
  type: "RadioButtonListItem"
};
var _default = exports.default = RadioButtonListItem;