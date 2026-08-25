// Dependencies
import {
    type ButtonHTMLAttributes,
    Children,
    type KeyboardEvent,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
    cloneElement,
    isValidElement,
    useId,
    useMemo,
    useRef,
    useState
} from "react";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Tabs.module.scss";

export interface TabsProps {
    children?: ReactNode;
    defaultIndex?: number;
    // eslint-disable-next-line no-unused-vars
    onChange?: (nextIndex: number) => void;
    className?: string;
}

export interface TabsListProps {
    children?: ReactNode;
    activeIndex?: number;
    // eslint-disable-next-line no-unused-vars
    setActiveIndex?: (index: number) => void;
    baseId?: string;
}

export interface TabsPanelsProps {
    children?: ReactNode;
    activeIndex?: number;
    baseId?: string;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    amount?: number;
    isActive?: boolean;
    tabId?: string;
    panelId?: string;
    onSelect?: () => void;
}

export interface TabPanelProps {
    children?: ReactNode;
    isActive?: boolean;
    tabId?: string;
    panelId?: string;
}

const Tabs = ({ children, defaultIndex = 0, onChange, className }: TabsProps) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const baseId = useId();
    const sanitizedBaseId = useMemo(() => baseId.replace(/:/g, ""), [baseId]);

    const handleChange = (nextIndex: number) => {
        setActiveIndex(nextIndex);
        onChange?.(nextIndex);
    };

    return (
        <div className={classNameArrayToClassNameString([style.tabs, className])}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return null;

                if (child.type === TabsList) {
                    return cloneElement(child as ReactElement<TabsListProps>, {
                        activeIndex,
                        setActiveIndex: handleChange,
                        baseId: sanitizedBaseId
                    });
                }

                if (child.type === TabsPanels) {
                    return cloneElement(child as ReactElement<TabsPanelsProps>, {
                        activeIndex,
                        baseId: sanitizedBaseId
                    });
                }

                return child;
            })}
        </div>
    );
};

const TabsList = ({ children, activeIndex = 0, setActiveIndex, baseId }: TabsListProps) => {
    const tabListRef = useRef<HTMLDivElement>(null);
    const tabItems = useMemo(() => Children.toArray(children).filter((child) => isValidElement(child)), [children]);

    const tabCount = tabItems.length;

    const isDisabled = (index: number) => {
        const item = tabItems[index];
        return isValidElement<TabProps>(item) ? Boolean(item.props.disabled) : false;
    };

    // Walks from `start` in `step` direction, wrapping, until it finds a tab the
    // browser will accept focus on.
    const findEnabledIndex = (start: number, step: number): number | null => {
        for (let offset = 0; offset < tabCount; offset++) {
            const candidate = (((start + step * offset) % tabCount) + tabCount) % tabCount;
            if (!isDisabled(candidate)) return candidate;
        }
        return null;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (!setActiveIndex || tabCount === 0) return;

        let nextIndex: number | null;

        switch (event.key) {
            case "ArrowRight":
                nextIndex = findEnabledIndex(index + 1, 1);
                break;
            case "ArrowLeft":
                nextIndex = findEnabledIndex(index - 1, -1);
                break;
            case "Home":
                nextIndex = findEnabledIndex(0, 1);
                break;
            case "End":
                nextIndex = findEnabledIndex(tabCount - 1, -1);
                break;
            default:
                return;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        setActiveIndex(nextIndex);
        // Focus has to follow the selection: the handler is bound to the tab it
        // fires on, so leaving focus behind makes every further arrow press
        // recompute the same target and navigation sticks.
        tabListRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[nextIndex]?.focus();
    };

    return (
        <div ref={tabListRef} className={style.tabList} role="tablist">
            {tabItems.map((child, index) => {
                if (!isValidElement<TabProps>(child)) return null;

                const tabId = `${baseId}-tab-${index}`;
                const panelId = `${baseId}-panel-${index}`;
                const isActive = index === activeIndex;

                return cloneElement(child, {
                    tabId,
                    panelId,
                    isActive,
                    onSelect: () => setActiveIndex?.(index),
                    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => handleKeyDown(event, index)
                });
            })}
        </div>
    );
};

const Tab = ({ children, amount, isActive, onSelect, onClick, onKeyDown, tabId, panelId, className, ...rest }: TabProps) => {
    const classNameString = classNameArrayToClassNameString([style.tab, isActive && style.active, rest.disabled && style.disabled, className]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        onSelect?.();
    };

    const handleLocalKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event);
    };

    return (
        <button
            {...rest}
            id={tabId}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={panelId}
            // Roving tabindex: one Tab stop for the whole tablist, then arrow
            // keys move between tabs.
            tabIndex={isActive ? 0 : -1}
            className={classNameString}
            onClick={handleClick}
            onKeyDown={handleLocalKeyDown}
        >
            <span className={style.tabLabel}>{children}</span>
            {typeof amount === "number" && <span className={style.tabAmount}>{amount}</span>}
        </button>
    );
};

const TabsPanels = ({ children, activeIndex = 0, baseId }: TabsPanelsProps) => {
    return (
        <div className={style.tabPanels}>
            {Children.map(children, (child, index) => {
                if (!isValidElement<TabPanelProps>(child)) return null;
                const tabId = `${baseId}-tab-${index}`;
                const panelId = `${baseId}-panel-${index}`;

                return cloneElement(child, {
                    isActive: index === activeIndex,
                    tabId,
                    panelId
                });
            })}
        </div>
    );
};

const TabPanel = ({ children, isActive, tabId, panelId }: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            className={classNameArrayToClassNameString([style.tabPanel, !isActive && style.hidden])}
            hidden={!isActive}
        >
            {children}
        </div>
    );
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panels = TabsPanels;
Tabs.Panel = TabPanel;

export default Tabs;
