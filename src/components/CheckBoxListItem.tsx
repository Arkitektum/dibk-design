// Dependencies
import type React from "react";

// Components
import CheckBoxInput from "./CheckBoxInput";
import { useCheckBoxList } from "./CheckBoxList";

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
    /** Renders the item as static text, with no form control in the DOM. */
    contentOnly?: boolean;
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
    contentOnly = false,
    compact,
    hasErrors = false,
    checkmarkCharacter = "✔",
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    children,
    value
}: CheckBoxListItemProps) => {
    const { compact: compactFromList } = useCheckBoxList();

    // Left undefined rather than defaulted to false, so `compact={false}` on an
    // item inside a compact list can still opt out.
    const isCompact = compact ?? compactFromList;

    const className = classNameArrayToClassNameString([
        style.checkBoxListItem,
        contentOnly && style.contentOnly,
        checked && style.checked,
        disabled && style.disabled,
        isCompact && style.compact,
        hasErrors && style.hasErrors
    ]);

    const inputProps = {
        // Passed through rather than defaulted to a no-op: a no-op handler hides
        // from React and assistive tech that the control cannot be changed.
        onChange,
        checked,
        disabled,
        required,
        requiredGroup,
        contentOnly,
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
