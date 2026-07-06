export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateFullName = (name) => {
  if (!name || !name.trim()) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return '';
  if (!/^\+?[\d\s-()]{7,15}$/.test(phone)) return 'Invalid phone number';
  return '';
};

export const validateLoginForm = (values) => ({
  email: validateEmail(values.email),
  password: validatePassword(values.password),
});

export const validateRegisterForm = (values) => ({
  fullName: validateFullName(values.fullName),
  email: validateEmail(values.email),
  password: validatePassword(values.password),
  phone: validatePhone(values.phone),
});
