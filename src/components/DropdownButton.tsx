// Dependencies
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link as RouterLink } from "react-router-dom";

// Components
import Button, { type ButtonColor } from "./Button";

// Assets
import { ChevronDownIcon } from "../icons";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./DropdownButton.module.scss";

export interface DropdownButtonItem {
    key: string;
    content: React.ReactNode;
    to?: string;
    href?: string;
    onSelect?: () => void;
}

export interface DropdownButtonProps {
    content: string;
    items: DropdownButtonItem[];
    color?: ButtonColor;
    size?: "small" | "regular";
    disabled?: boolean;
    className?: string;
}

type MenuPosition = {
    top: number;
    left: number;
    minWidth: number;
};

const DropdownButton = ({ content, items, color = "primary", size = "regular", disabled = false, className }: DropdownButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const menuId = useId();

    const focusTrigger = () => containerRef.current?.querySelector("button")?.focus();

    const focusItem = (index: number) => {
        const focusableItems = itemRefs.current.filter((item): item is HTMLElement => item !== null);
        if (!focusableItems.length) return;
        focusableItems[(index + focusableItems.length) % focusableItems.length]?.focus();
    };

    const openMenu = () => {
        const trigger = containerRef.current?.querySelector("button");
        if (trigger) {
            const rect = trigger.getBoundingClientRect();
            setMenuPosition({ top: rect.bottom, left: rect.left, minWidth: rect.width });
        }
        setIsOpen(true);
    };

    const openAndFocusItem = (index: number) => {
        openMenu();
        requestAnimationFrame(() => focusItem(index));
    };

    // Closing in response to a keyboard action or a selection returns focus to
    // the trigger. The paths where focus should stay put — an outside click, a
    // scroll, or the trigger toggling itself — call setIsOpen(false) directly.
    const close = () => {
        setIsOpen(false);
        focusTrigger();
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideInteraction = (event: MouseEvent | FocusEvent) => {
            const target = event.target;
            if (
                target instanceof Node &&
                !containerRef.current?.contains(target) &&
                !menuRef.current?.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = (event: Event) => {
            const target = event.target;
            if (target instanceof Node && menuRef.current?.contains(target)) return;
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideInteraction);
        document.addEventListener("focusin", handleOutsideInteraction);
        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);
        return () => {
            document.removeEventListener("mousedown", handleOutsideInteraction);
            document.removeEventListener("focusin", handleOutsideInteraction);
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
        };
    }, [isOpen]);

    const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openAndFocusItem(0);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openAndFocusItem(-1);
        } else if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            close();
        }
    };

    const handleMenuKeyDown = (event: React.KeyboardEvent) => {
        const focusableItems = itemRefs.current.filter((item): item is HTMLElement => item !== null);
        const activeElement = document.activeElement;
        const currentIndex = activeElement instanceof HTMLElement ? focusableItems.indexOf(activeElement) : -1;

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                focusItem(currentIndex + 1);
                break;
            case "ArrowUp":
                event.preventDefault();
                focusItem(currentIndex - 1);
                break;
            case "Home":
                event.preventDefault();
                focusItem(0);
                break;
            case "End":
                event.preventDefault();
                focusItem(focusableItems.length - 1);
                break;
            case "Escape":
                event.preventDefault();
                close();
                break;
            case "Tab":
                event.preventDefault();
                close();
                break;
        }
    };

    const handleItemSelect = (item: DropdownButtonItem) => {
        item.onSelect?.();
        // The selected item unmounts with the menu, so without moving focus back
        // to the trigger it lands on <body> and keyboard users lose their place.
        close();
    };

    const menuItemProps = (item: DropdownButtonItem, index: number) => ({
        role: "menuitem",
        tabIndex: -1,
        className: style.menuItem,
        ref: (element: HTMLElement | null) => {
            itemRefs.current[index] = element;
        },
        onClick: () => handleItemSelect(item)
    });

    return (
        <div ref={containerRef} className={classNameArrayToClassNameString([style.dropdownButton, className])}>
            <Button
                inputType="button"
                color={color}
                size={size}
                disabled={disabled}
                iconRight={<ChevronDownIcon className={classNameArrayToClassNameString([style.chevron, isOpen && style.chevronOpen])} />}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => !disabled && (isOpen ? setIsOpen(false) : openMenu())}
                onKeyDown={handleTriggerKeyDown}
            >
                {content}
            </Button>
            {isOpen &&
                menuPosition &&
                createPortal(
                    // A div rather than a ul: role="menu" replaces the list semantics
                    // outright, which is why every item had to carry role="none" to
                    // suppress them again. Without the list there is nothing to suppress,
                    // and the menu items become direct children.
                    <div
                        ref={menuRef}
                        id={menuId}
                        role="menu"
                        aria-label={content}
                        className={classNameArrayToClassNameString([style.menu, style[size]])}
                        style={{ top: menuPosition.top, left: menuPosition.left, minWidth: menuPosition.minWidth }}
                        onKeyDown={handleMenuKeyDown}
                    >
                        {items.map((item, index) =>
                            item.to?.length ? (
                                <RouterLink key={item.key} to={item.to} {...menuItemProps(item, index)}>
                                    {item.content}
                                </RouterLink>
                            ) : item.href?.length ? (
                                <a key={item.key} href={item.href} {...menuItemProps(item, index)}>
                                    {item.content}
                                </a>
                            ) : (
                                <button key={item.key} type="button" {...menuItemProps(item, index)}>
                                    {item.content}
                                </button>
                            )
                        )}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default DropdownButton;
