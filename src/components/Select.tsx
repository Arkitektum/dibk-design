import React, { useCallback, useEffect, useRef, useState } from 'react';

import ErrorMessage from './ErrorMessage';
import CheckBoxList from './CheckBoxList';
import CheckBoxListItem from './CheckBoxListItem';
import asterisk from '../assets/svg/asterisk.svg?url';
import {
  addFocusTrapInsideElement,
  classNameArrayToClassNameString,
} from '../functions/helpers';
import style from './Select.module.scss';
import Label from './Label';

export type Option =
  | string
  | number
  | { key: string | number; value: string | number };

export interface SelectProps {
  id: string;
  onChange: (value: any) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  options?: Option[];
  width?: string;
  value?: any;
  defaultValue?: any;
  label?: React.ReactNode;
  contentOnly?: boolean;
  keyAsContent?: boolean;
  placeholder?: string;
  placeholderValue?: string;
  defaultContent?: string;
  role?: string;
  'aria-describedby'?: string;
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;
}

const Select = ({
  id,
  onChange,
  name = '',
  required = false,
  disabled = false,
  multiple = false,
  options = [],
  width,
  value,
  defaultValue,
  label = '',
  contentOnly = false,
  keyAsContent = false,
  placeholder = '',
  placeholderValue = '',
  defaultContent = '',
  role,
  'aria-describedby': ariaDescribedBy,
  hasErrors = false,
  errorMessage = '',
}: SelectProps) => {
  const [showDropdownList, setShowDropdownList] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const focusTrapRef = useCallback((element: HTMLElement | null) => {
    if (element) addFocusTrapInsideElement(element);
  }, []);

  const hideDropdownList = () => setShowDropdownList(false);

  useEffect(() => {
    const keyDownFunction = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hideDropdownList();
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        hideDropdownList();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, []);

  const getKeyByValue = (value: any, options: Option[]) => {
    const selected = options.find((opt) =>
      typeof opt === 'object' ? opt.value === value : opt === value
    );
    return typeof selected === 'object'
      ? selected.key ?? selected.value
      : selected;
  };

  const createOptionObject = (option: Option) =>
    typeof option === 'object'
      ? { key: option.key, value: option.value }
      : { key: option, value: option };

  const renderSelectedValues = () =>
    (defaultValue || value)
      ?.map((v: any) => getKeyByValue(v, options))
      .join(', ') || null;

  const handleMultipleChange = (changedValue: string | number) => {
    const currentValues: (string | number)[] =
      (value as any) ?? (defaultValue as any) ?? [];
    const newValues = currentValues.includes(changedValue)
      ? currentValues.filter((v) => v !== changedValue)
      : [...currentValues, changedValue];
    onChange(newValues);
  };

  const renderCheckBoxElements = () =>
    options.map((option, index) => {
      const { key, value: val } = createOptionObject(option);
      const selected = (defaultValue || value || []).includes(val);
      return (
        <CheckBoxListItem
          key={index}
          id={`${id}-${index}`}
          value={val}
          checked={selected}
          onChange={() => handleMultipleChange(val)}
        >
          {key}
        </CheckBoxListItem>
      );
    });

  const getErrorElementId = () => `${id}-errorMessage`;

  if (contentOnly) {
    const current = defaultValue || value || null;
    return (
      <div className={style.select}>
        <Label htmlFor={id}>{label}</Label>
        <span>
          {current
            ? keyAsContent
              ? getKeyByValue(current, options)
              : current
            : defaultContent}
        </span>
      </div>
    );
  }

  const selectProps: React.SelectHTMLAttributes<HTMLSelectElement> = {
    name,
    multiple,
    required,
    disabled,
    onChange: (e) => onChange(e.target.value),
    id,
    role,

    className: classNameArrayToClassNameString([
      hasErrors && style.hasErrors,
      multiple && style.multiple,
    ]),
    'aria-describedby':
      hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy,
    'aria-invalid': hasErrors || undefined,
    style: width ? { maxWidth: width } : undefined,
    ...(defaultValue !== undefined && value === undefined
      ? { defaultValue }
      : { value: value || '' }),
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
        className={style.selectContainer}
        style={width ? { maxWidth: width } : undefined}
      >
        <span className={style.selectListArrow}></span>
        {multiple ? (
          <div ref={dropdownRef}>
            <div
              onClick={() => setShowDropdownList(!showDropdownList)}
              className={style.multipleSelectElement}
            >
              {renderSelectedValues()}
            </div>
            {showDropdownList && (
              <div ref={focusTrapRef} className={style.multipleSelectDropdown}>
                <CheckBoxList compact>{renderCheckBoxElements()}</CheckBoxList>
              </div>
            )}
          </div>
        ) : (
          <select {...selectProps}>
            {placeholder && (
              <option value={placeholderValue} disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const { key, value } = createOptionObject(opt);
              return (
                <option key={key} value={value}>
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
