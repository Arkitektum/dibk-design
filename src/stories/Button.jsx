// Dependencies
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Functions
import { classNameArrayToClassNameString, cloneThroughFragments } from "../functions/helpers";

// Stylesheets
import style from "./Button.module.scss";

/**
 * Primary UI component for user interaction
 */
const Button = (props) => {
    const getArrowClass = (arrow) => {
        switch (arrow) {
            case "left":
                return style.hasArrowLeft;
            case "right":
                return style.hasArrowRight;
            default:
                return "";
        }
    };

    let buttonProps = {
        ...props,
        "aria-invalid": props.hasErrors || null,
        href: !props.disabled && props.href?.length ? props.href : null
    };
    delete buttonProps.noHover;
    delete buttonProps.hasErrors;
    delete buttonProps.rounded;
    delete buttonProps.inputType;
    delete buttonProps.color;
    delete buttonProps.content;
    delete buttonProps.arrow;
    delete buttonProps.noMargin;
    const buttonColor = props?.inputType === "radio" ? (props.defaultChecked ? "primary" : "secondary") : props.color;
    const className = classNameArrayToClassNameString([
        style.button,
        style[buttonColor],
        style[props.size],
        getArrowClass(props.arrow),
        props.noHover || props?.inputType === "radio" ? style.noHover : null,
        props.rounded && style.rounded,
        props.hasErrors && style.hasErrors,
        props.disabled && style.disabled,
        props.noMargin && style.noMargin
    ]);

    const renderReactLinkElements = (childElements) => {
        const childElementsthroughFragments = cloneThroughFragments(childElements);
        return childElementsthroughFragments.map((childElement, index) => {
            if (!buttonProps.disabled && !!childElement?.props?.to) {
                const childElementCopy = React.cloneElement(childElement, {
                    className: className,
                    key: `button-${index}`,
                    to: !buttonProps.disabled && childElement?.props?.to ? childElement?.props?.to : null
                });
                return childElementCopy;
            } else {
                return (
                    <button {...buttonProps} key={`button-${index}`} className={className}>
                        {props.content || childElement.props.children}
                    </button>
                );
            }
        });
    };
    if (props.inputType === "button") {
        return <input {...buttonProps} className={className} type="button" value={props.content} />;
    } else if (props.inputType === "radio") {
        return (
            <label className={className}>
                <input {...buttonProps} type="radio" />
                {props.content}
            </label>
        );
    } else if (props.href?.length && !props.disabled) {
        return (
            <a {...buttonProps} className={className}>
                {props.content || props.children}
            </a>
        );
    } else if (props?.children?.type === Link) {
        return <Fragment>{renderReactLinkElements(React.Children.toArray(props.children))}</Fragment>;
    } else {
        return (
            <button {...buttonProps} className={className}>
                {props.content || props.children}
            </button>
        );
    }
};

Button.propTypes = {
    /**
     * Text content inside button
     */
    content: PropTypes.string,
    /**
     * What color to use
     */
    color: PropTypes.oneOf(["primary", "secondary"]),
    /**
     * How large should the button be?
     */
    size: PropTypes.oneOf(["small", "regular"]),
    /**
     * Which direction should the arrow point
     */
    arrow: PropTypes.oneOf(["none", "left", "right"]),
    disabled: PropTypes.bool,
    /**
     * Button is used as an input
     */
    inputType: PropTypes.oneOf(["button", "radio"]),
    /**
     * Name if button is used as an radio input
     */
    name: PropTypes.string,
    /**
     * Checked if button is used as an radio input
     */
    defaultChecked: PropTypes.bool,
    required: PropTypes.bool,
    hasErrors: PropTypes.bool,
    "aria-describedby": PropTypes.string,
    noHover: PropTypes.bool,
    rounded: PropTypes.bool,
    href: PropTypes.string,

    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
    noMargin: PropTypes.bool
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

export default Button;
