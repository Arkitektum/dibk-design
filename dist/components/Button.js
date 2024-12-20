"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _helpers = require("../functions/helpers");
var _ButtonModule = _interopRequireDefault(require("./Button.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Button = props => {
  var _props$href, _props$href2, _props$children;
  const getArrowClass = arrow => {
    switch (arrow) {
      case "left":
        return _ButtonModule.default.hasArrowLeft;
      case "right":
        return _ButtonModule.default.hasArrowRight;
      default:
        return "";
    }
  };
  let buttonProps = _objectSpread(_objectSpread({}, props), {}, {
    "aria-invalid": props.hasErrors || null,
    href: !props.disabled && (_props$href = props.href) !== null && _props$href !== void 0 && _props$href.length ? props.href : null
  });
  delete buttonProps.noHover;
  delete buttonProps.hasErrors;
  delete buttonProps.rounded;
  delete buttonProps.inputType;
  delete buttonProps.color;
  delete buttonProps.content;
  delete buttonProps.arrow;
  delete buttonProps.noMargin;
  const buttonColor = (props === null || props === void 0 ? void 0 : props.inputType) === "radio" ? props.defaultChecked ? "primary" : "secondary" : props.color;
  const className = (0, _helpers.classNameArrayToClassNameString)([_ButtonModule.default.button, _ButtonModule.default[buttonColor], _ButtonModule.default[props.size], getArrowClass(props.arrow), props.noHover || (props === null || props === void 0 ? void 0 : props.inputType) === "radio" ? _ButtonModule.default.noHover : null, props.rounded && _ButtonModule.default.rounded, props.hasErrors && _ButtonModule.default.hasErrors, props.disabled && _ButtonModule.default.disabled, props.noMargin && _ButtonModule.default.noMargin]);
  const renderReactLinkElements = childElements => {
    const childElementsthroughFragments = (0, _helpers.cloneThroughFragments)(childElements);
    return childElementsthroughFragments.map((childElement, index) => {
      var _childElement$props;
      if (!buttonProps.disabled && !!(childElement !== null && childElement !== void 0 && (_childElement$props = childElement.props) !== null && _childElement$props !== void 0 && _childElement$props.to)) {
        var _childElement$props2, _childElement$props3;
        const childElementCopy = _react.default.cloneElement(childElement, {
          className: className,
          key: "button-".concat(index),
          to: !buttonProps.disabled && childElement !== null && childElement !== void 0 && (_childElement$props2 = childElement.props) !== null && _childElement$props2 !== void 0 && _childElement$props2.to ? childElement === null || childElement === void 0 || (_childElement$props3 = childElement.props) === null || _childElement$props3 === void 0 ? void 0 : _childElement$props3.to : null
        });
        return childElementCopy;
      } else {
        return _react.default.createElement("button", _extends({}, buttonProps, {
          key: "button-".concat(index),
          className: className
        }), props.content || childElement.props.children);
      }
    });
  };
  if (props.inputType === "button") {
    return _react.default.createElement("input", _extends({}, buttonProps, {
      className: className,
      type: "button",
      value: props.content
    }));
  } else if (props.inputType === "radio") {
    return _react.default.createElement("label", {
      className: className
    }, _react.default.createElement("input", _extends({}, buttonProps, {
      type: "radio"
    })), props.content);
  } else if ((_props$href2 = props.href) !== null && _props$href2 !== void 0 && _props$href2.length && !props.disabled) {
    return _react.default.createElement("a", _extends({}, buttonProps, {
      className: className
    }), props.content || props.children);
  } else if ((props === null || props === void 0 || (_props$children = props.children) === null || _props$children === void 0 ? void 0 : _props$children.type) === _reactRouterDom.Link) {
    return _react.default.createElement(_react.Fragment, null, renderReactLinkElements(_react.default.Children.toArray(props.children)));
  } else {
    return _react.default.createElement("button", _extends({}, buttonProps, {
      className: className
    }), props.content || props.children);
  }
};
Button.propTypes = {
  content: _propTypes.default.string,
  color: _propTypes.default.oneOf(["primary", "secondary"]),
  size: _propTypes.default.oneOf(["small", "regular"]),
  arrow: _propTypes.default.oneOf(["none", "left", "right"]),
  disabled: _propTypes.default.bool,
  inputType: _propTypes.default.oneOf(["button", "radio"]),
  name: _propTypes.default.string,
  defaultChecked: _propTypes.default.bool,
  required: _propTypes.default.bool,
  hasErrors: _propTypes.default.bool,
  "aria-describedby": _propTypes.default.string,
  noHover: _propTypes.default.bool,
  rounded: _propTypes.default.bool,
  href: _propTypes.default.string,
  onClick: _propTypes.default.func,
  noMargin: _propTypes.default.bool
};
Button.defaultProps = {
  color: "primary",
  size: "regular",
  disabled: false,
  hasErrors: false,
  noHover: false,
  arrow: "none",
  noMargin: false
};
var _default = exports.default = Button;