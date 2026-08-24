// Dependencies
import type React from "react";

// Stylesheets
import style from "./CheckBoxIcon.module.scss";

export interface CheckBoxIconProps {
    size?: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    showBox?: boolean;
    hasErrors?: boolean;
    checkmarkCharacter?: string;
    checkmarkIconSrc?: string;
}

const CheckBoxIcon = ({
    size = "20px",
    checked = false,
    indeterminate = false,
    disabled = false,
    showBox = true,
    hasErrors = false,
    checkmarkCharacter = "✔",
    checkmarkIconSrc
}: CheckBoxIconProps) => {
    const inlineStyle: React.CSSProperties = {
        height: size,
        width: size,
        minWidth: size,
        fontSize: size
    };

    const className = [
        style.checkBoxIcon,
        checked && style.checked,
        indeterminate && style.indeterminate,
        disabled && style.disabled,
        showBox && style.showBox,
        hasErrors && style.hasErrors
    ]
        .filter(Boolean)
        .join(" ");

    const renderMark = () => {
        if (indeterminate) {
            return <span className={style.indeterminateMark} />;
        }
        if (!checked) {
            return "";
        }
        return checkmarkIconSrc ? <img src={checkmarkIconSrc} alt="" aria-hidden="true" className={style.checkmarkIcon} /> : checkmarkCharacter;
    };

    return (
        <span className={className} style={inlineStyle}>
            <span aria-hidden className={style.checkmark}>
                {renderMark()}
            </span>
        </span>
    );
};

export default CheckBoxIcon;
