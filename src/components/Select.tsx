import type React from "react";
import { useMemo } from "react";
import ReactSelect, { type MultiValue, type SingleValue } from "react-select";
import asterisk from "../assets/svg/asterisk.svg?url";
import { classNameArrayToClassNameString } from "../functions/helpers";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import style from "./Select.module.scss";

export type Option =
  | string
  | number
  | { key: string | number; value: string | number };

interface SelectPropsBase {
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Option[];
  width?: string;
  label?: React.ReactNode;
  keyAsContent?: boolean;
  placeholder?: string;
  placeholderValue?: string;
  defaultContent?: string;
  role?: string;
  "aria-describedby"?: string;
  hasErrors?: boolean;
  errorMessage?: React.ReactNode;

  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
}

export interface SingleSelectProps extends SelectPropsBase {
  multiple?: false;
  onChange: (value: string | number) => void;
  value?: string | number;
  defaultValue?: string | number;
}

export interface MultipleSelectProps extends SelectPropsBase {
  multiple: true;
  onChange: (value: (string | number)[]) => void;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

type SelectOption = {
  value: string | number;
  label: string;
};

const Select = (props: SelectProps) => {
  const {
    id,
    name = "",
    required = false,
    disabled = false,
    options = [],
    width,
    label = "",
    placeholder = "",
    defaultContent = "",
    role,
    "aria-describedby": ariaDescribedBy,
    hasErrors = false,
    errorMessage = "",

    backgroundColor,
    textColor,
    placeholderColor,
  } = props;

  const getErrorElementId = () => `${id}-errorMessage`;
  const isMulti = props.multiple === true;

  const selectOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "object"
          ? { value: option.value, label: String(option.key) }
          : { value: option, label: String(option) },
      ),
    [options],
  );

  const getOptionByValue = (value: string | number): SelectOption => {
    const match = selectOptions.find((opt) => opt.value === value);
    return match ?? { value, label: String(value) };
  };

  const toSelectValue = (
    value: string | number | (string | number)[] | undefined,
  ): SelectOption | SelectOption[] | null => {
    if (value === undefined) return null;
    if (Array.isArray(value)) return value.map(getOptionByValue);
    return getOptionByValue(value);
  };

  const placeholderText = placeholder || defaultContent || "";
  const containerStyle = {
    ...(width ? { maxWidth: width } : {}),
    ...(backgroundColor
      ? { ["--select-background" as string]: backgroundColor }
      : {}),
    ...(textColor ? { ["--select-text" as string]: textColor } : {}),
    ...(placeholderColor
      ? { ["--select-placeholder" as string]: placeholderColor }
      : {}),
  } as React.CSSProperties;

  const handleChange = (
    nextValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
  ) => {
    if (isMulti) {
      const values = (nextValue as MultiValue<SelectOption>).map(
        (opt) => opt.value,
      );
      if (props.multiple) props.onChange(values);
      return;
    }

    const selected = nextValue as SingleValue<SelectOption>;
    if (props.multiple) return;
    if (selected) {
      props.onChange(selected.value);
    }
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
        className={classNameArrayToClassNameString([style.selectContainer])}
        style={containerStyle}
        role={role}
      >
        <span className={style.selectListArrow} />

        <ReactSelect
          inputId={id}
          name={name}
          aria-describedby={
            hasErrors && errorMessage ? getErrorElementId() : ariaDescribedBy
          }
          aria-invalid={hasErrors || undefined}
          aria-required={required || undefined}
          isDisabled={disabled}
          isMulti={isMulti}
          isSearchable={false}
          closeMenuOnSelect={!isMulti}
          placeholder={placeholderText}
          onChange={handleChange}
          options={selectOptions}
          className={classNameArrayToClassNameString([
            hasErrors && style.hasErrors,
          ])}
          classNamePrefix="reactSelect"
          components={{
            IndicatorSeparator: () => null,
          }}
          {...(props.value !== undefined
            ? { value: toSelectValue(props.value) }
            : props.defaultValue !== undefined
              ? { defaultValue: toSelectValue(props.defaultValue) }
              : {})}
        />
      </div>

      <ErrorMessage id={getErrorElementId()} content={errorMessage} />
    </div>
  );
};

export default Select;
