// Dependencies
import React, { useEffect, useRef, useState } from "react";
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
}

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
    children
}: DialogProps) => {
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

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [hidden, modal]);

    const sideBarClassNames = attachTo && classNameArrayToClassNameString([style.isSidebar, style[attachTo]]);
    const dialogContentStyleProps = {
        "--max-width": maxWidth
    } as React.CSSProperties;

    if (hidden || !portalElement) {
        return null;
    }

    const dialogRoleProps = modal ? ({ role: "dialog", "aria-modal": "true" } as const) : ({ role: "dialog" } as const);

    return createPortal(
        <div className={classNameArrayToClassNameString([style.dialog, sideBarClassNames])} {...dialogRoleProps}>
            <button
                type="button"
                className={classNameArrayToClassNameString([style.backdrop, !modal && style.backdropTransparent])}
                onClick={onClickOutside}
                aria-label="Lukk dialog"
            />
            <div ref={dialogContainerRef} className={style.dialogContainer} style={dialogContentStyleProps}>
                <div ref={dialogContentRef} className={classNameArrayToClassNameString([style.dialogContent, noPadding && style.noPadding])}>
                    {title && <div className={style.dialogHeader}>{typeof title === "string" ? <Header size={2}>{title}</Header> : title}</div>}
                    {closeButton && (
                        <button
                            aria-label="Lukk dialog"
                            onClick={onClickOutside}
                            className={classNameArrayToClassNameString([style.closeButton, noPadding && style.noPadding])}
                        >
                            <XSymbolIcon />
                        </button>
                    )}
                    <div className={style.dialogBody} aria-live="assertive">
                        {children}
                    </div>
                    {footer && <div className={style.dialogFooter}>{footer}</div>}
                </div>
            </div>
        </div>,
        portalElement
    );
};

export default Dialog;
