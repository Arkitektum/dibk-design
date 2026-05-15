// Dependencies
import type React from "react";

// Components
import CheckBoxInput from "./CheckBoxInput";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./CheckBoxListItem.module.scss";

export interface CheckBoxListItemProps {
    value?: string | number;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    requiredGroup?: boolean;
    name?: string;
    id: string;
    onChange?: () => void;
    compact?: boolean;
    checkmarkCharacter?: string;
    hasErrors?: boolean;
    "aria-controls"?: string;
    "aria-describedby"?: string;
    children?: React.ReactNode;
}

const CheckBoxListItem = ({
    checked = false,
    disabled = false,
    required = false,
    requiredGroup = false,
    id,
    name = "",
    onChange,
    compact = false,
    hasErrors = false,
    checkmarkCharacter = "✔",
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    children,
    value
}: CheckBoxListItemProps) => {
    const className = classNameArrayToClassNameString([
        style.checkBoxListItem,
        checked && style.checked,
        disabled && style.disabled,
        compact && style.compact,
        hasErrors && style.hasErrors
    ]);

    const inputProps = {
        onChange: onChange ?? (() => {}),
        checked,
        disabled,
        required,
        requiredGroup,
        hasErrors,
        "aria-controls": ariaControls,
        "aria-describedby": ariaDescribedBy,
        id,
        name,
        checkmarkCharacter,
        value
    };

    return (
        <div className={className}>
            <CheckBoxInput {...inputProps}>{children}</CheckBoxInput>
        </div>
    );
};

export default CheckBoxListItem;
