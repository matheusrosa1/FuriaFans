export function validatePassword(password: string): string | null {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return `A senha deve ter pelo menos ${minLength} caracteres.`;
  }

  if (!hasLetter.test(password)) {
    return "A senha deve conter pelo menos uma letra.";
  }

  if (!hasNumber.test(password)) {
    return "A senha deve conter pelo menos um número.";
  }

  if (!hasSpecialChar.test(password)) {
    return "A senha deve conter pelo menos um caractere especial (!@#$%^&* etc.).";
  }

  return null;
}
