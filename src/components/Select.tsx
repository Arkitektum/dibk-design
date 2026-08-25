// Dependencies
import ReactSelect, { type CSSObjectWithLabel, type MultiValue, type SingleValue } from "react-select";
import type React from "react";
import { useMemo } from "react";

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
    placeholder?: string;
    /** Sentinel value meaning "nothing selected"; shows `placeholder` instead of the raw value. */
    placeholderValue?: string | number;
    defaultContent?: string;
    role?: string;
    "aria-describedby"?: string;
    hasErrors?: boolean;
    errorMessage?: React.ReactNode;
    // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string | number) => void;
    value?: string | number;
    defaultValue?: string | number;
}

export interface MultipleSelectProps extends SelectPropsBase {
    multiple: true;
    // eslint-disable-next-line no-unused-vars
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
        placeholder = "",
        placeholderValue,
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

    const selectOptions = useMemo(
        () =>
            options.map((option) =>
                typeof option === "object"
                    ? { value: option.value, label: String(option.key), raw: option }
                    : { value: option, label: String(option), raw: option }
            ),
        [options]
    );

    const getOptionByValue = (value: string | number): SelectOption => {
        const match = selectOptions.find((opt) => opt.value === value);
        return match ?? { value, label: String(value), raw: value };
    };

    // The placeholder sentinel is not a real option: resolving it would render
    // the raw sentinel as the selected label instead of showing the placeholder.
    const isPlaceholderValue = (value: string | number) => placeholderValue !== undefined && value === placeholderValue;

    const toSelectValue = (value: string | number | (string | number)[] | undefined): SelectOption | SelectOption[] | null => {
        if (value === undefined) return null;
        if (Array.isArray(value)) return value.filter((entry) => !isPlaceholderValue(entry)).map(getOptionByValue);
        return isPlaceholderValue(value) ? null : getOptionByValue(value);
    };

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
        }
    };

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
            isSearchable={false}
            closeMenuOnSelect={!isMulti}
            placeholder={placeholderText}
            onChange={handleChange}
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

    return (
        <div className={style.select}>
            {(Boolean(label) || required) && (
                <Label htmlFor={id} srOnly={hideLabel}>
                    {label}
                    <FieldRequirementIndicator
                        required={required}
                        mode={requirementIndicatorMode}
                        optionalLabel={optionalLabel}
                        requiredClassName={style.requiredSymbol}
                    />
                </Label>
            )}

            {hasActionButton ? (
                <div
                    className={classNameArrayToClassNameString([style.selectWithButton, actionButtonMatchHeight && style.matchHeight])}
                    style={containerStyle}
                >
                    <div className={classNameArrayToClassNameString([style.selectContainer])} role={role}>
                        <span className={style.selectListArrow} />

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
                    <span className={style.selectListArrow} />

                    {selectElement}
                </div>
            )}

            <ErrorMessage id={getErrorElementId()} content={errorMessage} />
        </div>
    );
};

export default Select;
