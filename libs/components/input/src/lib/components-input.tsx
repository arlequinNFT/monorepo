import { ReactElement } from 'react';
import {
  FieldError,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';

import styles from './components-input.module.scss';

interface ComponentsInputProps {
  changed?: (value: string) => any;
  className?: string;
  controls?: RegisterOptions;
  disabled?: boolean;
  errorMessage?: string | undefined;
  id: string;
  isOnError?: FieldError | undefined;
  label?: string;
  leftElement?: ReactElement;
  loading?: boolean;
  max?: number;
  min?: number;
  mode?: 'primary' | 'secondary';
  placeholder?: string;
  rightElement?: string;
  size?: 'md' | 'lg' | 'xl';
  type: 'email' | 'text' | 'tel' | 'number' | 'password' | 'range';
  value?: string | number | readonly string[] | undefined;
}

export const ComponentsInput = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changed = () => {},
  className,
  controls,
  disabled = false,
  id,
  label,
  leftElement,
  loading = false,
  max,
  min,
  mode = 'secondary',
  placeholder,
  rightElement,
  size = 'md',
  type,
  value = undefined,
}: ComponentsInputProps) => {
  const formMethods = useFormContext();

  let sizeStyle = '';
  switch (size) {
    case 'md':
      sizeStyle = 'py-1';
      break;
    case 'lg':
      sizeStyle = 'py-2';
      break;
    case 'xl':
      sizeStyle = 'py-3';
      break;
  }

  let labelStyle = '';
  let inputStyle = '';
  switch (mode) {
    case 'primary':
      labelStyle = 'text-black';
      inputStyle =
        'text-black bg-gray-200 hover:bg-gray-100 placeholder-gray-300';
      break;
    case 'secondary':
      labelStyle = 'text-white';
      inputStyle =
        'text-white bg-black-500 hover:bg-black-400  placeholder-black-600 ';
      break;
  }

  const input = (
    <>
      {label && (
        <label htmlFor={id} className={labelStyle}>
          {label}
        </label>
      )}
      <div className={`relative flex items-center ${className}`}>
        {leftElement && (
          <span className={`absolute px-2 text-white`}>{leftElement}</span>
        )}
        <input
          {...(formMethods?.register(id, controls) || null)}
          className={`
            w-full
            transition-all
            ${inputStyle}
            ${sizeStyle}
            ${type !== 'range' ? 'rounded-lg' : styles.range}
            ${disabled ? 'cursor-not-allowed' : ''}
            ${leftElement ? 'px-7' : 'px-2'}
          `}
          disabled={disabled || loading}
          id={id}
          max={max}
          min={min}
          name={id}
          value={value}
          onChange={(e) => changed(e.target.value)}
          placeholder={placeholder}
          type={type}
        />
        {rightElement && (
          <span className={`absolute px-2 right-0 text-white`}>
            {rightElement}
          </span>
        )}
      </div>
      {formMethods?.formState.errors[id] && (
        <small className="text-pink">
          {formMethods?.formState.errors[id].message}
        </small>
      )}
    </>
  );
  return input;
};
