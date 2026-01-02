import React, {
  Children,
  cloneElement,
  Fragment,
  type ReactElement,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  classNameArrayToClassNameString,
  cloneThroughFragments,
} from "../functions/helpers";

import style from "./Button.module.scss";

type ArrowDirection = "none" | "left" | "right";
type ButtonSize = "small" | "regular";
export type ButtonColor = "primary" | "secondary" | "neutral";
export type InputType = "button" | "radio";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
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
  rounded?: boolean;
  href?: string;
  noMargin?: boolean;
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <any allowed>
  [key: string]: any;
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
  rounded = false,
  noMargin = false,
  href,
  children,
  iconLeft,
  iconRight,
  className: classNameProp,
  ...rest
}: ButtonProps) => {
  const renderIcon = (icon: React.ReactNode) =>
    icon ? <span className={style.buttonIcon}>{icon}</span> : null;
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

  const buttonColor =
    inputType === "radio" ? (defaultChecked ? "primary" : "secondary") : color;

  const className = classNameArrayToClassNameString([
    style.button,
    style[buttonColor],
    style[size],
    getArrowClass(arrow),
    noHover || inputType === "radio" ? style.noHover : null,
    rounded && style.rounded,
    hasErrors && style.hasErrors,
    disabled ? style.disabled : null,
    noMargin ? style.noMargin : null,
    iconLeft || iconRight ? style.hasIcon : null,
    classNameProp,
  ]);

  const buttonProps = {
    "aria-invalid": hasErrors || undefined,
    href: !disabled && href?.length ? href : undefined,
    className, // Always include className in buttonProps for all elements
    ...rest,
  };

  const renderLinkWrappedChildren = (
    childElements: React.ReactNode[],
  ): React.ReactNode => {
    // Ensure flattened is always an array
    const flattened = React.Children.toArray(
      cloneThroughFragments(childElements),
    );
    return flattened.map((childElement) => {
      if (!React.isValidElement(childElement)) return null;

      // biome-ignore lint/suspicious/noExplicitAny: <any allowed>
      const element = childElement as ReactElement<any, any>;
      const isLink =
        element.type === RouterLink &&
        typeof element.props === "object" &&
        element.props !== null &&
        "to" in element.props;

      if (!disabled && isLink) {
        return cloneElement(
          element,
          {
            className,
            key: `button-${element.key}`,
            to: element.props.to,
          },
          renderIcon(iconLeft),
          <span className={style.buttonContent}>{element.props.children}</span>,
          renderIcon(iconRight),
        );
      }

      return (
        <button {...buttonProps} key={`button-${element.key}`}>
          {renderIcon(iconLeft)}
          <span className={style.buttonContent}>
            {content || (element.props ? element.props.children : null)}
          </span>
          {renderIcon(iconRight)}
        </button>
      );
    });
  };

  if (inputType === "button") {
    // Only pass input-allowed props
    const inputProps = { ...buttonProps };
    delete inputProps.href;
    return (
      <button type="button" {...buttonProps}>
        {renderIcon(iconLeft)}
        <span className={style.buttonContent}>{content || children}</span>
        {renderIcon(iconRight)}
      </button>
    );
  }

  if (inputType === "radio") {
    const inputProps = { ...buttonProps };
    delete inputProps.href;
    return (
      <label className={className}>
        <input
          {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          type="radio"
        />
        {renderIcon(iconLeft)}
        <span className={style.buttonContent}>{content}</span>
        {renderIcon(iconRight)}
      </label>
    );
  }

  if (href?.length && !disabled) {
    // Only pass anchor-allowed props
    const anchorProps = { ...buttonProps };
    // Remove 'type' if present
    if ("type" in anchorProps) delete anchorProps.type;
    return (
      <a {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {renderIcon(iconLeft)}
        <span className={style.buttonContent}>{content || children}</span>
        {renderIcon(iconRight)}
      </a>
    );
  }

  const isLinkWrapped =
    React.isValidElement(children) && children.type === RouterLink;

  if (isLinkWrapped) {
    return (
      <Fragment>
        {renderLinkWrappedChildren(Children.toArray(children))}
      </Fragment>
    );
  }

  return (
    <button {...buttonProps}>
      {renderIcon(iconLeft)}
      <span className={style.buttonContent}>{content || children}</span>
      {renderIcon(iconRight)}
    </button>
  );
};

export default Button;
