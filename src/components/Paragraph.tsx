import type { JSX } from "react";
import React from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./Paragraph.module.scss";

export type ParagraphVariant = "lead" | "large" | "small";

export interface ParagraphProps {
  id?: string;
  htmlTag?: keyof JSX.IntrinsicElements;
  variant?: ParagraphVariant;
  noMargin?: boolean;
  children?: React.ReactNode;
}

const Paragraph = ({
  id,
  htmlTag = "p",
  variant = "small",
  noMargin = false,
  children,
}: ParagraphProps) => {
  const classNames = classNameArrayToClassNameString([
    style.paragraph,
    style[variant],
    noMargin && style.noMargin,
  ]);

  return React.createElement(
    htmlTag,
    {
      className: classNames,
      id: id || undefined,
    },
    children,
  );
};

export default Paragraph;
