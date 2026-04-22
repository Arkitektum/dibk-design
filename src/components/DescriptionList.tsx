import React, {
	Children,
	cloneElement,
	isValidElement,
	type ReactNode,
} from "react";
import {
	classNameArrayToClassNameString,
	cloneThroughFragments,
} from "../functions/helpers";
import style from "./DescriptionList.module.scss";

export interface DescriptionListProps {
	compact?: boolean;
	titleWidth?: string;
	children?: ReactNode;
}

const DescriptionList = ({
	compact = false,
	titleWidth,
	children,
}: DescriptionListProps) => {
	const renderChildElements = (childElements: ReactNode[]) => {
		const flattened = cloneThroughFragments(childElements);

		return flattened.map((child) => {
			if (isValidElement<{ compact?: boolean; titleWidth?: string }>(child)) {
				return cloneElement(child, {
					compact,
					titleWidth,
					key: `descriptionListItem-${child.key}`,
				});
			}
			return child;
		});
	};
	return React.createElement(
		"dl",
		{
			className: classNameArrayToClassNameString([
				style.descriptionList,
				compact && style.compact,
			]),
			style: {
				"--title-width": titleWidth || undefined,
			} as React.CSSProperties,
		},
		renderChildElements(Children.toArray(children)),
	);
};

export default DescriptionList;
