import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import xSymbol from "../assets/svg/x-symbol.svg?url";
import {
  addFocusTrapInsideElement,
  classNameArrayToClassNameString,
} from "../functions/helpers";
import style from "./Dialog.module.scss";

export interface DialogProps {
  maxWidth?: string;
  noPadding?: boolean;
  closeButton?: boolean;
  onClickOutside: () => void;
  modal?: boolean;
  attachTo?: "left" | "right" | "top" | "bottom" | string;
  hidden?: boolean;
  children?: React.ReactNode;
}

const Dialog = ({
  maxWidth = "none",
  noPadding,
  closeButton,
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
      onClick={onClickOutside}
      {...dialogRoleProps}
    >
      {modal && <div className={style.backdrop} aria-hidden="true" />}
      <div
        ref={dialogContainerRef}
        className={style.dialogContainer}
        style={dialogContentStyleProps}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={dialogContentRef}
          className={classNameArrayToClassNameString([
            style.dialogContent,
            noPadding && style.noPadding,
          ])}
        >
          {closeButton && (
            <button
              type="button"
              aria-label="Lukk dialog"
              onClick={onClickOutside}
              className={classNameArrayToClassNameString([
                style.closeButton,
                noPadding && style.noPadding,
              ])}
            >
              <img src={xSymbol} alt="" />
            </button>
          )}
          <div aria-live="assertive">{children}</div>
        </div>
      </div>
    </div>,
    portalElement,
  );
};

export default Dialog;
