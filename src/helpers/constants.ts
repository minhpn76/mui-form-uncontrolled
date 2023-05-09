// regular expressions
export const REGEXP_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEXP_SG_MOBILE = /^(8|9)\d{7}$/;
export const REGEXP_SG_PHONE = /^(3|6|8|9)\d{7}$/;
export const REGEXP_PHONE = /^\d{5,}$/;

//
export const VALIDATION_MSG = {
  MANDATORY: 'This field is required.',
  EMAIL: 'Please enter valid email address.',
  MAX_LENGTH: 'You have exceeded the word limit.',
  MIN_LENGTH: 'You have to key in at least {0} characters.', //message not confirm yet
  MAX: '{0} cannot be greater than {1}.', //message not confirm yet
  MIN: '{0} cannot be less than {1}.', //message not confirm yet
  MOBILE_NO: 'Please enter a valid mobile number.',
  PHONE_NO: 'Please enter a valid contact number.',
  INVALID: 'This field is invalid.',
};
