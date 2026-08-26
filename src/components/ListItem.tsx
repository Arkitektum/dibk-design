// Dependencies
import type React from "react";

// Components
import { useList } from "./List";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./ListItem.module.scss";

export interface ListItemProps {
    compact?: boolean;
    children?: React.ReactNode;
}

const ListItem = ({ compact, children }: ListItemProps) => {
    const { compact: compactFromList } = useList();

    // Left undefined rather than defaulted to false, so `compact={false}` on an
    // item inside a compact list can still opt out.
    const isCompact = compact ?? compactFromList;

    const className = classNameArrayToClassNameString([style.listItem, isCompact && style.compact]);

    return <li className={className}>{children}</li>;
};

export default ListItem;
