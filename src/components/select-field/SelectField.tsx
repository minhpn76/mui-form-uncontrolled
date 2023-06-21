import { useCallback, useEffect, useMemo, useState, ForwardedRef, forwardRef } from 'react';
import clone from 'lodash-es/clone';
import {
  Box,
  IconButton,
  ListSubheader,
  MenuItem,
  MenuProps,
  Select,
  SelectChangeEvent,
  Typography,
  menuItemClasses,
  styled,
} from '@mui/material';

import AngleDownIcon from '../../icons/AngleDown';
import CheckIcon from '../../icons/Check';
import FormControl from '../form-control/FormControl';
import { SelectFieldProps, SelectOption, SelectOptionValue } from './SelectField.types';
import Multiply from '../../icons/Multiply';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  gap: theme.spacing(2),
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: '#ccc',
  },
}));

const GroupHeader = styled(ListSubheader)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
}));

const selectMenuProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  sx: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
  },
} as Partial<MenuProps>;

// eslint-disable-next-line react-refresh/only-export-components
function SelectField<TOption extends object>(
  props: SelectFieldProps<SelectOptionValue, TOption>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    color,
    disabled,
    error,
    focused,
    fullWidth,
    required,
    size,
    sx,
    variant,
    label,
    placeholder,
    warning,
    helperText: helpText,
    multiple,
    options = [],
    defaultValue,
    value,
    name,
    clearable = true,
    children,
    renderValue,
    renderOption,
    groupBy,
    onTransform,
    onChange,
    ...restProps
  } = props;

  const emptyValue = useMemo(() => {
    if (multiple) {
      return [] as SelectOptionValue[];
    }

    return '' as SelectOptionValue;
  }, [multiple]);

  const [internalValue, setInternalValue] = useState<SelectOptionValue | SelectOptionValue[]>(emptyValue);

  const transformedOptions = useMemo(() => {
    let results: SelectOption<SelectOptionValue, TOption>[] = [];

    if (onTransform) {
      results = options.map(x => {
        const transformedOption = onTransform(x);
        transformedOption.origin = clone(x);
        return transformedOption;
      });
    } else {
      results = options.map(x => {
        const transformedOption = x as SelectOption<SelectOptionValue, TOption>;
        transformedOption.origin = clone(x);
        return transformedOption;
      });
    }

    return results;
  }, [options, onTransform]);

  const transformedGroupedOptions = useMemo(() => {
    let results: undefined | { [group: string]: SelectOption<SelectOptionValue, TOption>[] } = undefined;

    if (!groupBy) return results;

    results = transformedOptions.reduce((prev, current) => {
      const groupName = groupBy(current.origin!);

      prev[groupName] = prev[groupName] ?? [];
      prev[groupName].push(current);

      return prev;
    }, {} as { [group: string]: SelectOption<SelectOptionValue, TOption>[] });

    return results;
  }, [transformedOptions, groupBy]);

  const transformValue = useCallback(
    (optionValue?: string | SelectOptionValue | SelectOptionValue[]) => {
      let val = emptyValue;

      if (Array.isArray(optionValue)) {
        val = transformedOptions.filter(x => optionValue.some(y => y === x.value)).map(x => x.value);
      } else {
        val = transformedOptions.find(x => x.value === optionValue)?.value || emptyValue;
      }

      return val;
    },
    [transformedOptions, emptyValue]
  );

  const isOptionSelected = useCallback(
    (optionValue?: SelectOptionValue) => {
      if (!optionValue) return false;

      if (Array.isArray(internalValue)) {
        return internalValue.indexOf(optionValue) > -1;
      }

      return internalValue === optionValue;
    },
    [internalValue]
  );

  useEffect(() => {
    if (value) return;

    const transformedValue = transformValue(defaultValue);
    setInternalValue(transformedValue);
  }, [defaultValue, transformValue]);

  useEffect(() => {
    const transformedValue = transformValue(value);
    setInternalValue(transformedValue);
  }, [value, transformValue]);

  const valueRenderer = useCallback(
    (optionValue: SelectOptionValue, addSeparator?: boolean) => {
      const option = transformedOptions.find(x => x.value === optionValue);

      if (!option) return null;

      if (renderValue) {
        return (
          <Box key={option.value} display="inline-flex" maxWidth="100%" overflow="hidden">
            {renderValue(option.origin)}
            {addSeparator && <Typography>, </Typography>}
          </Box>
        );
      }

      return (
        <Box key={option.value} display="inline-flex" maxWidth="100%" overflow="hidden">
          <Typography>{option.label}</Typography>
          {addSeparator && <Typography>, </Typography>}
        </Box>
      );
    },
    [transformedOptions, renderValue]
  );

  const optionRenderer = useCallback(
    (option: SelectOption<SelectOptionValue, TOption>) => {
      const selected = isOptionSelected(option.value);

      return (
        <StyledMenuItem key={option.value} value={option.value} sx={{ display: 'flex' }}>
          {renderOption ? renderOption(option.origin) : <Typography>{option.label}</Typography>}
          {selected && <CheckIcon sx={{ marginLeft: 'auto' }} />}
        </StyledMenuItem>
      );
    },
    [isOptionSelected, renderOption]
  );

  const optionsRenderer = useCallback(() => {
    return groupBy && transformedGroupedOptions
      ? Object.keys(transformedGroupedOptions).map(x => {
          return [
            <GroupHeader key={x}>
              <Typography color="interaction.main" fontWeight={700} textTransform="capitalize">
                {x} ({transformedGroupedOptions[x].length})
              </Typography>
            </GroupHeader>,
            [...transformedGroupedOptions[x].map(optionRenderer)],
          ];
        })
      : transformedOptions.map(optionRenderer);
  }, [groupBy, internalValue, transformedOptions, transformedGroupedOptions]);

  const handleRenderValue = useCallback(
    (optionValue: SelectOptionValue | SelectOptionValue[]) => {
      const isArray = Array.isArray(optionValue);

      if (!optionValue || (isArray && optionValue.length === 0)) {
        return (
          placeholder && (
            <Typography color="system.placeholder" overflow="hidden">
              {placeholder}
            </Typography>
          )
        );
      } else {
        if (isArray) {
          return optionValue.map((x, index) => valueRenderer(x, index < optionValue.length - 1));
        } else {
          return valueRenderer(optionValue);
        }
      }
    },
    [valueRenderer]
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<SelectOptionValue | SelectOptionValue[]>) => {
      const actualValue = transformValue(event.target.value);

      setInternalValue(actualValue);
      onChange?.({ target: { name: name || '', value: actualValue } });
    },
    [transformValue, onChange]
  );

  const handleClearValue = useCallback(
    (_: React.MouseEvent<HTMLButtonElement>) => {
      setInternalValue(emptyValue);
      onChange?.({ target: { name: name || '', value: emptyValue } });
    },
    [name, emptyValue, onChange]
  );

  return (
    <FormControl
      color={color}
      disabled={disabled}
      warning={warning}
      error={error}
      focused={focused}
      fullWidth={fullWidth}
      required={required}
      size={size}
      sx={sx}
      variant={variant}
      label={label}
      helperText={helpText}
    >
      <Select
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        IconComponent={AngleDownIcon}
        MenuProps={selectMenuProps}
        multiple={multiple}
        value={internalValue}
        onChange={handleChange}
        renderValue={handleRenderValue}
        inputRef={ref}
        endAdornment={
          clearable &&
          internalValue !== emptyValue &&
          !disabled && (
            <IconButton size="medium" sx={{ marginLeft: 'auto', color: 'transparent' }} onClick={handleClearValue}>
              <Multiply />
            </IconButton>
          )
        }
        {...restProps}
      >
        {optionsRenderer()}
        {children}
      </Select>
    </FormControl>
  );
}

export default forwardRef(SelectField);
