"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ContentBoxModule = _interopRequireDefault(require("./ContentBox.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ContentBox = props => {
  var _props$content;
  const renderTitle = () => {
    let className = _ContentBoxModule.default.title + " " + _ContentBoxModule.default[props.titleSize];
    if (props.title) {
      return _react.default.createElement("h2", {
        className: className
      }, props.title);
    } else {
      return;
    }
  };
  let colorClass = " " + _ContentBoxModule.default[props.color];
  let linkClass = props.href ? " " + _ContentBoxModule.default.link : "";
  let className = _ContentBoxModule.default.contentBox + colorClass + linkClass;
  const bodyContent = (_props$content = props.content) !== null && _props$content !== void 0 && _props$content.length ? props.content : props.children;
  if (props.href) {
    return _react.default.createElement("a", {
      href: props.href,
      className: className
    }, renderTitle(), _react.default.createElement("div", {
      className: _ContentBoxModule.default.content
    }, bodyContent));
  } else {
    return _react.default.createElement("div", {
      className: className
    }, renderTitle(), _react.default.createElement("div", {
      className: _ContentBoxModule.default.content
    }, bodyContent));
  }
};
ContentBox.propTypes = {
  title: _propTypes.default.string,
  titleSize: _propTypes.default.oneOf(["regular", "large"]),
  content: _propTypes.default.string,
  children: _propTypes.default.any,
  color: _propTypes.default.oneOf(["default", "secondary"])
};
ContentBox.defaultProps = {
  title: null,
  titleSize: "regular",
  href: null,
  content: "",
  color: "default"
};
var _default = exports.default = ContentBox;