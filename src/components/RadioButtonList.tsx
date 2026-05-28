// Dependencies
import { Children, type ReactNode, cloneElement, isValidElement } from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import Header from "./Header";

// Helpers
import { cloneThroughFragments } from "../functions/helpers";

// Stylesheets
import style from "./RadioButtonList.module.scss";

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
    const renderChildElements = (childElements: ReactNode[]) => {
        const flattened = cloneThroughFragments(childElements);
        return flattened.map((child) => {
            if (
                isValidElement<{ requiredGroup: boolean; compact?: boolean }>(child) &&
                (child.type as { displayName?: string | undefined })?.displayName === "RadioButtonListItem"
            ) {
                return cloneElement(child, {
                    requiredGroup: required,
                    compact,
                    key: `radioButtonListItem-${child.key}`
                });
            }
            return child;
        });
    };

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
            {renderChildElements(Children.toArray(children))}
        </fieldset>
    );
};

export default RadioButtonList;
