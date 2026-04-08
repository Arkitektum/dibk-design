import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Accordion.module.scss";

type AccordionColor = "primary" | "neutral" | "secondary" | "info";
type AccordionColorValue = AccordionColor | string;

const namedColors: AccordionColor[] = ["primary", "neutral", "secondary", "info"];
const isNamedColor = (value: string): value is AccordionColor =>
  namedColors.includes(value as AccordionColor);

const bodyColorClass: Record<AccordionColor, string> = {
  primary: style.bodyPrimary,
  neutral: style.bodyNeutral,
  secondary: style.bodySecondary,
  info: style.bodyInfo,
};

export interface AccordionProps {
  title?: ReactNode;
  color?: AccordionColorValue;
  bodyColor?: AccordionColorValue;
  expanded?: boolean;
  onToggleExpand?: () => void;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  noMargin?: boolean;
  initialized?: boolean;
  children?: ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <any allowed>
  [key: string]: any;
}

const RenderPanel = ({
  title,
  buttonProps,
  expanded,
  handleToggleExpand,
}: {
  title: ReactNode;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  expanded: boolean;
  handleToggleExpand: () => void;
}) => {
  return (
    <button
      {...buttonProps}
      className={style.panel}
      onClick={handleToggleExpand}
      aria-expanded={expanded ? "true" : "false"}
    >
      <span className={style.panelText}>{title}</span>
      <span
        className={`${style.panelChevron} ${expanded ? style.expanded : ""}`}
      ></span>
    </button>
  );
};

const Accordion = ({
  title,
  color = "primary",
  bodyColor,
  expanded: expandedProp = false,
  onToggleExpand,
  buttonProps,
  noMargin = false,
  initialized: initializedProp,
  children,
  ...rest
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(expandedProp);
  const [initialized, setInitialized] = useState(initializedProp);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
    setInitialized(true);
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  useEffect(() => {
    setExpanded(expandedProp);
  }, [expandedProp]);

  const colorIsNamed = isNamedColor(color);
  const className = classNameArrayToClassNameString([
    style.accordion,
    colorIsNamed && style[color],
    !noMargin && style.margin,
    rest.className,
  ]);

  const accordionStyle: CSSProperties | undefined = colorIsNamed
    ? undefined
    : { backgroundColor: color };

  const resolvedBodyColor = bodyColor ?? color;
  const bodyColorIsNamed = isNamedColor(resolvedBodyColor);
  const bodyIsSameAsTitle = !bodyColor || bodyColor === color;

  const contentClassName = classNameArrayToClassNameString([
    style.content,
    initialized ? style.initialized : "",
    expanded ? style.expanded : "",
    !bodyIsSameAsTitle && bodyColorIsNamed ? bodyColorClass[resolvedBodyColor as AccordionColor] : "",
  ]);

  const contentStyle: CSSProperties | undefined =
    !bodyIsSameAsTitle && !bodyColorIsNamed
      ? { backgroundColor: resolvedBodyColor }
      : undefined;

  return (
    <div className={className} style={accordionStyle} {...rest}>
      <RenderPanel
        title={title}
        buttonProps={buttonProps ?? {}}
        expanded={expanded ?? false}
        handleToggleExpand={handleToggleExpand}
      />
      <div className={contentClassName} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
