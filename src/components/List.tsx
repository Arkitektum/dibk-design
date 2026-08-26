// Dependencies
import React, { createContext, useContext } from "react";

// Stylesheets
import style from "./List.module.scss";

interface ListContextValue {
    compact?: boolean;
}

// Context rather than cloning the children: cloneElement only ever reached
// direct children, so items wrapped in a component were skipped, and it copied
// `compact` onto *every* element child — including a plain DOM node such as a
// <div>, which React then warns about as an unknown attribute.
const ListContext = createContext<ListContextValue>({});

export const useList = () => useContext(ListContext);

export interface ListProps {
    listStyle?: string;
    compact?: boolean;
    ordered?: boolean;
    children?: React.ReactNode;
}

const List = ({ listStyle, compact, ordered = false, children }: ListProps) => {
    const { compact: compactFromList } = useList();

    // Left undefined rather than defaulted to false, so a nested list inherits
    // compact from the list around it while `compact={false}` still opts out.
    const isCompact = compact ?? compactFromList;

    const listType = ordered ? "ol" : "ul";
    const defaultStyle = ordered ? "decimal" : "disc";
    const styleVar = "--listStyle";

    return React.createElement(
        listType,
        {
            className: `${style.list} ${isCompact ? style.compact : ""}`,
            style: { [styleVar]: listStyle || defaultStyle } as React.CSSProperties
        },
        // The provider renders no DOM of its own, so the <li> children stay
        // direct children of the <ul>/<ol>.
        <ListContext.Provider value={{ compact: isCompact }}>{children}</ListContext.Provider>
    );
};

export default List;
