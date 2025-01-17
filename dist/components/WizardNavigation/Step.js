"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _helpers = require("../../functions/helpers");
var _StepModule = _interopRequireDefault(require("./Step.module.scss"));
var _checkmarkSymbol = _interopRequireDefault(require("../../assets/svg/checkmark-symbol.svg?url"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Step = props => {
  const getActiveClass = step => {
    return props.activeStepId === step.id ? _StepModule.default.active : "";
  };
  const getFinishedClass = step => {
    return step.finished ? _StepModule.default.finished : "";
  };
  const getErrorClass = step => {
    return step.hasErrors ? _StepModule.default.hasErrors : "";
  };
  const renderStepContent = (step, index) => {
    const isActiveStep = props.activeStepId === step.id;
    const isVertical = props.direction === "vertical";
    const isFinished = step.finished;
    const showCheckmarkSymbol = isVertical && isFinished && !isActiveStep;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", {
      className: _StepModule.default.stepNumber
    }, index + 1), _react.default.createElement("span", {
      className: _StepModule.default.stepName
    }, step.name), showCheckmarkSymbol && _react.default.createElement("img", {
      src: _checkmarkSymbol.default,
      alt: "",
      className: _StepModule.default.checkmarkSymbol
    }));
  };
  const {
    step,
    index,
    activeStepId
  } = props;
  return _react.default.createElement("li", {
    className: (0, _helpers.classNameArrayToClassNameString)([_StepModule.default.wizardTopnavItem, getActiveClass(step), getFinishedClass(step), getErrorClass(step), _StepModule.default[props.direction]])
  }, step.link && Object.keys(step.link).length ? _react.default.createElement(_reactRouterDom.Link, {
    to: step.link,
    "aria-current": activeStepId === step.id ? "step" : null,
    className: _StepModule.default.wizardTopnavItemContent
  }, renderStepContent(step, index)) : _react.default.createElement("span", {
    "aria-current": activeStepId === step.id ? "step" : null,
    className: _StepModule.default.wizardTopnavItemContent
  }, renderStepContent(step, index)));
};
Step.propTypes = {
  step: _propTypes.default.object.isRequired,
  activeStepId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  index: _propTypes.default.number.isRequired,
  direction: _propTypes.default.oneOf(["vertical", "horizontal"])
};
Step.defaultProps = {
  direction: "vertical"
};
var _default = exports.default = Step;