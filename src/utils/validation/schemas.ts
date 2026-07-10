import * as Yup from 'yup';

export const emailValidator = Yup.string()
  .trim()
  .email('Enter a valid email')
  .required('Email is required');

export const passwordValidator = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');

export const nameValidator = Yup.string()
  .trim()
  .min(2, 'Name is too short')
  .required('Name is required');

export const phoneValidator = Yup.string()
  .trim()
  .matches(/^[0-9]{7,15}$/, 'Enter a valid phone number')
  .required('Phone number is required');

export const loginSchema = Yup.object({
  email: emailValidator,
  password: passwordValidator,
});

export const signUpSchema = Yup.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator,
});

export const forgotPasswordSchema = Yup.object({
  email: emailValidator,
});

export const profileSchema = Yup.object({
  name: nameValidator,
  email: emailValidator,
  phone: phoneValidator,
  photo: Yup.string().required('Photo is required'),
});
