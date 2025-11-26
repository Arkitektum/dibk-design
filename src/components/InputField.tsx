// InputField.tsx

import type React from "react";
import { useRef } from "react";
import asterisk from "../assets/svg/asterisk.svg?url";
import { classNameArrayToClassNameString } from "../functions/helpers";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import style from "./InputField.module.scss";
import Label from "./Label";

export interface InputFieldProps {
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // <-- optional
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  width?: string;
  value?: string | number | Date;
  defaultValue?: string | number | Date;
  elementKey?: string;
  label?: React.ReactNode;
  contentOnly?: boolean;
  buttonColor?: "primary" | "secondary";
  buttonContent?: string;
  selectedFileName?: string;
  placeholder?: string;
  defaultContent?: string;
  min?: string;
  max?: string;
  role?: string;
  "aria-describedby"?: string;
  "aria-autocomplete"?: "none" | "inline" | "list" | "both";
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
  noMargin?: boolean;
}

/** Format a Date (or date-like string) to DD.MM.YYYY for read-only display */
const formatDateForDisplay = (input: Date | string): string => {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return String(input ?? "");
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

/** Normalize value for <input type="date"> → "YYYY-MM-DD" */
const toDateInputValue = (
  v: string | number | Date | undefined,
): string | undefined => {
  if (v == null || v === "") return undefined;
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return undefined;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const isTextLike = (type?: string) =>
  !type ||
  ["text", "search", "url", "email", "tel", "password", "number"].includes(
    type,
  );

const InputField = ({
  id,
  onChange = () => {}, // <-- default no-op
  onBlur,
  onFocus,
  name = "",
  type = "text",
  disabled = false,
  required = false,
  readOnly,
  width,
  value,
  defaultValue,
  elementKey,
  label = "",
  contentOnly = false,
  buttonColor = "primary",
  buttonContent,
  selectedFileName,
  placeholder = "",
  defaultContent = "",
  min,
  max,
  role,
  "aria-describedby": ariaDescribedBy,
  "aria-autocomplete": ariaAutocomplete,
  hasErrors = false,
  errorMessage = "",
  noMargin = false,
}: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const getErrorElementId = () => `${id}-errorMessage`;
  const styleRules: React.CSSProperties = width ? { maxWidth: width } : {};
  const isDateInput = type === "date" && !disabled && !readOnly;

  const triggerDatePicker = () => {
    if (!isDateInput || !inputRef.current) return;
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
    const inputWithPicker = inputRef.current as HTMLInputElement & {
      showPicker?: () => void;
    };
    inputWithPicker.showPicker?.();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    triggerDatePicker();
    onFocus?.(event);
  };

  /** Build value/defaultValue safely for the given type */
  const normalizedValueProps = (() => {
    if (type === "file") return {};
    if (type === "date") {
      const v = value !== undefined ? toDateInputValue(value) : undefined;
      const d =
        value === undefined && defaultValue !== undefined
          ? toDateInputValue(defaultValue)
          : undefined;
      return value !== undefined
        ? { value: v ?? "" }
        : defaultValue !== undefined
          ? { defaultValue: d }
          : {};
    }
    const toStringish = (v: unknown) =>
      v instanceof Date ? String(v.getTime()) : (v as string | number);
    if (value !== undefined)
      return { value: toStringish(value) as string | number };
    if (defaultValue !== undefined)
      return { defaultValue: toStringish(defaultValue) as string | number };
    return {};
  })();

  const inputClassName = classNameArrayToClassNameString([
    hasErrors && style.hasErrors,
    type === "file" && style.visuallyHidden,
  ]);

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    name,
    readOnly,
    disabled,
    required,
    type,
    role,
    id,
    min,
    max,
    onChange,
    onBlur,
    onFocus: handleFocus,
    placeholder: type === "file" ? undefined : placeholder,
    className: inputClassName || undefined,
    "aria-describedby":
      hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy,
    "aria-invalid": hasErrors || undefined,
    "aria-autocomplete": isTextLike(type) ? ariaAutocomplete : undefined,
    style: styleRules,
    ...normalizedValueProps,
  };

  if (contentOnly) {
    const rendered = value ?? defaultValue ?? "";
    const text =
      type === "date"
        ? rendered
          ? formatDateForDisplay(rendered as Date | string)
          : defaultContent
        : String(rendered ?? "") || defaultContent;

    return (
      <div
        className={classNameArrayToClassNameString([
          style.inputField,
          style[type],
          noMargin && style.noMargin,
        ])}
      >
        <Label htmlFor={id}>
          {label}
          {required && (
            <img src={asterisk} alt="" className={style.requiredSymbol} />
          )}
        </Label>
        <span>{text}</span>
        {hasErrors && errorMessage ? (
          <ErrorMessage id={getErrorElementId()} content={errorMessage} />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={classNameArrayToClassNameString([
        style.inputField,
        style[type],
        noMargin && style.noMargin,
      ])}
    >
      <Label htmlFor={id}>
        {label}
        {required && (
          <img src={asterisk} alt="" className={style.requiredSymbol} />
        )}
        {type === "file" && (
          <div className={style.fileInputContainer}>
            <span className={style.input}>{selectedFileName}</span>
            {buttonContent && (
              <Button
                color={buttonColor}
                inputType="button"
                onClick={() => inputRef.current?.click()}
                content={buttonContent}
              />
            )}
          </div>
        )}
      </Label>

      {/* note: for type="file", we don’t pass value/defaultValue */}
      <input key={elementKey || id} {...inputProps} ref={inputRef} />

      {hasErrors && errorMessage ? (
        <ErrorMessage id={getErrorElementId()} content={errorMessage} />
      ) : null}
    </div>
  );
};

export default InputField;
