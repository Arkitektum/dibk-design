import RadioButtonInput from './RadioButtonInput';
import { classNameArrayToClassNameString } from '../functions/helpers';
import style from './RadioButtonListItem.module.scss';

export interface RadioButtonListItemProps {
  inputValue: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  requiredGroup?: boolean;
  name?: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
  hasErrors?: boolean;
  'aria-controls'?: string;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}

const RadioButtonListItem = ({
  inputValue,
  checked = false,
  disabled = false,
  required = false,
  requiredGroup = false,
  name = '',
  id,
  onChange,
  compact = false,
  hasErrors = false,
  'aria-controls': ariaControls,
  'aria-describedby': ariaDescribedBy,
  children,
}: RadioButtonListItemProps) => {
  const className = classNameArrayToClassNameString([
    style.radioButtonListItem,
    checked && style.checked,
    disabled && style.disabled,
    compact && style.compact,
    hasErrors && style.hasErrors,
  ]);

  const inputProps = {
    onChange,
    inputValue,
    checked,
    disabled,
    required,
    requiredGroup,
    hasErrors,
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    id,
    name,
  };

  return (
    <div className={className}>
      <RadioButtonInput {...inputProps}>{children}</RadioButtonInput>
    </div>
  );
};

export default RadioButtonListItem;
