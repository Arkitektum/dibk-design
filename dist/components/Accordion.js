"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _helpers = require("../functions/helpers");
var _AccordionModule = _interopRequireDefault(require("./Accordion.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Accordion = props => {
  const [expanded, setExpanded] = (0, _react.useState)(props.expanded);
  const [initialized, setInitialized] = (0, _react.useState)(props.initialized);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setInitialized(true);
    if (props.onToggleExpand) {
      props.onToggleExpand();
    }
  };
  (0, _react.useEffect)(() => {
    setExpanded(props.expanded);
  }, [props.expanded]);
  const renderPanel = () => {
    return _react.default.createElement("button", _extends({}, props.buttonProps, {
      className: _AccordionModule.default.panel,
      onClick: handleToggleExpand,
      "aria-expanded": expanded ? "true" : "false"
    }), _react.default.createElement("span", {
      className: _AccordionModule.default.panelText
    }, props.title), _react.default.createElement("span", {
      className: "".concat(_AccordionModule.default.panelChevron, " ").concat(expanded ? _AccordionModule.default.expanded : "")
    }));
  };
  const className = (0, _helpers.classNameArrayToClassNameString)([_AccordionModule.default.accordion, props.color && _AccordionModule.default[props.color], !props.noMargin && _AccordionModule.default.margin]);
  return _react.default.createElement("div", {
    className: className
  }, renderPanel(), _react.default.createElement("div", {
    className: "".concat(_AccordionModule.default.content, " ").concat(initialized ? _AccordionModule.default.initialized : "", " ").concat(expanded ? _AccordionModule.default.expanded : "")
  }, props.children));
};
Accordion.propTypes = {
  title: _propTypes.default.string,
  titleSize: _propTypes.default.oneOf(["regular", "large"]),
  content: _propTypes.default.string,
  color: _propTypes.default.oneOf(["default", "secondary"]),
  expanded: _propTypes.default.bool,
  onToggleExpand: _propTypes.default.func,
  buttonProps: _propTypes.default.object
};
Accordion.defaultProps = {
  title: null,
  titleSize: "regular",
  href: null,
  content: "",
  color: "default",
  expanded: false,
  noMargin: false
};
var _default = exports.default = Accordion;