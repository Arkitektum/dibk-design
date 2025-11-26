import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import asterisk from "../assets/svg/asterisk.svg?url";
import {
  addFocusTrapInsideElement,
  classNameArrayToClassNameString,
} from "../functions/helpers";
import CheckBoxList from "./CheckBoxList";
import CheckBoxListItem from "./CheckBoxListItem";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import style from "./Select.module.scss";

export type Option =
  | string
  | number
  | { key: string | number; value: string | number };

interface SelectPropsBase {
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Option[];
  width?: string;
  label?: React.ReactNode;
  contentOnly?: boolean;
  keyAsContent?: boolean;
  placeholder?: string;
  placeholderValue?: string;
  defaultContent?: string;
  role?: string;
  "aria-describedby"?: string;
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
  size?: "small" | "medium";
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

const Select = (props: SelectProps) => {
  const {
    id,
    name = "",
    required = false,
    disabled = false,
    options = [],
    width,
    label = "",
    contentOnly = false,
    keyAsContent = false,
    placeholder = "",
    placeholderValue = "",
    defaultContent = "",
    role,
    "aria-describedby": ariaDescribedBy,
    hasErrors = false,
    errorMessage = "",
    size = "medium",
  } = props;

  const [showDropdownList, setShowDropdownList] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const focusTrapRef = useCallback((element: HTMLElement | null) => {
    if (element) addFocusTrapInsideElement(element);
  }, []);

  const hideDropdownList = () => setShowDropdownList(false);

  useEffect(() => {
    const keyDownFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") hideDropdownList();
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        hideDropdownList();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", keyDownFunction);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", keyDownFunction);
    };
  }, []);

  const toOptionObject = (option: Option) =>
    typeof option === "object"
      ? { key: option.key, value: option.value }
      : { key: option, value: option };

  const getLabelForValue = (val: string | number) => {
    const found = options
      .map(toOptionObject)
      .find((o) => o.value === val || o.key === val);
    return found ? (found.key ?? found.value) : val;
  };

  const ensureArray = (v: unknown): (string | number)[] =>
    Array.isArray(v)
      ? (v as (string | number)[])
      : v == null
        ? []
        : [v as string | number];

  const selectedArray = (): (string | number)[] => {
    if (props.value !== undefined) return ensureArray(props.value);
    if (props.defaultValue !== undefined)
      return ensureArray(props.defaultValue);
    return [];
  };

  const renderSelectedValues = () => {
    const arr = selectedArray();
    if (arr.length === 0) return placeholder || defaultContent || "";
    return arr.map(getLabelForValue).join(", ");
  };

  const handleMultipleChange = (changedValue: string | number) => {
    const current = selectedArray();
    const exists = current.includes(changedValue);
    const next = exists
      ? current.filter((v) => v !== changedValue)
      : [...current, changedValue];
    if (props.multiple) {
      props.onChange(next);
    }
  };

  const renderCheckBoxElements = () => {
    const current = selectedArray();
    return options.map((opt) => {
      const { key, value: val } = toOptionObject(opt);
      const selected = current.includes(val as string | number);
      const itemId = `${id}-${String(val)}`;
      return (
        <CheckBoxListItem
          key={String(val)}
          id={itemId}
          value={val}
          checked={selected}
          onChange={() => handleMultipleChange(val)}
        >
          {key}
        </CheckBoxListItem>
      );
    });
  };

  const getErrorElementId = () => `${id}-errorMessage`;

  // content-only rendering (supports both single and multi)
  if (contentOnly) {
    const current = selectedArray();
    const content =
      current.length === 0
        ? defaultContent
        : keyAsContent
          ? current.map(getLabelForValue).join(", ")
          : current.join(", ");
    return (
      <div className={style.select}>
        <Label htmlFor={id}>{label}</Label>
        <span>{content}</span>
      </div>
    );
  }

  // Helper: for single-select, coerce raw string back to original option value type
  const coerceFromSelect = (raw: string): string | number => {
    const match = options
      .map(toOptionObject)
      .find((o) => String(o.value) === raw);
    return match ? match.value : raw;
  };

  return (
    <div className={style.select}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <img src={asterisk} alt="" className={style.requiredSymbol} />
        )}
      </Label>

      <div
        className={classNameArrayToClassNameString([
          style.selectContainer,
          size === "small" && style.small,
        ])}
        style={width ? { maxWidth: width } : undefined}
      >
        <span className={style.selectListArrow} />

        {props.multiple ? (
          // ---- MULTI (custom checkbox dropdown) ----
          <div ref={dropdownRef}>
            <button
              type="button"
              id={id}
              aria-haspopup="listbox"
              aria-expanded={showDropdownList}
              onClick={() => setShowDropdownList((s) => !s)}
              className={classNameArrayToClassNameString([
                style.multipleSelectElement,
                size === "small" && style.small,
              ])}
              disabled={disabled}
            >
              {renderSelectedValues()}
            </button>

            {showDropdownList && (
              <div
                ref={focusTrapRef}
                className={style.multipleSelectDropdown}
                role="listbox"
                aria-multiselectable="true"
                aria-labelledby={id}
              >
                <CheckBoxList compact>{renderCheckBoxElements()}</CheckBoxList>
              </div>
            )}
          </div>
        ) : (
          // ---- SINGLE (native select) ----
          <select
            name={name}
            required={required}
            disabled={disabled}
            onChange={(e) => props.onChange(coerceFromSelect(e.target.value))}
            id={id}
            role={role}
            className={classNameArrayToClassNameString([
              hasErrors && style.hasErrors,
              size === "small" && style.small,
            ])}
            aria-describedby={
              hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy
            }
            aria-invalid={hasErrors || undefined}
            style={width ? { maxWidth: width } : undefined}
            // NOTE: only pass scalar value/defaultValue here — never arrays
            {...(props.value !== undefined
              ? { value: props.value }
              : props.defaultValue !== undefined
                ? { defaultValue: props.defaultValue }
                : {})}
          >
            {placeholder && (
              <option value={placeholderValue} disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const { key, value: optValue } = toOptionObject(opt);
              return (
                <option key={String(optValue)} value={String(optValue)}>
                  {key}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <ErrorMessage id={getErrorElementId()} content={errorMessage} />
    </div>
  );
};

export default Select;
