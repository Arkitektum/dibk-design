// Dependencies
import type React from "react";

// Components
import { ErrorIcon } from "../icons";

// Stylesheets
import style from "./ErrorMessage.module.scss";

export interface ErrorMessageProps {
    id?: string;
    content?: React.ReactNode;
}

const ErrorMessage = ({ id, content = "" }: ErrorMessageProps) => {
    const getErrorElementProps = (): React.HTMLAttributes<HTMLSpanElement> => ({
        id: id?.length ? id : undefined,
        className: style.errorMessage
    });

    const hasContent = typeof content === "string" ? content.trim().length > 0 : !!content;

    return hasContent ? (
        <span aria-live="polite" {...getErrorElementProps()}>
            {/* Inlined rather than <img src>: the icon is drawn with
                fill="currentColor", and an <img> loads the file as its own
                document, where `currentColor` cannot see the text colour here. */}
            <ErrorIcon aria-hidden="true" className={style.errorSign} />
            {content}
        </span>
    ) : null;
};

export default ErrorMessage;
