// Dependencies
import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Components
import Header from "./Header";
import { XSymbolIcon } from "../icons";

// Helpers
import { addFocusTrapInsideElement, classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Dialog.module.scss";

export interface DialogProps {
    maxWidth?: string;
    noPadding?: boolean;
    title?: React.ReactNode | string;
    closeButton?: boolean;
    onClickOutside: () => void;
    modal?: boolean;
    attachTo?: "left" | "right" | "top" | "bottom" | string;
    hidden?: boolean;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    /** Accessible name of the close button. */
    closeButtonAriaLabel?: string;
    /** Names the dialog when it has no `title` to point at. */
    "aria-label"?: string;
    /** Overrides the name derived from `title`. */
    "aria-labelledby"?: string;
}

// Nested and overlapping dialogs share one body scroll lock: the innermost to
// close must not unlock the page while an outer dialog is still open, and
// closing out of order must not leave the page locked forever.
let openScrollLocks = 0;
let overflowBeforeLock: string | null = null;

const lockBodyScroll = (): (() => void) => {
    if (typeof document === "undefined") return () => {};

    if (openScrollLocks === 0) {
        overflowBeforeLock = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }
    openScrollLocks += 1;

    let released = false;
    return () => {
        if (released) return;
        released = true;
        openScrollLocks -= 1;
        if (openScrollLocks === 0) {
            document.body.style.overflow = overflowBeforeLock ?? "";
            overflowBeforeLock = null;
        }
    };
};

const Dialog = ({
    maxWidth = "none",
    noPadding,
    title,
    closeButton = true,
    onClickOutside,
    modal = true,
    attachTo,
    hidden = false,
    footer,
    children,
    closeButtonAriaLabel = "Lukk dialog",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
}: DialogProps) => {
    const titleId = useId();
    const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
    const dialogContainerRef = useRef<HTMLDivElement>(null);
    const dialogContentRef = useRef<HTMLDivElement>(null);

    // Runs once the portal content is mounted; the teardown removes the key
    // handler and returns focus to whatever opened the dialog.
    useEffect(() => {
        const element = dialogContentRef.current;
        if (!element) return;
        return addFocusTrapInsideElement(element);
    }, [portalElement, hidden]);

    useEffect(() => {
        if (hidden) {
            return undefined;
        }

        const keyDownFunction = (event: KeyboardEvent) => {
            if (event.key === "Escape" && onClickOutside) {
                onClickOutside();
            }
        };

        document.addEventListener("keydown", keyDownFunction, false);

        return () => {
            document.removeEventListener("keydown", keyDownFunction, false);
        };
    }, [hidden, onClickOutside]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const ensurePortalRoot = (): HTMLElement => {
            const portalId = "dibk-design-dialog-root";
            let root = document.getElementById(portalId);
            if (!root) {
                root = document.createElement("div");
                root.setAttribute("id", portalId);
                document.body.appendChild(root);
            }
            return root;
        };

        const root = ensurePortalRoot();
        const element = document.createElement("div");
        root.appendChild(element);
        setPortalElement(element);

        return () => {
            setPortalElement(null);
            if (root.contains(element)) {
                root.removeChild(element);
            }
        };
    }, []);

    useEffect(() => {
        if (hidden || !modal) {
            return;
        }

        return lockBodyScroll();
    }, [hidden, modal]);

    const sideBarClassNames = attachTo && classNameArrayToClassNameString([style.isSidebar, style[attachTo]]);
    const dialogContentStyleProps = {
        "--max-width": maxWidth
    } as React.CSSProperties;

    if (hidden || !portalElement) {
        return null;
    }

    const dialogRoleProps = {
        role: "dialog" as const,
        "aria-modal": modal || undefined,
        // Without a name, screen readers announce only "dialog".
        "aria-labelledby": ariaLabelledBy ?? (title ? titleId : undefined),
        "aria-label": ariaLabel
    };

    return createPortal(
        <div className={classNameArrayToClassNameString([style.dialog, sideBarClassNames])} {...dialogRoleProps}>
            {/* A mouse affordance only: the close button and Escape are the
                accessible ways out, so exposing this as a second identically
                labelled button is just noise. */}
            <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className={classNameArrayToClassNameString([style.backdrop, !modal && style.backdropTransparent])}
                onClick={onClickOutside}
            />
            <div ref={dialogContainerRef} className={style.dialogContainer} style={dialogContentStyleProps}>
                <div ref={dialogContentRef} className={classNameArrayToClassNameString([style.dialogContent, noPadding && style.noPadding])}>
                    {title && (
                        <div id={titleId} className={style.dialogHeader}>
                            {typeof title === "string" ? <Header size={2}>{title}</Header> : title}
                        </div>
                    )}
                    {closeButton && (
                        <button
                            type="button"
                            aria-label={closeButtonAriaLabel}
                            onClick={onClickOutside}
                            className={classNameArrayToClassNameString([style.closeButton, noPadding && style.noPadding])}
                        >
                            <XSymbolIcon />
                        </button>
                    )}
                    <div className={style.dialogBody}>{children}</div>
                    {footer && <div className={style.dialogFooter}>{footer}</div>}
                </div>
            </div>
        </div>,
        portalElement
    );
};

export default Dialog;
