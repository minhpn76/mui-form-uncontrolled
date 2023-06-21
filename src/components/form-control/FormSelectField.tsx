import { Control, Controller, Path } from 'react-hook-form';
import { SelectFieldProps, SelectOptionValue } from '../select-field/SelectField.types';
import SelectField from '../select-field/SelectField';

type FormSelectFieldProps<TFormValues extends object, TSelectOption extends object> = Omit<
  SelectFieldProps<SelectOptionValue, TSelectOption>,
  'name'
> & {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
};

const FormSelectField = <TFormValues extends object, TSelectOption extends object>(
  props: FormSelectFieldProps<TFormValues, TSelectOption>
) => {
  const { control, name, helperText, ...restProps } = props;

  return (
    <Controller<TFormValues>
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectField
          error={!!fieldState.error?.message}
          helperText={fieldState.error?.message || helperText}
          {...restProps}
          {...field}
        />
      )}
    />
  );
};

export default FormSelectField;
