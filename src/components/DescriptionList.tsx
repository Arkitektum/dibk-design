// Dependencies
import React, { type ReactNode, createContext, useContext } from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./DescriptionList.module.scss";

interface DescriptionListContextValue {
    compact?: boolean;
    titleWidth?: string;
}

// Context rather than cloning the children: cloneElement only ever reached
// direct children, so terms and details wrapped in a component were skipped,
// and it copied `compact`/`titleWidth` onto *every* element child — including a
// plain DOM node such as a <div>, which React then warns about as an unknown
// attribute.
const DescriptionListContext = createContext<DescriptionListContextValue>({});

export const useDescriptionList = () => useContext(DescriptionListContext);

export interface DescriptionListProps {
    compact?: boolean;
    titleWidth?: string;
    children?: ReactNode;
}

const DescriptionList = ({ compact, titleWidth, children }: DescriptionListProps) => {
    const { compact: compactFromList, titleWidth: titleWidthFromList } = useDescriptionList();

    // Left undefined rather than defaulted to false, so a nested list inherits
    // from the list around it while `compact={false}` still opts out.
    const isCompact = compact ?? compactFromList;
    const resolvedTitleWidth = titleWidth ?? titleWidthFromList;

    return React.createElement(
        "dl",
        {
            className: classNameArrayToClassNameString([style.descriptionList, isCompact && style.compact]),
            style: {
                "--title-width": resolvedTitleWidth || undefined
            }
        },
        // The provider renders no DOM of its own, so the <dt>/<dd> children stay
        // direct children of the <dl>.
        <DescriptionListContext.Provider value={{ compact: isCompact, titleWidth: resolvedTitleWidth }}>{children}</DescriptionListContext.Provider>
    );
};

export default DescriptionList;
