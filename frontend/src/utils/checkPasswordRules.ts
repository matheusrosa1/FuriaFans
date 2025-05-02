export function checkPasswordRules(password: string) {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return {
    minLength: password.length >= minLength,
    hasLetter: hasLetter.test(password),
    hasNumber: hasNumber.test(password),
    hasSpecialChar: hasSpecialChar.test(password),
  };
}
