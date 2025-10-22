// DescriptionDetails.tsx

import type React from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./DescriptionDetails.module.scss";

export interface DescriptionDetailsProps {
  compact?: boolean;
  titleWidth?: string;
  children?: React.ReactNode;
}

const DescriptionDetails = ({
  compact = false,
  titleWidth,
  children,
}: DescriptionDetailsProps) => {
  return (
    <dd
      className={classNameArrayToClassNameString([
        style.descriptionDetails,
        compact && style.compact,
      ])}
      style={
        { "--title-width": titleWidth || undefined } as React.CSSProperties
      }
    >
      {children}
    </dd>
  );
};

export default DescriptionDetails;
