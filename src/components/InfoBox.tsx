import type React from "react";
import errorIcon from "../assets/svg/error-icon.svg?url";
import infoIcon from "../assets/svg/info-icon.svg?url";
import successIcon from "../assets/svg/success-icon.svg?url";
import warningIcon from "../assets/svg/warning-icon.svg?url";
import { classNameArrayToClassNameString } from "../functions/helpers";
import Header from "./Header";
import style from "./InfoBox.module.scss";

export type InfoBoxVariant = "info" | "warning" | "error" | "tip" | "success";

export interface InfoBoxProps {
  title: string;
  children?: React.ReactNode;
  variant?: InfoBoxVariant;
  fullScreen?: boolean;

  noBorder?: boolean;
  hideIcon?: boolean;
  icon?: React.ReactNode;
}

const InfoBox = ({
  title,
  children = "",
  variant = "info",
  fullScreen = false,
  noBorder = false,
  hideIcon = false,
  icon,
}: InfoBoxProps) => {
  const defaultIcons: Record<InfoBoxVariant, string> = {
    info: infoIcon,
    warning: warningIcon,
    error: errorIcon,
    tip: infoIcon,
    success: successIcon,
  };

  const iconNode = icon ?? (
    <img src={defaultIcons[variant]} alt="" className={style.iconImage} />
  );
  const shouldRenderIcon = !hideIcon && iconNode;

  return (
    <div
      className={classNameArrayToClassNameString([
        style.box,
        style[variant],
        fullScreen && style.fullScreen,

        noBorder && style.noBorder,
        shouldRenderIcon ? style.hasIcon : null,
      ])}
    >
      <div className={style.inner}>
        {shouldRenderIcon ? <div className={style.icon}>{iconNode}</div> : null}
        <div className={style.content}>
          <Header size={3}>{title}</Header>

          {children ? <div className={style.body}>{children}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
