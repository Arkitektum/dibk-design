// Dependencies
import ReactSelect, { type CSSObjectWithLabel, type MultiValue, type SingleValue } from "react-select";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

// Components
import FieldRequirementIndicator, { type RequirementIndicatorMode } from "./FieldRequirementIndicator";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Select.module.scss";

export type Option = string | number | { key: string | number; value: string | number };

interface SelectPropsBase {
    id: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    options?: Option[];
    width?: string;
    label?: React.ReactNode;
    hideLabel?: boolean;
    /**
     * Renders the current selection as static text instead of a form control:
     * the label, then a plain `<span>`. No input, no dropdown, not focusable,
     * and no form control in the DOM — for read-only and view modes, where
     * `disabled` would wrongly imply "temporarily unavailable".
     */
    contentOnly?: boolean;
    /**
     * `contentOnly` only. Shows the matching option's `key` (its human-readable
     * label) instead of the raw `value`. Has no effect outside `contentOnly`.
     */
    keyAsContent?: boolean;
    placeholder?: string;
    /**
     * Sentinel value meaning "nothing selected": shows `placeholder` instead of
     * the raw value, and is what `onChange` reports when the selection is
     * cleared. Clearing a single select needs `isClearable`.
     */
    placeholderValue?: string | number;
    /**
     * Whether the selection can be cleared. Defaults to react-select's own
     * behaviour — off for a single select, on for `multiple`.
     */
    isClearable?: boolean;
    defaultContent?: string;
    role?: string;
    "aria-describedby"?: string;
    hasErrors?: boolean;
    errorMessage?: React.ReactNode;
    formatOptionLabel?: (option: Option, meta: { context: "menu" | "value" }) => React.ReactNode;

    actionButtonColor?: "primary" | "secondary";
    actionButtonContent?: string;
    actionButtonIconLeft?: React.ReactNode;
    actionButtonIconRight?: React.ReactNode;
    actionButtonOnClick?: () => void;
    actionButtonDisabled?: boolean;
    actionButtonAriaLabel?: string;
    actionButtonMatchHeight?: boolean;

    backgroundColor?: string;
    textColor?: string;
    placeholderColor?: string;
    requirementIndicatorMode?: RequirementIndicatorMode;
    optionalLabel?: string;
}

export interface SingleSelectProps extends SelectPropsBase {
    multiple?: false;
    onChange: (value: string | number) => void;
    value?: string | number;
    defaultValue?: string | number;
}

export interface MultipleSelectProps extends SelectPropsBase {
    multiple: true;
    onChange: (value: (string | number)[]) => void;
    value?: (string | number)[];
    defaultValue?: (string | number)[];
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

type SelectOption = {
    value: string | number;
    label: string;
    raw: Option;
};

const menuPortalStyles = {
    menuPortal: (base: CSSObjectWithLabel) => ({ ...base, zIndex: 1100 })
};

// Module scope keeps these component identities stable — rebuilding them per
// render makes React unmount and remount the indicator subtrees every time.
const selectComponents = {
    IndicatorSeparator: () => null,
    DropdownIndicator: () => null
};

const closeMenuOnScroll = (event: Event): boolean => {
    const target = event.target;
    return !(target instanceof HTMLElement && target.closest(".reactSelect__menu"));
};

const Select = (props: SelectProps) => {
    const {
        id,
        name = "",
        required = false,
        disabled = false,
        options = [],
        width,
        label = "",
        hideLabel = false,
        contentOnly = false,
        keyAsContent = false,
        placeholder = "",
        placeholderValue,
        isClearable,
        defaultContent = "",
        role,
        "aria-describedby": ariaDescribedBy,
        hasErrors = false,
        errorMessage = "",
        actionButtonColor = "secondary",
        actionButtonContent,
        actionButtonIconLeft,
        actionButtonIconRight,
        actionButtonOnClick,
        actionButtonDisabled = false,
        actionButtonAriaLabel,
        actionButtonMatchHeight = false,

        backgroundColor,
        textColor,
        placeholderColor,
        requirementIndicatorMode,
        optionalLabel
    } = props;

    const getErrorElementId = () => `${id}-errorMessage`;
    const isMulti = props.multiple === true;

    // Tracked here rather than read off react-select's own
    // `control--menu-is-open` class: the arrow sits outside the control, so CSS
    // alone cannot reach it from that class.
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const selectOptions = useMemo(
        () =>
            options.map((option) =>
                typeof option === "object"
                    ? { value: option.value, label: String(option.key), raw: option }
                    : { value: option, label: String(option), raw: option }
            ),
        [options]
    );

    // Exact match first, then match on the string form, so a value that has
    // been through a query string or a JSON round trip ("5") still resolves
    // against a numeric option value (5). Options differing only in type are
    // therefore still distinguishable, because the exact pass runs over all of
    // them before the loose one.
    const findOption = (value: string | number): SelectOption | undefined =>
        selectOptions.find((option) => option.value === value) ?? selectOptions.find((option) => String(option.value) === String(value));

    const getOptionByValue = (value: string | number): SelectOption => {
        return findOption(value) ?? { value, label: String(value), raw: value };
    };

    // The placeholder sentinel is not a real option: resolving it would render
    // the raw sentinel as the selected label instead of showing the placeholder.
    const isPlaceholderValue = (value: string | number) => placeholderValue !== undefined && String(value) === String(placeholderValue);

    const toSelectValue = (value: string | number | (string | number)[] | undefined): SelectOption | SelectOption[] | null => {
        if (value === undefined) return null;
        if (Array.isArray(value)) return value.filter((entry) => !isPlaceholderValue(entry)).map(getOptionByValue);
        return isPlaceholderValue(value) ? null : getOptionByValue(value);
    };

    // `contentOnly` renders single and multiple selections alike, so both are
    // normalised to a list. `value` wins over `defaultValue`, matching the
    // react-select instance below.
    const selectedEntries = (): (string | number)[] => {
        const selected = props.value !== undefined ? props.value : props.defaultValue;
        if (selected === undefined || selected === null) return [];
        const entries = Array.isArray(selected) ? selected : [selected];
        return entries.filter((entry) => entry !== null && entry !== undefined && entry !== "" && !isPlaceholderValue(entry));
    };

    const contentOnlyText = (): string => {
        const entries = selectedEntries();
        if (!entries.length) return defaultContent;
        return entries.map((entry) => (keyAsContent ? getOptionByValue(entry).label : String(entry))).join(", ");
    };

    // An unmatched value falls back to rendering as its own label, so a stray id
    // shows up as the visible option text rather than as an error. Skipped when
    // there are no options at all, which is the normal state while they load.
    const unmatchedValues = options.length ? selectedEntries().filter((entry) => findOption(entry) === undefined) : [];
    const unmatchedKey = unmatchedValues.map(String).join(", ");

    useEffect(() => {
        if (process.env.NODE_ENV === "production" || !unmatchedKey) return;
        console.warn(
            `Select "${id}": value ${unmatchedKey} matches no option, so it renders as its own label. ` +
                `Check that the value and the option values have the same type — a string "5" does not match a numeric option value 5.`
        );
    }, [id, unmatchedKey]);

    const placeholderText = placeholder || defaultContent || "";
    const hasActionButton = Boolean(actionButtonContent) && Boolean(actionButtonOnClick);
    const containerStyle = {
        ...(width ? { maxWidth: width } : {}),
        ...(backgroundColor ? { ["--select-background" as string]: backgroundColor } : {}),
        ...(textColor ? { ["--select-text" as string]: textColor } : {}),
        ...(placeholderColor ? { ["--select-placeholder" as string]: placeholderColor } : {})
    } as React.CSSProperties;
    const selectContainerStyle = hasActionButton ? undefined : containerStyle;

    const handleChange = (nextValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
        if (isMulti) {
            const values = (nextValue as MultiValue<SelectOption>).map((opt) => opt.value);
            if (props.multiple) props.onChange(values);
            return;
        }

        const selected = nextValue as SingleValue<SelectOption>;
        if (props.multiple) return;
        if (selected) {
            props.onChange(selected.value);
            return;
        }

        // Clearing the selection reports the sentinel, mirroring the inbound
        // direction handled by isPlaceholderValue. Without a sentinel there is
        // nothing truthful to report, so the clear is swallowed and the
        // controlled value stays put — as it did before placeholderValue was
        // honoured at all.
        if (placeholderValue !== undefined) {
            props.onChange(placeholderValue);
        }
    };

    const arrowElement = <span className={classNameArrayToClassNameString([style.selectListArrow, menuIsOpen && style.menuIsOpen])} />;

    // One instance shared by both layouts below — they differ only in the
    // wrapper, and keeping two copies in sync has already drifted once.
    const selectElement = (
        <ReactSelect
            inputId={id}
            name={name}
            aria-describedby={hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy}
            aria-invalid={hasErrors || undefined}
            aria-required={required || undefined}
            isDisabled={disabled}
            isMulti={isMulti}
            // Resolved here rather than left undefined because react-select's
            // keyboard handler reads the raw prop, while only its clear-button
            // rendering falls back to isMulti — so leaving it unset makes
            // Backspace a no-op on a multi select that shows a clear button.
            isClearable={isClearable ?? isMulti}
            isSearchable={false}
            closeMenuOnSelect={!isMulti}
            placeholder={placeholderText}
            onChange={handleChange}
            onMenuOpen={() => setMenuIsOpen(true)}
            onMenuClose={() => setMenuIsOpen(false)}
            options={selectOptions}
            menuPortalTarget={typeof document === "undefined" ? null : document.body}
            menuPosition="fixed"
            closeMenuOnScroll={closeMenuOnScroll}
            styles={menuPortalStyles}
            className={classNameArrayToClassNameString([hasErrors && style.hasErrors])}
            classNamePrefix="reactSelect"
            formatOptionLabel={props.formatOptionLabel ? (option, meta) => props.formatOptionLabel?.(option.raw, meta) : undefined}
            components={selectComponents}
            {...(props.value !== undefined
                ? { value: toSelectValue(props.value) }
                : props.defaultValue !== undefined
                  ? { defaultValue: toSelectValue(props.defaultValue) }
                  : {})}
        />
    );

    const labelElement = (Boolean(label) || required) && (
        <Label htmlFor={id} srOnly={hideLabel}>
            {label}
            <FieldRequirementIndicator
                required={required}
                mode={requirementIndicatorMode}
                optionalLabel={optionalLabel}
                requiredClassName={style.requiredSymbol}
            />
        </Label>
    );

    // No form control, no dropdown arrow and no action button: `contentOnly` is
    // a display mode, so every interactive affordance is left out of the DOM
    // rather than disabled.
    if (contentOnly) {
        return (
            <div className={style.select}>
                {labelElement}
                <span className={style.contentOnly}>{contentOnlyText()}</span>
                <ErrorMessage id={getErrorElementId()} content={errorMessage} />
            </div>
        );
    }

    return (
        <div className={style.select}>
            {labelElement}

            {hasActionButton ? (
                <div
                    className={classNameArrayToClassNameString([style.selectWithButton, actionButtonMatchHeight && style.matchHeight])}
                    style={containerStyle}
                >
                    <div className={classNameArrayToClassNameString([style.selectContainer])} role={role}>
                        {arrowElement}

                        {selectElement}
                    </div>
                    <Button
                        color={actionButtonColor}
                        inputType="button"
                        onClick={actionButtonOnClick}
                        disabled={actionButtonDisabled}
                        aria-label={actionButtonAriaLabel}
                        iconLeft={actionButtonIconLeft}
                        iconRight={actionButtonIconRight}
                        noMargin
                    >
                        {actionButtonContent}
                    </Button>
                </div>
            ) : (
                <div className={classNameArrayToClassNameString([style.selectContainer])} style={selectContainerStyle} role={role}>
                    {arrowElement}

                    {selectElement}
                </div>
            )}

            <ErrorMessage id={getErrorElementId()} content={errorMessage} />
        </div>
    );
};

export default Select;
