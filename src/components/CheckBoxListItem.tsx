// CheckBoxListItem.tsx

import React from 'react';
import CheckBoxInput from './CheckBoxInput';
import { classNameArrayToClassNameString } from '../functions/helpers';
import style from './CheckBoxListItem.module.scss';

export interface CheckBoxListItemProps {
  value?: string | number;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredGroup?: boolean;
  name?: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentOnly?: boolean;
  compact?: boolean;
  checkmarkCharacter?: string;
  hasErrors?: boolean;
  'aria-controls'?: string;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}

const CheckBoxListItem = ({
  checked = false,
  disabled = false,
  required = false,
  requiredGroup = false,
  id,
  name = '',
  onChange,
  contentOnly = false,
  compact = false,
  hasErrors = false,
  checkmarkCharacter = '✔',
  'aria-controls': ariaControls,
  'aria-describedby': ariaDescribedBy,
  children,
  value,
}: CheckBoxListItemProps) => {
  const className = classNameArrayToClassNameString([
    style.checkBoxListItem,
    checked && style.checked,
    disabled && style.disabled,
    compact && style.compact,
    contentOnly && style.contentOnly,
    hasErrors && style.hasErrors,
  ]);

  const inputProps = {
    onChange: onChange ?? (() => {}),
    checked,
    disabled,
    required,
    requiredGroup,
    contentOnly,
    hasErrors,
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    id,
    name,
    checkmarkCharacter,
    value,
  };

  return (
    <div className={className}>
      <CheckBoxInput {...inputProps}>{children}</CheckBoxInput>
    </div>
  );
};

export default CheckBoxListItem;
