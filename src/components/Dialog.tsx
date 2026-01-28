import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import xSymbol from "../assets/svg/x-symbol.svg?url";
import {
  addFocusTrapInsideElement,
  classNameArrayToClassNameString,
} from "../functions/helpers";
import Button from "./Button";
import style from "./Dialog.module.scss";
import Header from "./Header";

export interface DialogProps {
  maxWidth?: string;
  noPadding?: boolean;
  title?: React.ReactNode | string;
  onClickOutside: () => void;
  modal?: boolean;
  attachTo?: "left" | "right" | "top" | "bottom" | string;
  hidden?: boolean;
  children?: React.ReactNode;
}

const Dialog = ({
  maxWidth = "none",
  noPadding,
  title,
  onClickOutside,
  modal = true,
  attachTo,
  hidden = false,
  children,
}: DialogProps) => {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(
    null,
  );
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const dialogContentRef = useCallback(
    (element: HTMLDivElement | null): void => {
      if (element) {
        addFocusTrapInsideElement(element);
      }
    },
    [],
  );

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

  const sideBarClassNames =
    attachTo &&
    classNameArrayToClassNameString([style.isSidebar, style[attachTo]]);
  const dialogContentStyleProps = {
    "--max-width": maxWidth,
  } as React.CSSProperties;

  if (hidden || !portalElement) {
    return null;
  }

  const dialogRoleProps = modal
    ? ({ role: "dialog", "aria-modal": "true" } as const)
    : ({ role: "dialog" } as const);

  return createPortal(
    <div
      className={classNameArrayToClassNameString([
        style.dialog,
        sideBarClassNames,
      ])}
      {...dialogRoleProps}
    >
      <button
        type="button"
        className={classNameArrayToClassNameString([
          style.backdrop,
          !modal && style.backdropTransparent,
        ])}
        onClick={onClickOutside}
        aria-label="Lukk dialog"
      />
      <div
        ref={dialogContainerRef}
        className={style.dialogContainer}
        style={dialogContentStyleProps}
      >
        <div
          ref={dialogContentRef}
          className={classNameArrayToClassNameString([
            style.dialogContent,
            noPadding && style.noPadding,
          ])}
        >
          {title && (
            <div className={style.dialogHeader}>
              {typeof title === "string" ? (
                <Header size={2}>{title}</Header>
              ) : (
                title
              )}
              <Button
                color="neutral"
                aria-label="Lukk dialog"
                onClick={onClickOutside}
                iconRight={<img src={xSymbol} alt="" />}
              >
                Lukk
              </Button>
            </div>
          )}
          <div className={style.dialogBody} aria-live="assertive">
            {children}
          </div>
        </div>
      </div>
    </div>,
    portalElement,
  );
};

export default Dialog;
