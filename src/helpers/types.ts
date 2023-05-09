import { ControllerProps, FieldPath, FieldValues, Message, UseControllerProps, ValidationRule } from 'react-hook-form';

/**
 * Base props for custom controler component
 */
export interface BaseCustomControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render' | 'control' | 'rules'>,
    // make 'control' mandatory
    Required<Pick<ControllerProps<TFieldValues, TName>, 'control'>> {
  /**
   * standard react hook form rules + custom rules
   */
  'data-testid'?: string;
  rules?: ExtendedRules;
}

/**
 * Extra validation rules attached to the standard react hook form rules
 */
export type ExtendedRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /** email is applicable for InputTextController only */
  email?: Message | ValidationRule<boolean>;
} & StandardRules<TFieldValues, TName>;

/**
 * Standard rules, extract from UseControllerProps
 */
type StandardRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName>['rules'];
