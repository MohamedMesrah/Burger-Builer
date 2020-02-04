export function validateChange(input, rules) {
  let isValid = true;
  let errors = [];

  if (rules.required) isValid = input.value.trim() !== "";
  !isValid && errors.push("This field is required");

  if (rules.min) isValid = input.value.trim().length >= rules.min && isValid;
  !isValid && errors.push(`The mininum length is ${rules.min}`);

  if (rules.max) isValid = input.value.trim().length <= rules.max && isValid;
  !isValid && errors.push(`The maximum length is ${rules.max}`);

  const regex = /^[a-z][a-z0-9.]*[@][a-z]+[.][a-z]+/i;
  if (rules.email) isValid = regex.test(input.value) && isValid;
  !isValid && errors.push(`Invalid email`);

  return errors;
}
