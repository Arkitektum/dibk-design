// Dependencies
import type React from "react";

// Stylesheets
import style from "./RadioButtonIcon.module.scss";

export interface RadioButtonIconProps {
    size?: string;
    checked?: boolean;
    disabled?: boolean;
    hasErrors?: boolean;
}

const RadioButtonIcon = ({ size = "10px", checked = false, disabled = false, hasErrors = false }: RadioButtonIconProps) => {
    const inlineStyle: React.CSSProperties = {
        height: size,
        width: size
    };

    const className = [style.radioButtonIcon, checked && style.checked, disabled && style.disabled, hasErrors && style.hasErrors]
        .filter(Boolean)
        .join(" ");

    return <span className={className} style={inlineStyle}></span>;
};

export default RadioButtonIcon;
