// Dependencies
import type React from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import CheckBoxIcon from "./CheckBoxIcon";
import { checkmarkSymbolIcon } from "../icons";

// Stylesheets
import style from "./CheckBoxInput.module.scss";

export interface CheckBoxInputProps {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    requiredGroup?: boolean;
    id: string;
    name?: string;
    onChange?: () => void;
    hasErrors?: boolean;
    checkmarkCharacter?: string;
    "aria-controls"?: string;
    "aria-describedby"?: string;
    tabIndex?: number;
    children?: React.ReactNode;
    value?: string | number;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

const CheckBoxInput = ({
    checked = false,
    disabled = false,
    required = false,
    requiredGroup = false,
    id,
    name = "",
    onChange,
    hasErrors = false,
    checkmarkCharacter = "✔",
    tabIndex = 0,
    children,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    value,
    requirementIndicatorMode,
    optionalLabel
}: CheckBoxInputProps) => {
    const labelClassName = [style.checkBoxInput, disabled && style.disabled, hasErrors && style.hasErrors].filter(Boolean).join(" ");

    const iconProps = {
        checked,
        disabled,
        showBox: true,
        hasErrors,
        checkmarkCharacter,
        checkmarkIconSrc: checkmarkSymbolIcon
    };

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
        id,
        name,
        type: "checkbox",
        checked,
        disabled,
        required: required || requiredGroup,
        onChange,
        tabIndex,
        "aria-controls": ariaControls,
        "aria-invalid": hasErrors ? "true" : undefined,
        "aria-describedby": ariaDescribedBy,
        value
    };

    return (
        <label htmlFor={id} className={labelClassName}>
            <CheckBoxIcon {...iconProps} />
            <input {...inputProps} />
            <span className={style.labelText}>
                {children}
                <FieldRequirementIndicator
                    required={required}
                    mode={requirementIndicatorMode}
                    optionalLabel={optionalLabel}
                    requiredClassName={style.requiredSymbol}
                />
            </span>
        </label>
    );
};

export default CheckBoxInput;
