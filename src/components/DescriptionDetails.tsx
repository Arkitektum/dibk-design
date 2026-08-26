// Dependencies
import type React from "react";

// Components
import { useDescriptionList } from "./DescriptionList";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./DescriptionDetails.module.scss";

export interface DescriptionDetailsProps {
    compact?: boolean;
    titleWidth?: string;
    children?: React.ReactNode;
}

const DescriptionDetails = ({ compact, titleWidth, children }: DescriptionDetailsProps) => {
    const { compact: compactFromList, titleWidth: titleWidthFromList } = useDescriptionList();

    // Left undefined rather than defaulted to false, so `compact={false}` on
    // details inside a compact list can still opt out.
    const isCompact = compact ?? compactFromList;
    const resolvedTitleWidth = titleWidth ?? titleWidthFromList;

    return (
        <dd
            className={classNameArrayToClassNameString([style.descriptionDetails, isCompact && style.compact])}
            style={{ "--title-width": resolvedTitleWidth || undefined } as React.CSSProperties}
        >
            {children}
        </dd>
    );
};

export default DescriptionDetails;
