// InputField.tsx

import type React from "react";
import { useRef } from "react";
import { asteriskIcon } from "../icons";
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
  actionButtonColor?: "primary" | "secondary";

  actionButtonContent?: string;
  actionButtonIconLeft?: React.ReactNode;
  actionButtonIconRight?: React.ReactNode;
  actionButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  actionButtonDisabled?: boolean;
  actionButtonAriaLabel?: string;
  selectedFileName?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  role?: string;
  "aria-describedby"?: string;
  "aria-autocomplete"?: "none" | "inline" | "list" | "both";
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
  noMargin?: boolean;
  caption?: React.ReactNode;
}

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
  actionButtonColor = "secondary",
  actionButtonContent,
  actionButtonIconLeft,
  actionButtonIconRight,
  actionButtonOnClick,
  actionButtonDisabled = false,
  actionButtonAriaLabel,
  selectedFileName,
  placeholder = "",
  min,
  max,
  role,
  "aria-describedby": ariaDescribedBy,
  "aria-autocomplete": ariaAutocomplete,
  hasErrors = false,
  errorMessage = "",
  noMargin = false,
  caption,
}: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const getErrorElementId = () => `${id}-errorMessage`;
  const captionId = `${id}-caption`;
  const styleRules: React.CSSProperties = width ? { maxWidth: width } : {};
  const isDateInput = type === "date" && !disabled && !readOnly;
  const isFileInput = type === "file";
  const hasActionButton =
    Boolean(actionButtonContent) &&
    Boolean(actionButtonOnClick) &&
    !isFileInput;
  const fileButtonContent = actionButtonContent || "Velg fil";

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
  const handleFileClick = () => {
    if (!isFileInput) return;
    if (disabled) return;
    inputRef.current?.click();
  };
  const handleFileKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isFileInput || disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  /** Build value/defaultValue safely for the given type */
  const normalizedValueProps = (() => {
    if (isFileInput) return {};
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
    type === "date" && style.dateInput,
    isFileInput && style.visuallyHidden,
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
    placeholder: isFileInput ? undefined : placeholder,
    className: inputClassName || undefined,
    "aria-describedby":
      [
        hasErrors && errorMessage ? getErrorElementId() : null,
        caption ? captionId : null,
        ariaDescribedBy,
      ]
        .filter(Boolean)
        .join(" ")
        .trim() || undefined,
    "aria-invalid": hasErrors || undefined,
    "aria-autocomplete": isTextLike(type) ? ariaAutocomplete : undefined,
    style: hasActionButton ? undefined : styleRules,
    ...normalizedValueProps,
  };

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
          <img src={asteriskIcon} alt="" className={style.requiredSymbol} />
        )}
        {isFileInput && (
          // biome-ignore lint/a11y/useSemanticElements: <to do later sorry>
          <div
            className={style.fileInputContainer}
            onClick={handleFileClick}
            onKeyDown={handleFileKeyDown}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled || undefined}
          >
            <span className={style.input}>{selectedFileName}</span>
            <Button
              color={actionButtonColor}
              inputType="button"
              onClick={() => inputRef.current?.click()}
              content={fileButtonContent}
              disabled={disabled || actionButtonDisabled}
              aria-label={actionButtonAriaLabel}
            />
          </div>
        )}
      </Label>

      {/* note: for type="file", we don’t pass value/defaultValue */}
      {hasActionButton ? (
        <div className={style.inputWithButton} style={styleRules}>
          <input key={elementKey || id} {...inputProps} ref={inputRef} />

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
        <input key={elementKey || id} {...inputProps} ref={inputRef} />
      )}
      {caption ? (
        <p className={style.caption} id={captionId}>
          {caption}
        </p>
      ) : null}
      {hasErrors && errorMessage ? (
        <ErrorMessage id={getErrorElementId()} content={errorMessage} />
      ) : null}
    </div>
  );
};

export default InputField;
