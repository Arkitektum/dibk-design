import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { asteriskIcon } from "../icons";
import { cloneThroughFragments } from "../functions/helpers";
import Header from "./Header";
import style from "./RadioButtonList.module.scss";

export interface RadioButtonListProps {
  legend?: string;
  legendSize?: 1 | 2 | 3 | 4 | 5;
  required?: boolean;
  compact?: boolean;
  children?: ReactNode;
}

const RadioButtonList = ({
  legend,
  legendSize,
  required = false,
  compact = false,
  children,
}: RadioButtonListProps) => {
  const renderChildElements = (childElements: ReactNode[]) => {
    const flattened = cloneThroughFragments(childElements);
    return flattened.map((child) => {
      if (
        isValidElement<{ requiredGroup: boolean; compact?: boolean }>(child) &&
        (child.type as { displayName?: string | undefined })?.displayName ===
          "RadioButtonListItem"
      ) {
        return cloneElement(child, {
          requiredGroup: required,
          compact,
          key: `radioButtonListItem-${child.key}`,
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
          {required && (
          <img src={asteriskIcon} alt="" className={style.requiredSymbol} />
          )}
        </legend>
      )}
      {renderChildElements(Children.toArray(children))}
    </fieldset>
  );
};

export default RadioButtonList;
