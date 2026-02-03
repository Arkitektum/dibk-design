// CheckBoxInput.tsx

import type React from "react";
import { asteriskIcon, checkmarkSymbolIcon } from "../icons";
import CheckBoxIcon from "./CheckBoxIcon";
import style from "./CheckBoxInput.module.scss";

export interface CheckBoxInputProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredGroup?: boolean;
  id: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasErrors?: boolean;
  checkmarkCharacter?: string;
  "aria-controls"?: string;
  "aria-describedby"?: string;
  tabIndex?: number;
  children?: React.ReactNode;
  value?: string | number;
}

const CheckBoxInput = ({
  checked = false,
  disabled = false,
  required = false,
  requiredGroup = false,
  id,
  name = "",
  onChange,
  hasErrors = false,
  checkmarkCharacter = "✔",
  tabIndex = 0,
  children,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
  value,
}: CheckBoxInputProps) => {
  const labelClassName = [
    style.checkBoxInput,
    disabled && style.disabled,
    hasErrors && style.hasErrors,
  ]
    .filter(Boolean)
    .join(" ");

  const iconProps = {
    checked,
    disabled,
    showBox: true,
    hasErrors,
    checkmarkCharacter,
    checkmarkIconSrc: checkmarkSymbolIcon,
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id,
    name,
    type: "checkbox",
    checked,
    disabled,
    required: required || requiredGroup,
    onChange,
    tabIndex,
    "aria-controls": ariaControls,
    "aria-invalid": hasErrors ? "true" : undefined,
    "aria-describedby": ariaDescribedBy,
    value,
  };

  return (
    <label htmlFor={id} className={labelClassName}>
      <CheckBoxIcon {...iconProps} />
      <input {...inputProps} />
      <span className={style.labelText}>
        {children}
        {required && (
          <img src={asteriskIcon} alt="" className={style.requiredSymbol} />
        )}
      </span>
    </label>
  );
};

export default CheckBoxInput;
