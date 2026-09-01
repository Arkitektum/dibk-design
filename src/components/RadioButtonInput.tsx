// Dependencies
import type React from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import RadioButtonIcon from "./RadioButtonIcon";

// Stylesheets
import style from "./RadioButtonInput.module.scss";

interface RadioButtonInputPropsBase {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    requiredGroup?: boolean;
    id: string;
    name?: string;
    onChange?: () => void;
    /**
     * Renders the label as static text, with no radio, nothing focusable and no
     * form control in the DOM — for read-only and view modes, where `disabled`
     * would wrongly imply "temporarily unavailable".
     *
     * Unlike `CheckBoxInput`, no indicator is drawn. A radio group has one
     * answer, so a read-only view renders only the selected option and a dot
     * beside the single visible label would be noise. A read-only checkbox list
     * renders every option and does need to mark which are ticked.
     */
    contentOnly?: boolean;
    hasErrors?: boolean;
    hideLabel?: boolean;
    tabIndex?: number;
    children?: React.ReactNode;
    "aria-controls"?: string;
    "aria-describedby"?: string;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

export interface RadioButtonInputProps extends RadioButtonInputPropsBase {
    /** The value written to the input's `value` attribute. */
    value: string | number;
}

const RadioButtonInput = ({
    checked = false,
    disabled = false,
    required = false,
    requiredGroup = false,
    id,
    name = "",
    onChange,
    contentOnly = false,
    hasErrors = false,
    value,
    hideLabel = false,
    tabIndex,
    children,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    requirementIndicatorMode,
    optionalLabel
}: RadioButtonInputProps) => {
    const labelClassName = [
        style.radioButtonInput,
        contentOnly && style.contentOnly,
        checked && style.checked,
        disabled && style.disabled,
        hasErrors && style.hasErrors,
        hideLabel && style.hideLabel
    ]
        .filter(Boolean)
        .join(" ");

    const iconProps = {
        checked,
        disabled,
        hasErrors
    };

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
        id,
        name,
        type: "radio",
        value,
        checked,
        disabled,
        required: required || requiredGroup,
        onChange,
        // A controlled `checked` with no handler is a read-only field; saying so
        // is what React asks for instead of warning.
        readOnly: onChange ? undefined : true,
        tabIndex: tabIndex ?? undefined,
        "aria-controls": ariaControls,
        "aria-invalid": hasErrors ? "true" : undefined,
        "aria-describedby": ariaDescribedBy
    };

    return (
        <label htmlFor={id} className={labelClassName}>
            {contentOnly ? null : (
                <>
                    <RadioButtonIcon {...iconProps} />
                    <input {...inputProps} />
                </>
            )}
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

export default RadioButtonInput;
