import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { asteriskIcon } from "../icons";
import { cloneThroughFragments } from "../functions/helpers";
import style from "./CheckBoxList.module.scss";
import Header from "./Header";

export interface CheckBoxListProps {
  legend?: string;
  legendSize?: 1 | 2 | 3 | 4 | 5;
  required?: boolean;
  compact?: boolean;
  children?: ReactNode;
}

const CheckBoxList = ({
  legend,
  legendSize,
  required = false,
  compact = false,
  children,
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
          {required && (
          <img src={asteriskIcon} alt="" className={style.requiredSymbol} />
          )}
        </legend>
      )}
      {renderChildElements(Children.toArray(children))}
    </fieldset>
  );
};

export default CheckBoxList;
