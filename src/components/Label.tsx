// Label.tsx

import type { JSX } from "react";
import React from "react";
import style from "./Label.module.scss";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  inline?: boolean;
  normalCursor?: boolean;
  htmlTag?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  subLabel?: React.ReactNode;
}

const Label = ({
  inline = false,
  normalCursor = false,
  htmlTag = "label",
  children,
  subLabel,
  id,
  ...rest
}: LabelProps) => {
  const className = [
    style.label,
    inline && style.inline,
    normalCursor && style.normalCursor,
  ]
    .filter(Boolean)
    .join(" ");

  const tagProps = {
    ...rest,
    className,
    id: id || undefined,
  };

  return React.createElement(
    htmlTag,
    tagProps,
    <>
      <span className={style.labelText}>{children}</span>
      {subLabel && <span className={style.subLabel}>{subLabel}</span>}
    </>,
  );
};

export default Label;
