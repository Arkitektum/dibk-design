// Dependencies
import type React from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./ListItem.module.scss";

export interface ListItemProps {
    compact?: boolean;
    children?: React.ReactNode;
}

const ListItem = ({ compact = false, children }: ListItemProps) => {
    const className = classNameArrayToClassNameString([style.listItem, compact && style.compact]);

    return <li className={className}>{children}</li>;
};

export default ListItem;
