import type React from "react";
import asterisk from "../assets/svg/asterisk.svg?url";
import { generateRandomString } from "../functions/generators";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import style from "./Textarea.module.scss";

export interface TextareaProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  resize?: "both" | "horizontal" | "vertical" | "none";
  value?: string;
  defaultValue?: string;
  elementKey?: string;
  rows?: string;
  label?: React.ReactNode;
  placeholder?: string;
  "aria-describedby"?: string;
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
}

const Textarea = ({
  id,
  onChange,
  onBlur,
  name = "",
  required = false,
  readOnly,
  disabled,
  width,
  resize = "both",
  value,
  defaultValue,
  elementKey,
  rows,
  label = "",
  placeholder = "",
  "aria-describedby": ariaDescribedBy,
  hasErrors = false,
  errorMessage = "",
}: TextareaProps) => {
  const getErrorElementId = () => `${id}-errorMessage`;

  const finalValue =
    !value?.length && defaultValue?.length ? defaultValue : undefined;
  const key = elementKey || `${id}-${generateRandomString(6)}`;

  const styleRules: React.CSSProperties = {
    ...(width && { maxWidth: width }),
    ...(resize && { resize }),
  };

  const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    name,
    readOnly,
    disabled,
    required,
    id,
    onChange,
    onBlur,
    value: finalValue ? undefined : value,
    defaultValue: finalValue || undefined,
    placeholder,
    rows: rows ? parseInt(rows, 10) : undefined,
    className: hasErrors ? style.hasErrors : "",
    "aria-describedby":
      hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy,
    "aria-invalid": hasErrors ? "true" : undefined,
    style: styleRules,
  };

  return (
    <div className={style.textarea}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <img src={asterisk} alt="" className={style.requiredSymbol} />
        )}
      </Label>
      <textarea key={key} {...textareaProps} />
      <ErrorMessage id={getErrorElementId()} content={errorMessage} />
    </div>
  );
};

export default Textarea;
