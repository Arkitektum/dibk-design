// Dependencies
import { type ReactNode, createContext, useContext } from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import Header from "./Header";

// Stylesheets
import style from "./CheckBoxList.module.scss";

interface CheckBoxListContextValue {
    compact?: boolean;
}

// Context rather than cloning the children: cloneElement only ever reached
// direct children, so items wrapped in a component or a fragment were skipped.
//
// `required` is deliberately absent. CheckBoxInput resolves `required ||
// requiredGroup` into the HTML `required` attribute, so handing it down here
// would demand that *every* box in the group be checked — wrong for the
// multi-select groups this component exists for. "At least one checked" cannot
// be expressed with the required attribute and needs custom validation in
// CheckBoxInput instead.
const CheckBoxListContext = createContext<CheckBoxListContextValue>({});

export const useCheckBoxList = () => useContext(CheckBoxListContext);

export interface CheckBoxListProps {
    legend?: string;
    legendSize?: 1 | 2 | 3 | 4 | 5;
    required?: boolean;
    compact?: boolean;
    children?: ReactNode;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

const CheckBoxList = ({
    legend,
    legendSize,
    required = false,
    compact = false,
    children,
    requirementIndicatorMode,
    optionalLabel
}: CheckBoxListProps) => {
    return (
        <fieldset className={style.checkBoxList}>
            {!!legend?.length && (
                <legend>
                    {legendSize ? <Header size={legendSize}>{legend}</Header> : legend}
                    <FieldRequirementIndicator
                        required={required}
                        mode={requirementIndicatorMode}
                        optionalLabel={optionalLabel}
                        requiredClassName={style.requiredSymbol}
                    />
                </legend>
            )}
            <CheckBoxListContext.Provider value={{ compact }}>{children}</CheckBoxListContext.Provider>
        </fieldset>
    );
};

export default CheckBoxList;
