// Dependencies
import type { ReactNode } from "react";

// Components
import RadioButtonInput from "./RadioButtonInput";
import { useRadioButtonList } from "./RadioButtonList";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./RadioButtonListItem.module.scss";

interface RadioButtonListItemPropsBase {
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
    hasErrors?: boolean;
    "aria-controls"?: string;
    "aria-describedby"?: string;
    children?: ReactNode;
}

export interface RadioButtonListItemProps extends RadioButtonListItemPropsBase {
    /** The value written to the input's `value` attribute. */
    value: string | number;
}

const RadioButtonListItem = ({
    value,
    checked = false,
    disabled = false,
    required = false,
    requiredGroup,
    name = "",
    id,
    onChange,
    contentOnly = false,
    compact,
    hasErrors = false,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    children
}: RadioButtonListItemProps) => {
    const { compact: compactFromList, requiredGroup: requiredGroupFromList } = useRadioButtonList();

    // Left undefined rather than defaulted to false, so `compact={false}` on an
    // item inside a compact list can still opt out.
    const isCompact = compact ?? compactFromList;
    const isRequiredGroup = requiredGroup ?? requiredGroupFromList;

    const className = classNameArrayToClassNameString([
        style.radioButtonListItem,
        contentOnly && style.contentOnly,
        checked && style.checked,
        disabled && style.disabled,
        isCompact && style.compact,
        hasErrors && style.hasErrors
    ]);

    const inputProps = {
        onChange,
        value,
        checked,
        disabled,
        required,
        requiredGroup: isRequiredGroup,
        contentOnly,
        hasErrors,
        "aria-controls": ariaControls,
        "aria-describedby": ariaDescribedBy,
        id,
        name
    };

    return (
        <div className={className}>
            <RadioButtonInput {...inputProps}>{children}</RadioButtonInput>
        </div>
    );
};

export default RadioButtonListItem;
