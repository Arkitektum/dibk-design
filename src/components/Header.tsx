import type { JSX } from "react";
import React from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./Header.module.scss";

export interface HeaderProps {
  id?: string;
  content?: string;
  size?: 1 | 2 | 3 | 4 | 5;
  htmlTag?: keyof JSX.IntrinsicElements;
  htmlFor?: string;
  children?: React.ReactNode;
}

const Header = ({
  id,
  content,
  size = 1,
  htmlTag,
  htmlFor,
  children,
}: HeaderProps) => {
  const tag = htmlTag || (`h${size}` as keyof JSX.IntrinsicElements);

  const className = classNameArrayToClassNameString([
    style.header,
    style[`size-${size}`],
  ]);

  const headerElement = React.createElement(
    tag,
    {
      className,
      id: id || undefined,
      htmlFor: htmlFor || undefined,
    },
    content?.length ? content : children,
  );

  return <div className={style.headerContainer}>{headerElement}</div>;
};

export default Header;
