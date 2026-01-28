import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Accordion.module.scss";

type AccordionColor = "primary" | "neutral" | "secondary" | "info";

export interface AccordionProps {
  title?: ReactNode;
  color?: AccordionColor;
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

  const className = classNameArrayToClassNameString([
    style.accordion,
    color && style[color],
    !noMargin && style.margin,
    rest.className,
  ]);
  return (
    <div className={className} {...rest}>
      <RenderPanel
        title={title}
        buttonProps={buttonProps ?? {}}
        expanded={expanded ?? false}
        handleToggleExpand={handleToggleExpand}
      />
      <div
        className={`${style.content} ${initialized ? style.initialized : ""} ${
          expanded ? style.expanded : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
