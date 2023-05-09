import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { VALIDATION_MSG } from './constants';
import { ExtendedRules } from './types';

type BuildErrorMessageParam = {
  error?: FieldError;
  label?: ReactNode;
  rules?: ExtendedRules;
};

/**
 * Build validation error message
 */
export const buildErrorMessage = ({ error, rules, label }: BuildErrorMessageParam): any => {
  if (!error) {
    return;
  }
  let errorMessage = error.message;
  if (!errorMessage) {
    switch (error.type) {
      case 'required':
        errorMessage = VALIDATION_MSG.MANDATORY;
        break;
      case 'maxLength':
        errorMessage = VALIDATION_MSG.MAX_LENGTH;
        break;
      case 'minLength':
        errorMessage = format(VALIDATION_MSG.MIN_LENGTH, rules?.minLength);
        break;
      case 'max':
        errorMessage = format(VALIDATION_MSG.MAX, label, rules?.max);
        break;
      case 'min':
        errorMessage = format(VALIDATION_MSG.MIN, label, rules?.min);
        break;
      case 'email':
        errorMessage = VALIDATION_MSG.EMAIL;
        break;
      case 'pattern':
        errorMessage = VALIDATION_MSG.INVALID;
        break;
      default:
        break;
    }
  }
  return errorMessage;
};

/**
 * apply maxLength props or rules.maxLength by the other party
 */
export const setMaxLengthPropsAndRules = (rules?: ExtendedRules, maxLength?: number) => {
  // apply maxLength props by maxLength rules
  if (rules?.maxLength !== undefined && maxLength === undefined) {
    if (typeof rules.maxLength === 'number') {
      maxLength = rules.maxLength;
    } else {
      maxLength = rules.maxLength.value;
    }
  }
  // apply maxLength rules by maxLength props
  if (rules?.maxLength === undefined && maxLength !== undefined) {
    if (rules) {
      rules.maxLength = maxLength;
    } else {
      rules = { maxLength };
    }
  }

  return { ...{ rules }, maxLength };
};

/**
 * Simple format a string with given template and parameters
 * @param template eg. {0} is less than {1}.
 * @param args
 * @returns formated string
 */
export const format = (template: string, ...args: any[]) => {
  return args.reduce((prev, curr, index) => prev.replace(`{${index}}`, curr), template);
};
