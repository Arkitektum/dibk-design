// Dependencies
import type React from "react";

// Components
import { errorIcon, infoIcon, successIcon, warningIcon } from "../icons";
import Header from "./Header";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./InfoBox.module.scss";

export type InfoBoxVariant = "secondary" | "warning" | "error" | "info" | "success";

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
    variant = "secondary",
    fullScreen = false,
    noBorder = false,
    noAnimation = false,
    hideIcon = false,
    icon
}: InfoBoxProps) => {
    const defaultIcons: Record<InfoBoxVariant, string> = {
        secondary: infoIcon,
        warning: warningIcon,
        error: errorIcon,
        info: infoIcon,
        success: successIcon
    };

    const iconNode = icon ?? <img src={defaultIcons[variant]} alt="" className={style.iconImage} />;
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
