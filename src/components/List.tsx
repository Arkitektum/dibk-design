// Dependencies
import React, { Children, cloneElement, isValidElement } from "react";

// Helpers
import { cloneThroughFragments } from "../functions/helpers";

// Stylesheets
import style from "./List.module.scss";

export interface ListProps {
    listStyle?: string;
    compact?: boolean;
    ordered?: boolean;
    children?: React.ReactNode;
}

const List = ({ listStyle, compact = false, ordered = false, children }: ListProps) => {
    const renderChildElements = (childElements: React.ReactNode[]) => {
        const flattened = cloneThroughFragments(childElements);

        return flattened.map((child) => {
            if (isValidElement<{ compact?: boolean }>(child)) {
                return cloneElement(child, {
                    compact,
                    key: `listItem-${child.key}`
                });
            }
            return child;
        });
    };

    const listType = ordered ? "ol" : "ul";
    const defaultStyle = ordered ? "decimal" : "disc";
    const styleVar = "--listStyle";

    return React.createElement(
        listType,
        {
            className: `${style.list} ${compact ? style.compact : ""}`,
            style: { [styleVar]: listStyle || defaultStyle } as React.CSSProperties
        },
        renderChildElements(Children.toArray(children))
    );
};

export default List;
