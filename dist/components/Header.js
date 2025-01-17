"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _HeaderModule = _interopRequireDefault(require("./Header.module.scss"));
var _helpers = require("../functions/helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Header = props => {
  var _props$htmlTag, _props$label, _props$content;
  const bigClass = props.big ? _HeaderModule.default.bigHeader : "";
  const htmlTag = (_props$htmlTag = props.htmlTag) !== null && _props$htmlTag !== void 0 && _props$htmlTag.length ? props.htmlTag : "h".concat(props.size);
  const headerClass = _HeaderModule.default.header;
  const headerSizeClass = _HeaderModule.default["size-".concat(props.size)];
  let headerElement = _react.default.createElement(htmlTag, {
    className: (0, _helpers.classNameArrayToClassNameString)([headerClass, headerSizeClass, bigClass]),
    id: props.id || null,
    htmlFor: props.htmlFor || null,
    style: props !== null && props !== void 0 && (_props$label = props.label) !== null && _props$label !== void 0 && _props$label.length ? {
      "--label": "\"".concat(props.label, "\"")
    } : null
  }, !!((_props$content = props.content) !== null && _props$content !== void 0 && _props$content.length) ? props.content : props.children);
  return _react.default.createElement("div", {
    className: _HeaderModule.default.headerContainer
  }, " ", headerElement, " ");
};
Header.propTypes = {
  id: _propTypes.default.string,
  content: _propTypes.default.string,
  size: _propTypes.default.oneOf([1, 2, 3, 4, 5]),
  big: _propTypes.default.bool,
  label: _propTypes.default.string,
  htmlTag: _propTypes.default.string,
  htmlFor: _propTypes.default.string
};
Header.defaultProps = {
  size: 1
};
var _default = exports.default = Header;