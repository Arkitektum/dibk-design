// CheckBoxInput.tsx

import React from 'react';
import CheckBoxIcon from './CheckBoxIcon';
import asterisk from '../assets/svg/asterisk.svg?url';
import style from './CheckBoxInput.module.scss';

export interface CheckBoxInputProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredGroup?: boolean;
  id: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentOnly?: boolean;
  hasErrors?: boolean;
  checkmarkCharacter?: string;
  'aria-controls'?: string;
  'aria-describedby'?: string;
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
  name = '',
  onChange,
  contentOnly = false,
  hasErrors = false,
  checkmarkCharacter = '✔',
  tabIndex = 0,
  children,
  'aria-controls': ariaControls,
  'aria-describedby': ariaDescribedBy,
  value,
}: CheckBoxInputProps) => {
  const labelClassName = [
    style.checkBoxInput,
    contentOnly && style.contentOnly,
    disabled && style.disabled,
    hasErrors && style.hasErrors,
  ]
    .filter(Boolean)
    .join(' ');

  const iconProps = {
    checked,
    disabled,
    showBox: !contentOnly,
    hasErrors: contentOnly && hasErrors,
    checkmarkCharacter,
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id,
    name,
    type: 'checkbox',
    checked,
    disabled,
    required: required || requiredGroup,
    onChange,
    tabIndex,
    'aria-controls': ariaControls,
    'aria-invalid': hasErrors ? 'true' : undefined,
    'aria-describedby': ariaDescribedBy,
    value,
  };

  return (
    <label htmlFor={id} className={labelClassName}>
      {!contentOnly ? (
        <>
          <CheckBoxIcon {...iconProps} />
          <input {...inputProps} />
        </>
      ) : (
        <CheckBoxIcon {...iconProps} />
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

export default CheckBoxInput;
