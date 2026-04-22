import type React from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import style from "./Badge.module.scss";

export type BadgeVariant = "success" | "warning" | "error" | "secondary" | "neutral" | "purple";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge = ({ children, variant = "neutral", className }: BadgeProps) => (
  <span
    className={classNameArrayToClassNameString([style.badge, style[variant], className ?? null])}
  >
    {children}
  </span>
);

export default Badge;
