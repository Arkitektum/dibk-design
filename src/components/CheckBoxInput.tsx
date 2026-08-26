// Dependencies
import type React from "react";
import { useEffect, useRef } from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import CheckBoxIcon from "./CheckBoxIcon";
import { checkmarkSymbolIcon } from "../icons";

// Stylesheets
import style from "./CheckBoxInput.module.scss";

export interface CheckBoxInputProps {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    requiredGroup?: boolean;
    id: string;
    name?: string;
    onChange?: () => void;
    hasErrors?: boolean;
    checkmarkCharacter?: string;
    hideLabel?: boolean;
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
    indeterminate = false,
    disabled = false,
    required = false,
    requiredGroup = false,
    id,
    name = "",
    onChange,
    hasErrors = false,
    checkmarkCharacter = "✔",
    hideLabel = false,
    tabIndex = 0,
    children,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    value,
    requirementIndicatorMode,
    optionalLabel
}: CheckBoxInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const labelClassName = [style.checkBoxInput, disabled && style.disabled, hasErrors && style.hasErrors, hideLabel && style.hideLabel]
        .filter(Boolean)
        .join(" ");

    const iconProps = {
        checked,
        indeterminate,
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
        // A controlled `checked` with no handler is a read-only field; saying so
        // is what React asks for instead of warning.
        readOnly: onChange ? undefined : true,
        tabIndex,
        "aria-controls": ariaControls,
        "aria-invalid": hasErrors ? "true" : undefined,
        "aria-describedby": ariaDescribedBy,
        value
    };

    return (
        <label htmlFor={id} className={labelClassName}>
            <CheckBoxIcon {...iconProps} />
            <input {...inputProps} ref={inputRef} />
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
