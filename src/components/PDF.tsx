// Dependencies
import { Fragment } from "react";
import type { ReactNode } from "react";

// Stylesheets
import "./PDF.scss";

export interface PDFProps {
    children?: ReactNode;
    signedDocument?: boolean;
    orientation?: "portrait" | "landscape";
}

const PDF = ({ children }: PDFProps) => {
    return <Fragment>{children}</Fragment>;
};

export default PDF;
