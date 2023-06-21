import { ReactNode } from 'react';
import { SelectProps } from '@mui/material';

import InputEvent from '../../@types/view-models/inputEvent';
import { FormControlProps } from '../form-control/FormControl';

export type SelectOptionValue = string | number;

export type SelectOption<TValue extends SelectOptionValue, TOption extends object> = {
  label?: string;
  value: TValue;
  origin?: TOption;
};

export type SelectFieldProps<TValue extends SelectOptionValue, TOption extends object> = Omit<
  FormControlProps,
  'children' | 'onChange'
> &
  Omit<SelectProps<TValue | TValue[]>, 'defaultValue' | 'displayEmpty' | 'MenuProps' | 'renderValue' | 'onChange'> & {
    options?: TOption[];
    defaultValue?: string | TValue | TValue[];
    clearable?: boolean;
    renderValue?: (option?: TOption) => ReactNode;
    renderOption?: (option?: TOption) => ReactNode;
    groupBy?: (option: TOption) => string;
    onTransform?: ((option: TOption) => SelectOption<TValue, TOption>) | undefined;
    onChange?: (event: InputEvent<TValue | TValue[]>) => void;
  };
