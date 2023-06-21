import {Control, Controller, Path} from 'react-hook-form';
import TagsField from '../tags-field/TagsField';
import {TagsFieldProps} from '../tags-field/TagsField.types';

type FormTagsFieldProps<TFormValues extends object> = Omit<
  TagsFieldProps,
  'name' | 'onChange'
> & {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
};

const FormTagsField = <TFormValues extends object>(
  props: FormTagsFieldProps<TFormValues>
) => {
  const {control, name, helperText, ...restProps} = props;

  return (
    <Controller<TFormValues>
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <TagsField
          error={!!fieldState.error?.message}
          helperText={fieldState.error?.message || helperText}
          {...restProps}
          {...field}
        />
      )}
    />
  );
};
export default FormTagsField;
