export type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  form?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(
  name: string,
  email: string,
  password: string,
  confirm: string,
): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_REGEX.test(email.trim()))
    errors.email = "That doesn't look like a valid email.";
  if (!password) errors.password = "Create a password.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  if (!confirm) errors.confirm = "Re-enter your password.";
  else if (confirm !== password) errors.confirm = "Passwords don't match.";
  return errors;
}
