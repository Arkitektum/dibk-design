// Dependencies
import React from "react";
import PropTypes from "prop-types";

// Components
import RadioButtonIcon from "./RadioButtonIcon";

// Assets
import asterisk from "../assets/svg/asterisk.svg?url";

// Stylesheets
import style from "./RadioButtonInput.module.scss";

const RadioButtonInput = (props) => {
    const labelProps = {
        className: `${style.radioButtonInput} ${props.checked ? style.checked : ""} ${
            props.disabled ? style.disabled : ""
        } ${props.hasErrors ? style.hasErrors : ""}`,
        htmlFor: props.id
    };

    const iconProps = {
        checked: props.checked,
        disabled: props.disabled,
        hasErrors: !props.contentOnly && props.hasErrors
    };

    const inputProps = {
        id: props.id,
        name: props.name || null,
        type: "radio",
        value: props.inputValue,
        checked: props.checked,
        disabled: props.disabled,
        required: props.required || props.requiredGroup,
        onChange: props.onChange,
        tabIndex: props.tabIndex || null,
        "aria-controls": props["aria-controls"],
        "aria-invalid": props.hasErrors ? "true" : null,
        "aria-describedby": props["aria-describedby"]
    };

    return (
        <label {...labelProps}>
            {!props.contentOnly ? (
                <React.Fragment>
                    <RadioButtonIcon {...iconProps} />
                    <input {...inputProps} />
                </React.Fragment>
            ) : null}
            <span className={style.labelText}>
                {props.children}
                {props.required && <img src={asterisk} alt="" className={style.requiredSymbol} />}
            </span>
        </label>
    );
};

RadioButtonInput.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    requiredGroup: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    contentOnly: PropTypes.bool,
    hasErrors: PropTypes.bool,
    inputValue: PropTypes.string.isRequired,
    "aria-controls": PropTypes.string,
    "aria-describedby": PropTypes.string
};

RadioButtonInput.defaultProps = {
    name: "",
    checked: false,
    disabled: false,
    required: false,
    requiredGroup: false,
    contentOnly: false,
    hasErrors: false
};

export default RadioButtonInput;
