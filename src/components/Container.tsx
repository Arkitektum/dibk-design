// Container.tsx

import type React from "react";
import style from "./Container.module.scss";

export type ContainerSize = "normal" | "small";

export interface ContainerProps {
  size?: ContainerSize;
  maxWidth?: string;
  children?: React.ReactNode;
}

const SIZE_TO_MAX_WIDTH: Record<ContainerSize, string> = {
  normal: "1310px",
  small: "840px",
};

const Container = ({ size, maxWidth, children }: ContainerProps) => {
  const resolvedMaxWidth = maxWidth?.length
    ? maxWidth
    : size
      ? SIZE_TO_MAX_WIDTH[size]
      : undefined;

  const styleProps: React.CSSProperties = {
    "--max-width": resolvedMaxWidth,
  } as React.CSSProperties;

  return (
    <div className={style.container} style={styleProps}>
      {children}
    </div>
  );
};

export default Container;
