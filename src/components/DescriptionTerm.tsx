// Dependencies
import type React from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./DescriptionTerm.module.scss";

export interface DescriptionTermProps {
    compact?: boolean;
    titleWidth?: string;
    children?: React.ReactNode;
}

const DescriptionTerm = ({ compact = false, titleWidth, children }: DescriptionTermProps) => {
    return (
        <dt
            className={classNameArrayToClassNameString([style.descriptionTerm, compact && style.compact])}
            style={{ "--title-width": titleWidth || undefined } as React.CSSProperties}
        >
            {children}
        </dt>
    );
};

export default DescriptionTerm;
