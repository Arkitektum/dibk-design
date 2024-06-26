// Dependencies
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Helpers
import { classNameArrayToClassNameString } from "../../functions/helpers";

// Stylesheets
import style from "./Step.module.scss";

// Assets
import checkmarkSymbol from "../../assets/svg/checkmark-symbol.svg?url";

const Step = (props) => {
    const getActiveClass = (step) => {
        return props.activeStepId === step.id ? style.active : "";
    };

    const getFinishedClass = (step) => {
        return step.finished ? style.finished : "";
    };

    const getErrorClass = (step) => {
        return step.hasErrors ? style.hasErrors : "";
    };

    const renderStepContent = (step, index) => {
        const isActiveStep = props.activeStepId === step.id;
        const isVertical = props.direction === "vertical";
        const isFinished = step.finished;
        const showCheckmarkSymbol = isVertical && isFinished && !isActiveStep;
        return (
            <Fragment>
                <span className={style.stepNumber}>{index + 1}</span>
                <span className={style.stepName}>{step.name}</span>
                {showCheckmarkSymbol && <img src={checkmarkSymbol} alt="" className={style.checkmarkSymbol} />}
            </Fragment>
        );
    };

    const { step, index, activeStepId } = props;

    return (
        <li
            className={classNameArrayToClassNameString([
                style.wizardTopnavItem,
                getActiveClass(step),
                getFinishedClass(step),
                getErrorClass(step),
                style[props.direction]
            ])}
        >
            {step.link && Object.keys(step.link).length ? (
                <Link
                    to={step.link}
                    aria-current={activeStepId === step.id ? "step" : null}
                    className={style.wizardTopnavItemContent}
                >
                    {renderStepContent(step, index)}
                </Link>
            ) : (
                <span aria-current={activeStepId === step.id ? "step" : null} className={style.wizardTopnavItemContent}>
                    {renderStepContent(step, index)}
                </span>
            )}
        </li>
    );
};

Step.propTypes = {
    step: PropTypes.object.isRequired,
    activeStepId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    index: PropTypes.number.isRequired,
    direction: PropTypes.oneOf(["vertical", "horizontal"])
};

Step.defaultProps = {
    direction: "vertical"
};

export default Step;
