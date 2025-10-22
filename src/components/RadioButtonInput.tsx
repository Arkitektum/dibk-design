// RadioButtonInput.tsx

import type React from "react";
import asterisk from "../assets/svg/asterisk.svg?url";
import RadioButtonIcon from "./RadioButtonIcon";
import style from "./RadioButtonInput.module.scss";

export interface RadioButtonInputProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredGroup?: boolean;
  id: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentOnly?: boolean;
  hasErrors?: boolean;
  inputValue: string;
  tabIndex?: number;
  children?: React.ReactNode;
  "aria-controls"?: string;
  "aria-describedby"?: string;
}

const RadioButtonInput = ({
  checked = false,
  disabled = false,
  required = false,
  requiredGroup = false,
  id,
  name = "",
  onChange,
  contentOnly = false,
  hasErrors = false,
  inputValue,
  tabIndex,
  children,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
}: RadioButtonInputProps) => {
  const labelClassName = [
    style.radioButtonInput,
    checked && style.checked,
    disabled && style.disabled,
    hasErrors && style.hasErrors,
  ]
    .filter(Boolean)
    .join(" ");

  const iconProps = {
    checked,
    disabled,
    hasErrors: !contentOnly && hasErrors,
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id,
    name,
    type: "radio",
    value: inputValue,
    checked,
    disabled,
    required: required || requiredGroup,
    onChange,
    tabIndex: tabIndex ?? undefined,
    "aria-controls": ariaControls,
    "aria-invalid": hasErrors ? "true" : undefined,
    "aria-describedby": ariaDescribedBy,
  };

  return (
    <label htmlFor={id} className={labelClassName}>
      {!contentOnly && (
        <>
          <RadioButtonIcon {...iconProps} />
          <input {...inputProps} />
        </>
      )}
      <span className={style.labelText}>
        {children}
        {required && (
          <img src={asterisk} alt="" className={style.requiredSymbol} />
        )}
      </span>
    </label>
  );
};

export default RadioButtonInput;
