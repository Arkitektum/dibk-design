// Dependencies
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Accordion.module.scss";

type AccordionColor = "primary" | "neutral" | "secondary" | "info" | "success";
type AccordionColorValue = AccordionColor | (string & {});

const namedColors: AccordionColor[] = ["primary", "neutral", "secondary", "info", "success"];
const isNamedColor = (value: string): value is AccordionColor => namedColors.includes(value as AccordionColor);

const bodyColorClass: Record<AccordionColor, string> = {
    primary: style.bodyPrimary,
    neutral: style.bodyNeutral,
    secondary: style.bodySecondary,
    info: style.bodyInfo,
    success: style.bodySuccess
};

// `color` and `title` are re-typed, so the DOM versions are omitted rather than
// merged. Remaining div attributes pass through to the outer element.
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "title"> {
    title?: ReactNode;
    color?: AccordionColorValue;
    bodyColor?: AccordionColorValue;
    expanded?: boolean;
    onToggleExpand?: () => void;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    noMargin?: boolean;
    initialized?: boolean;
    children?: ReactNode;
    [dataAttribute: `data-${string}`]: unknown;
}

const RenderPanel = ({
    title,
    buttonProps,
    expanded,
    handleToggleExpand
}: {
    title: ReactNode;
    buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
    expanded: boolean;
    handleToggleExpand: () => void;
}) => {
    return (
        // `type` before the spread, so a consumer can still opt into submit,
        // but the default is not the HTML one — an untyped <button> is a submit
        // button, and toggling an accordion inside a form submitted it.
        <button type="button" {...buttonProps} className={style.panel} onClick={handleToggleExpand} aria-expanded={expanded ? "true" : "false"}>
            <span className={style.panelText}>{title}</span>
            <span className={`${style.panelChevron} ${expanded ? style.expanded : ""}`}></span>
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
    // Destructured out of `rest`: it is merged into the computed class list
    // below, and leaving it in would let the spread overwrite that.
    className: classNameProp,
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
    const className = classNameArrayToClassNameString([style.accordion, colorIsNamed && style[color], !noMargin && style.margin, classNameProp]);

    const accordionStyle: CSSProperties | undefined = colorIsNamed ? undefined : { backgroundColor: color };

    const resolvedBodyColor = bodyColor ?? color;
    const bodyColorIsNamed = isNamedColor(resolvedBodyColor);
    const bodyIsSameAsTitle = !bodyColor || bodyColor === color;

    const contentClassName = classNameArrayToClassNameString([
        style.content,
        initialized ? style.initialized : "",
        expanded ? style.expanded : "",
        !bodyIsSameAsTitle && bodyColorIsNamed ? bodyColorClass[resolvedBodyColor as AccordionColor] : ""
    ]);

    const contentStyle: CSSProperties | undefined = !bodyIsSameAsTitle && !bodyColorIsNamed ? { backgroundColor: resolvedBodyColor } : undefined;

    return (
        <div className={className} style={accordionStyle} {...rest}>
            <RenderPanel title={title} buttonProps={buttonProps ?? {}} expanded={expanded ?? false} handleToggleExpand={handleToggleExpand} />
            <div className={contentClassName} style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
