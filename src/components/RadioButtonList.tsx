// Dependencies
import { type ReactNode, createContext, useContext } from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import Header from "./Header";

// Stylesheets
import style from "./RadioButtonList.module.scss";

interface RadioButtonListContextValue {
    compact?: boolean;
    requiredGroup?: boolean;
}

// Context rather than cloning the children: cloneElement only ever reached
// direct children, so items wrapped in a component or a fragment were skipped.
//
// Unlike CheckBoxList, `requiredGroup` is safe to hand down here: the HTML
// required attribute on every input of a same-named radio group is satisfied by
// checking any one of them.
const RadioButtonListContext = createContext<RadioButtonListContextValue>({});

export const useRadioButtonList = () => useContext(RadioButtonListContext);

export interface RadioButtonListProps {
    legend?: string;
    legendSize?: 1 | 2 | 3 | 4 | 5;
    required?: boolean;
    compact?: boolean;
    children?: ReactNode;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

const RadioButtonList = ({
    legend,
    legendSize,
    required = false,
    compact = false,
    children,
    requirementIndicatorMode,
    optionalLabel
}: RadioButtonListProps) => {
    return (
        <fieldset className={style.radioButtonList}>
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
            <RadioButtonListContext.Provider value={{ compact, requiredGroup: required }}>{children}</RadioButtonListContext.Provider>
        </fieldset>
    );
};

export default RadioButtonList;
