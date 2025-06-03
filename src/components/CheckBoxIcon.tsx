import React from 'react';
import style from './CheckBoxIcon.module.scss';

export interface CheckBoxIconProps {
  size?: string;
  checked?: boolean;
  disabled?: boolean;
  showBox?: boolean;
  hasErrors?: boolean;
  checkmarkCharacter?: string;
}

const CheckBoxIcon = ({
  size = '20px',
  checked = false,
  disabled = false,
  showBox = true,
  hasErrors = false,
  checkmarkCharacter = '✔',
}) => {
  const inlineStyle: React.CSSProperties = {
    height: size,
    width: size,
    fontSize: size,
  };

  const className = [
    style.checkBoxIcon,
    checked && style.checked,
    disabled && style.disabled,
    showBox && style.showBox,
    hasErrors && style.hasErrors,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className} style={inlineStyle}>
      <span aria-hidden className={style.checkmark}>
        {checked ? checkmarkCharacter : ''}
      </span>
    </span>
  );
};

export default CheckBoxIcon;
