import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
  FormHelperText,
  InputLabel,
} from '@mui/material';

export type FormControlProps = Omit<
  MuiFormControlProps,
  'classes' | 'component' | 'hiddenLabel' | 'margin' | 'label'
> & {
  label?: string;
  helperText?: string;
  warning?: boolean;
};

const FormControl = (props: FormControlProps) => {
  const { label, helperText, color, warning, children, ...restProps } = props;

  return (
    <MuiFormControl color={warning ? 'warning' : color} {...restProps}>
      {label && (
        <InputLabel
          shrink
          sx={{
            color: warning ? 'yellow' : color,
          }}
        >
          {label}
        </InputLabel>
      )}
      {children}
      {helperText && (
        <FormHelperText
          sx={{
            color: warning ? 'yellow' : color,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </MuiFormControl>
  );
};

export default FormControl;
