// Dependencies
import type React from "react";

// Components
import { useDescriptionList } from "./DescriptionList";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./DescriptionTerm.module.scss";

export interface DescriptionTermProps {
    compact?: boolean;
    titleWidth?: string;
    children?: React.ReactNode;
}

const DescriptionTerm = ({ compact, titleWidth, children }: DescriptionTermProps) => {
    const { compact: compactFromList, titleWidth: titleWidthFromList } = useDescriptionList();

    // Left undefined rather than defaulted to false, so `compact={false}` on a
    // term inside a compact list can still opt out.
    const isCompact = compact ?? compactFromList;
    const resolvedTitleWidth = titleWidth ?? titleWidthFromList;

    return (
        <dt
            className={classNameArrayToClassNameString([style.descriptionTerm, isCompact && style.compact])}
            style={{ "--title-width": resolvedTitleWidth || undefined } as React.CSSProperties}
        >
            {children}
        </dt>
    );
};

export default DescriptionTerm;
