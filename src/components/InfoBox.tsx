// Dependencies
import type React from "react";

// Components
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import Header from "./Header";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./InfoBox.module.scss";

export type InfoBoxVariant = "default" | "secondary" | "warning" | "error" | "info" | "success";

// The components rather than the `?url` exports: every one of these icons is
// drawn with fill="currentColor", and an <img> loads the file as its own
// document, where `currentColor` cannot see the colour of the box around it.
const defaultIcons: Record<InfoBoxVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    default: InfoIcon,
    secondary: InfoIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    success: SuccessIcon
};

export interface InfoBoxProps {
    title: React.ReactNode | string;
    children?: React.ReactNode;
    variant?: InfoBoxVariant;
    fullScreen?: boolean;

    noBorder?: boolean;
    noAnimation?: boolean;
    hideIcon?: boolean;
    icon?: React.ReactNode;
}

const InfoBox = ({
    title,
    children = "",
    variant = "default",
    fullScreen = false,
    noBorder = false,
    noAnimation = false,
    hideIcon = false,
    icon
}: InfoBoxProps) => {
    const DefaultIcon = defaultIcons[variant];

    const iconNode = icon ?? <DefaultIcon aria-hidden="true" className={style.iconImage} />;
    const shouldRenderIcon = !hideIcon && iconNode;

    return (
        <div
            className={classNameArrayToClassNameString([
                style.box,
                style[variant],
                fullScreen && style.fullScreen,
                noBorder && style.noBorder,
                noAnimation && style.noAnimation,
                shouldRenderIcon ? style.hasIcon : null
            ])}
        >
            <div className={style.inner}>
                {shouldRenderIcon ? <div className={style.icon}>{iconNode}</div> : null}
                <div className={style.content}>
                    {typeof title === "string" ? <Header size={3}>{title}</Header> : title}

                    {children ? <div className={style.body}>{children}</div> : null}
                </div>
            </div>
        </div>
    );
};

export default InfoBox;
