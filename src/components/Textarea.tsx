// Dependencies
import type React from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

// Stylesheets
import style from "./Textarea.module.scss";

export interface TextareaProps {
    id: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    name?: string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    width?: string;
    resize?: "both" | "horizontal" | "vertical" | "none";
    value?: string;
    defaultValue?: string;
    elementKey?: string;
    rows?: string;
    label?: React.ReactNode;
    /**
     * Renders the current value as static text instead of a form control: the
     * label, then a plain `<span>`. No textarea, not focusable, and no form
     * control in the DOM — for read-only and view modes, where `disabled` would
     * wrongly imply "temporarily unavailable".
     */
    contentOnly?: boolean;
    /** `contentOnly` only. Text shown when there is no value. */
    defaultContent?: string;
    placeholder?: string;
    "aria-describedby"?: string;
    hasErrors?: boolean;
    errorMessage?: React.ReactNode;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

const Textarea = ({
    id,
    onChange,
    onBlur,
    name = "",
    required = false,
    readOnly,
    disabled,
    width,
    resize = "both",
    value,
    defaultValue,
    elementKey,
    rows,
    label = "",
    contentOnly = false,
    defaultContent = "",
    placeholder = "",
    "aria-describedby": ariaDescribedBy,
    hasErrors = false,
    errorMessage = "",
    requirementIndicatorMode,
    optionalLabel
}: TextareaProps) => {
    const getErrorElementId = () => `${id}-errorMessage`;

    // `value` wins whenever it is provided — falling back to `defaultValue` when
    // it happens to be empty would turn a controlled textarea into an
    // uncontrolled one and repopulate it the moment the user clears it.
    const valueProps = value !== undefined ? { value } : defaultValue !== undefined ? { defaultValue } : {};

    const styleRules: React.CSSProperties = {
        ...(width && { maxWidth: width }),
        ...(resize && { resize })
    };

    const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
        name,
        readOnly,
        disabled,
        id,
        onChange,
        onBlur,
        ...valueProps,
        placeholder,
        rows: rows ? parseInt(rows, 10) : undefined,
        className: hasErrors ? style.hasErrors : "",
        "aria-describedby": hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy,
        "aria-invalid": hasErrors ? "true" : undefined,
        "aria-required": required ? "true" : undefined,
        style: styleRules
    };

    const labelElement = (
        <Label htmlFor={id}>
            {label}
            <FieldRequirementIndicator
                required={required}
                mode={requirementIndicatorMode}
                optionalLabel={optionalLabel}
                requiredClassName={style.requiredSymbol}
            />
        </Label>
    );

    // No textarea and nothing focusable: `contentOnly` is a display mode, so the
    // control is left out of the DOM rather than disabled.
    if (contentOnly) {
        const currentValue = value ?? defaultValue;

        return (
            <div className={style.textarea}>
                {labelElement}
                <span className={style.contentOnly}>{currentValue === undefined || currentValue === "" ? defaultContent : currentValue}</span>
                <ErrorMessage id={getErrorElementId()} content={errorMessage} />
            </div>
        );
    }

    return (
        <div className={style.textarea}>
            {labelElement}
            <textarea key={elementKey || id} {...textareaProps} />
            <ErrorMessage id={getErrorElementId()} content={errorMessage} />
        </div>
    );
};

export default Textarea;
