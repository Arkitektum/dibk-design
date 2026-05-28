// Dependencies
import type { JSX } from "react";
import React from "react";

// Stylesheets
import style from "./ToggleNavigationButton.module.scss";

export interface ToggleNavigationButtonProps {
    id?: string;
    htmlTag?: keyof JSX.IntrinsicElements;
    showText: string;
    hideText: string;
    buttonProps?: React.HTMLAttributes<HTMLElement>;
    isOpen?: boolean;
}

const ToggleNavigationButton = ({ id, htmlTag = "button", showText, hideText, buttonProps = {}, isOpen = false }: ToggleNavigationButtonProps) => {
    return React.createElement(
        htmlTag,
        {
            ...buttonProps,
            className: style.toggleNavigationButton,
            id: id || undefined
        },
        isOpen ? hideText : showText
    );
};

export default ToggleNavigationButton;
