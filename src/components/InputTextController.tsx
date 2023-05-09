import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { BaseCustomControllerProps } from '../helpers/types';
import { REGEXP_EMAIL } from '../helpers/constants';
import { buildErrorMessage, setMaxLengthPropsAndRules } from '../helpers/utils';

export interface InputTextControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseCustomControllerProps<TFieldValues, TName>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  isDigit?: boolean;
}

const InputTextController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  isDigit,
  rules: rulesRaw,
  shouldUnregister,
  ...inputTextProps
}: InputTextControllerProps<TFieldValues, TName>) => {
  const { label, inputProps, type } = inputTextProps;

  // update rules and maxLength
  const { rules, maxLength } = setMaxLengthPropsAndRules(rulesRaw, inputProps?.maxLength);

  // implement email in standard rules
  if (rules?.email) {
    rules.pattern = REGEXP_EMAIL;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const exceptedCharacters = ['e', 'E', '+', '-', '.'];
    if (type === 'number' && isDigit && exceptedCharacters.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Controller<TFieldValues, TName>
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState: { error } }) => {
        if (error?.type === 'pattern' && rules?.email) {
          // overwrite the error type for building error message in buildErrorMessage
          error.type = 'email';
        }
        const errorMessage = buildErrorMessage({ error, label, rules });

        return (
          <TextField
            {...field}
            {...inputTextProps}
            type={type}
            inputProps={{ maxLength }}
            error={!!errorMessage}
            color={errorMessage ? 'error' : 'primary'}
            helperText={errorMessage}
            onKeyDown={handleKeyDown}
          />
        );
      }}
    />
  );
};

export default InputTextController;
