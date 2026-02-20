import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cloneThroughFragments } from "../functions/helpers";
import FieldRequirementIndicator, {
  type RequirementIndicatorMode,
} from "./FieldRequirementIndicator";
import style from "./CheckBoxList.module.scss";
import Header from "./Header";

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
  optionalLabel,
}: CheckBoxListProps) => {
  const renderChildElements = (childElements: ReactNode[]) => {
    const flattenedChildren = cloneThroughFragments(childElements);

    return flattenedChildren.map((childElement) => {
      if (
        isValidElement<{ requiredGroup: boolean; compact: boolean }>(
          childElement,
        ) &&
        (childElement.type as { displayName?: string | undefined })
          ?.displayName === "RadioButtonListItem"
      ) {
        return cloneElement(childElement, {
          requiredGroup: required,
          compact,
          key: `checkboxListItem-${childElement.key}`,
        });
      }
      return childElement;
    });
  };

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
      {renderChildElements(Children.toArray(children))}
    </fieldset>
  );
};

export default CheckBoxList;
