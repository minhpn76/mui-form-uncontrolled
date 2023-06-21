import {TextFieldProps} from '@mui/material';

export type TagsFieldProps = Omit<
  TextFieldProps,
  'variant' | 'onChange' | 'onBlur' | 'value' | 'defaultValue'
> & {
  defaultValue?: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
};
