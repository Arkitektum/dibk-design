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

    // The live region is always in the DOM, even with nothing to say. A screen
    // reader announces *changes inside* a region it is already watching, so one
    // inserted together with its own text — which is what returning null here
    // used to produce — is usually missed entirely. Empty, it is a block box
    // with no content, so it occupies no space and shifts nothing.
    //
    // A <span> rather than a <div> because this is a public component: a <div>
    // would be invalid markup for a consumer rendering it inside a <p>.
    return (
        <span className={style.errorMessageRegion} aria-live="polite">
            {hasContent ? (
                <span {...getErrorElementProps()}>
                    {/* Inlined rather than <img src>: the icon is drawn with
                        fill="currentColor", and an <img> loads the file as its own
                        document, where `currentColor` cannot see the text colour here. */}
                    <ErrorIcon aria-hidden="true" className={style.errorSign} />
                    {content}
                </span>
            ) : null}
        </span>
    );
};

export default ErrorMessage;
