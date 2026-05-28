// Dependencies
import type React from "react";

// Stylesheets
import style from "./Paper.module.scss";

export interface PaperProps {
    noMargin?: boolean;
    noPadding?: boolean;
    children?: React.ReactNode;
}

const Paper = ({ noMargin = false, noPadding = false, children }: PaperProps) => {
    const className = [style.paper, noMargin && style.noMargin, noPadding && style.noPadding].filter(Boolean).join(" ");

    return <div className={className}>{children}</div>;
};

export default Paper;
