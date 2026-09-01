// Dependencies
import React, { Children, Fragment, type ReactElement, cloneElement } from "react";
import { Link as RouterLink } from "react-router";

// Helpers
import { classNameArrayToClassNameString, cloneThroughFragments } from "../functions/helpers";

// Stylesheets
import style from "./Button.module.scss";

type ArrowDirection = "none" | "left" | "right";
type ButtonSize = "small" | "regular";
export type ButtonColor = "primary" | "secondary" | "neutral";
export type InputType = "button" | "radio";

// The component renders a button, an anchor, a label-wrapped radio or a
// RouterLink depending on its props, so the attribute surface spans all four.
// `onChange` is re-typed for the radio variant, so the button version is omitted.
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onChange"> {
    content?: string;
    color?: ButtonColor;
    size?: ButtonSize;
    arrow?: ArrowDirection;
    inputType?: InputType;
    name?: string;
    defaultChecked?: boolean;
    required?: boolean;
    hasErrors?: boolean;
    "aria-describedby"?: string;
    noHover?: boolean;
    href?: string;
    noMargin?: boolean;
    uniformPadding?: boolean;
    children?: React.ReactNode;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;

    /**
     * Native button type. Distinct from `inputType`, which selects which element
     * is rendered. Without it a rendered <button> defaults to "submit".
     */
    type?: "button" | "submit" | "reset";

    /** Radio variant only. */
    checked?: boolean;
    /** Radio variant only. Typed for HTMLElement because the same prop bag is
     * spread onto a button, an anchor and an input. */
    onChange?: React.FormEventHandler<HTMLElement>;

    /** Anchor variant only. */
    target?: React.HTMLAttributeAnchorTarget;
    /** Anchor variant only. */
    rel?: string;

    [dataAttribute: `data-${string}`]: unknown;
}

const Button = ({
    content,
    color = "primary",
    size = "regular",
    arrow = "none",
    disabled = false,
    inputType,
    defaultChecked,
    hasErrors = false,
    noHover = false,
    noMargin = false,
    uniformPadding = false,
    href,
    children,
    iconLeft,
    iconRight,
    className: classNameProp,
    // Defaults to "button": a bare <button> is type="submit" per HTML, so a
    // Button placed inside a form used to submit it on every click.
    type = "button",
    ...rest
}: ButtonProps) => {
    const renderIcon = (icon: React.ReactNode) => (icon ? <span className={style.buttonIcon}>{icon}</span> : null);
    const getArrowClass = (arrow: ArrowDirection): string => {
        switch (arrow) {
            case "left":
                return style.hasArrowLeft;
            case "right":
                return style.hasArrowRight;
            default:
                return "";
        }
    };

    const buttonColor = inputType === "radio" ? (defaultChecked ? "primary" : "secondary") : color;

    const className = classNameArrayToClassNameString([
        style.button,
        style[buttonColor],
        style[size],
        getArrowClass(arrow),
        noHover || inputType === "radio" ? style.noHover : null,
        hasErrors && style.hasErrors,
        disabled ? style.disabled : null,
        noMargin ? style.noMargin : null,
        uniformPadding ? style.uniformPadding : null,
        iconLeft || iconRight ? style.hasIcon : null,
        classNameProp
    ]);

    const contentClassName = classNameArrayToClassNameString([
        style.buttonContent,
        iconLeft ? style.hasIconLeft : null,
        iconRight ? style.hasIconRight : null
    ]);

    // Props valid on every element this component can render. `href` is added
    // by the anchor branch alone — on a <button> or <label> it would render as
    // an invalid attribute.
    //
    // `disabled` was styling only: it added a class and was never applied to
    // the element, so a disabled Button stayed focusable and clickable and was
    // announced as available. `undefined` rather than `false` keeps it off the
    // markup when enabled, and off the <a> the anchor branch renders — which
    // only runs when the button is not disabled anyway.
    const commonProps = {
        "aria-invalid": hasErrors || undefined,
        disabled: disabled || undefined,
        ...rest
    };

    const renderLinkWrappedChildren = (childElements: React.ReactNode[]): React.ReactNode => {
        // Ensure flattened is always an array
        const flattened = React.Children.toArray(cloneThroughFragments(childElements));
        return flattened.map((childElement) => {
            if (!React.isValidElement(childElement)) return null;

            // biome-ignore lint/suspicious/noExplicitAny: <any allowed>
            const element = childElement as ReactElement<any, any>;
            const isLink = element.type === RouterLink && typeof element.props === "object" && element.props !== null && "to" in element.props;

            if (!disabled && isLink) {
                return cloneElement(
                    element,
                    {
                        className,
                        key: `button-${element.key}`,
                        to: element.props.to
                    },
                    renderIcon(iconLeft),
                    <span className={contentClassName}>{element.props.children}</span>,
                    renderIcon(iconRight)
                );
            }

            return (
                <button type={type} {...commonProps} key={`button-${element.key}`} className={className}>
                    {renderIcon(iconLeft)}
                    <span className={contentClassName}>{content || (element.props ? element.props.children : null)}</span>
                    {renderIcon(iconRight)}
                </button>
            );
        });
    };

    if (inputType === "button") {
        return (
            <button type={type} {...commonProps} className={className}>
                {renderIcon(iconLeft)}
                <span className={contentClassName}>{content || children}</span>
                {renderIcon(iconRight)}
            </button>
        );
    }

    if (inputType === "radio") {
        return (
            <label className={className}>
                <input
                    {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
                    type="radio"
                    defaultChecked={defaultChecked}
                />
                {renderIcon(iconLeft)}
                <span className={contentClassName}>{content}</span>
                {renderIcon(iconRight)}
            </label>
        );
    }

    if (href?.length && !disabled) {
        // Only pass anchor-allowed props
        return (
            <a {...(commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} className={className}>
                {renderIcon(iconLeft)}
                <span className={contentClassName}>{content || children}</span>
                {renderIcon(iconRight)}
            </a>
        );
    }

    const isLinkWrapped = React.isValidElement(children) && children.type === RouterLink;

    if (isLinkWrapped) {
        return <Fragment>{renderLinkWrappedChildren(Children.toArray(children))}</Fragment>;
    }

    return (
        <button type={type} {...commonProps} className={className}>
            {renderIcon(iconLeft)}
            <span className={contentClassName}>{content || children}</span>
            {renderIcon(iconRight)}
        </button>
    );
};

export default Button;
