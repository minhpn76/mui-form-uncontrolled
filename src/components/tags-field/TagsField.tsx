import {
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import {
  Chip,
  TextField,
  Box,
  styled,
  inputBaseClasses,
  chipClasses,
} from '@mui/material';
import {TagsFieldProps} from './TagsField.types';

const StyledTagsField = styled(TextField)({
  [`.${inputBaseClasses.root}`]: {
    paddingLeft: 0,
  },
});

const StyledValues = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [`:has(.${chipClasses.root})`]: {
    padding: theme.spacing(1),
  },
  [`.${chipClasses.root}`]: {
    padding: theme.spacing(0, 1.5),
    backgroundColor: theme.palette.success[50],
    color: theme.palette.interaction?.main,
  },
}));

const TagsField = (
  props: TagsFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {defaultValue, value, onChange, ...restProps} = props;

  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  const [singleValue, setSingleValue] = useState<string>('');

  useEffect(() => {
    if (value) return;
    setSelectedValues(defaultValue || []);
  }, [defaultValue]);

  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSingleValue(event.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let values = [...selectedValues];
    if (event.keyCode === 13 && singleValue !== '') {
      values = [...values, singleValue];
      setSelectedValues(values);
      setSingleValue('');
    }
    if ([8, 46].includes(event.keyCode)) {
      values = values.splice(0, values.length - 1);
      setSelectedValues(values);
    }
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <StyledTagsField
      inputRef={ref}
      value={singleValue}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      InputProps={{
        startAdornment: (
          <StyledValues>
            {selectedValues.map((data, index) => {
              return <Chip key={index} size="24" label={data} />;
            })}
          </StyledValues>
        ),
      }}
      {...restProps}
    />
  );
};

export default forwardRef(TagsField);
