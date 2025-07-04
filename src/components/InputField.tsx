// InputField.tsx

import React from 'react';
import Button from './Button';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import style from './InputField.module.scss';
import { classNameArrayToClassNameString } from '../functions/helpers';
import asterisk from '../assets/svg/asterisk.svg?url';

export interface InputFieldProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  width?: string;
  value?: any;
  defaultValue?: any;
  elementKey?: string;
  label?: React.ReactNode;
  contentOnly?: boolean;
  buttonColor?: 'primary' | 'secondary';
  buttonContent?: string;
  selectedFileName?: string;
  placeholder?: string;
  defaultContent?: string;
  min?: string;
  max?: string;
  role?: string;
  'aria-describedby'?: string;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
  noMargin?: boolean;
}

const InputField = ({
  id,
  onChange,
  onBlur,
  name = '',
  type = 'text',
  disabled = false,
  required = false,
  readOnly,
  width,
  value,
  defaultValue,
  elementKey,
  label = '',
  contentOnly = false,
  buttonColor = 'primary',
  buttonContent,
  selectedFileName,
  placeholder = '',
  defaultContent = '',
  min,
  max,
  role,
  'aria-describedby': ariaDescribedBy,
  'aria-autocomplete': ariaAutocomplete,
  hasErrors = false,
  errorMessage = '',
  noMargin = false,
}: InputFieldProps) => {
  const formatDate = (input: string) => {
    const date = new Date(input);
    return `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;
  };

  const renderValueAsText = (val: any, fallback: string) => {
    return type === 'date'
      ? val
        ? formatDate(val)
        : fallback
      : val || fallback;
  };

  const getErrorElementId = () => `${id}-errorMessage`;

  const styleRules: React.CSSProperties = width ? { maxWidth: width } : {};

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
    ...(value !== undefined
      ? { value }
      : defaultValue !== undefined
      ? { defaultValue }
      : {}),
    placeholder,
    className: hasErrors ? style.hasErrors : undefined,
    'aria-describedby':
      hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy,
    'aria-invalid': hasErrors ? 'true' : undefined,
    'aria-autocomplete': ariaAutocomplete || undefined,
    style: styleRules,
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
          <img src={asterisk} alt="" className={style.requiredSymbol} />
        )}
        {type === 'file' && (
          <div className={style.fileInputContainer}>
            <span className={style.input}>{selectedFileName}</span>
            {buttonContent && (
              <Button
                color={buttonColor}
                inputType="button"
                onClick={() => {
                  const el = document?.getElementById(id);
                  el?.click();
                }}
                content={buttonContent}
              />
            )}
          </div>
        )}
      </Label>

      {!contentOnly ? (
        <input key={elementKey || id} {...inputProps} />
      ) : (
        <span>{renderValueAsText(value ?? defaultValue, defaultContent)}</span>
      )}

      <ErrorMessage id={getErrorElementId()} content={errorMessage} />
    </div>
  );
};

export default InputField;
