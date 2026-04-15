import type React from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./Badge.module.scss";

export type BadgeVariant = "success" | "warning" | "error" | "secondary" | "neutral";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge = ({ children, variant = "neutral" }: BadgeProps) => (
  <span
    className={classNameArrayToClassNameString([style.badge, style[variant]])}
  >
    {children}
  </span>
);

export default Badge;
