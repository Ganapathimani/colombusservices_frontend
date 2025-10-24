import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
  faKey,
  faBuilding,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useCreateSigninMutation, useCreateSignupMutation } from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  companyname: string;
  gstnumber: string;
  phone: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

type AuthFormProps = {
  onSuccess: (user: StoredUser) => void;
  onClose: () => void;
};

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  companyName: string;
  phone: string;
  staffRole: string,
};

const STORAGE_KEY = 'user';
const DAY_MS = 24 * 60 * 60 * 1000;

const setWithExpiry = (key: string, value: unknown, ttl: number) => {
  const now = Date.now();
  const item = { value, expiry: now + ttl };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = <T,>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as { value: T; expiry: number };
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const AuthForm = ({ onSuccess, onClose }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [signupUpsert] = useCreateSignupMutation();
  const [loginUpsert] = useCreateSigninMutation();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin },
    reset: resetLogin,
  } = useForm<LoginInputs>({ mode: 'onTouched' });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp, isSubmitting: isSubmittingSignUp },
    reset: resetSignUp,
  } = useForm<SignUpInputs>({ mode: 'onTouched' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const gstRegex = /^[0-9A-Z]{15}$/;

  useEffect(() => {
    const existing = getWithExpiry<StoredUser>(STORAGE_KEY);
    if (existing?.email && existing?.token) {
      onSuccess(existing);
      onClose();
    }
  }, [onClose, onSuccess]);

  const onLoginSubmit: SubmitHandler<LoginInputs> = useCallback(
    async (data) => {
      try {
        setErrorMessage(null);
        const response = await loginUpsert({ email: data.email, password: data.password }).unwrap();
        const userData = response?.user;
        const token = response?.token;
        localStorage.setItem('token', token);

        if (!userData || !token) {
          throw new Error('Invalid login response');
        }

        const user: StoredUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          token,
          phone: userData.phone,
          staffRole: userData.staffRole,
          companyName: userData.companyname,
        };
        setWithExpiry(STORAGE_KEY, user, DAY_MS);
        resetLogin();
        onSuccess(user);
        toast.success(`Welcome ${user.name}!`);
        onClose();
      } catch (error: any) {
        setErrorMessage(error?.data?.message);
      }
    },
    [loginUpsert, onClose, onSuccess, resetLogin],
  );

  const onSignUpSubmit: SubmitHandler<SignUpInputs> = useCallback(
    async (data) => {
      try {
        setErrorMessage(null);

        const cleanData: SignUpInputs = Object.keys(data).reduce((acc, key) => {
          const value = data[key as keyof SignUpInputs];
          if (value !== '') {
            (acc as any)[key] = value;
          }
          return acc;
        }, {} as Partial<SignUpInputs>) as SignUpInputs;

        const response = await signupUpsert(cleanData).unwrap();
        const userData = response?.user;
        const token = response?.token;
        localStorage.setItem('token', token);

        if (!userData || !token) {
          throw new Error('Invalid signup response');
        }

        const user: StoredUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          token,
          phone: userData.phone,
          staffRole: userData.staffRole,
          companyName: userData.companyname,
        };

        setWithExpiry(STORAGE_KEY, user, DAY_MS);
        resetSignUp();
        onSuccess(user);
        toast.success(`Welcome ${user.name}!`);
        onClose();
      } catch (error: any) {
        setErrorMessage(error?.data?.error || 'Signup failed. Please try again.');
      }
    },
    [signupUpsert, onClose, onSuccess, resetSignUp],
  );

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    resetLogin();
    resetSignUp();
    setErrorMessage(null);
  }, [resetLogin, resetSignUp]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: '#f0fdf4' }}>
      <Stack
        sx={{
          p: 4, borderRadius: 3, textAlign: 'center', backgroundColor: 'white', boxShadow: 6, width: 420, maxWidth: '96vw',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
        </Typography>

        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        {isLogin ? (
          <form noValidate onSubmit={handleSubmitLogin(onLoginSubmit)}>
            <Stack spacing={2}>
              <TextField
                placeholder="Enter your email"
                fullWidth
                {...registerLogin('email', { required: 'Email is required', pattern: { value: emailRegex, message: 'Invalid email address' } })}
                error={!!errorsLogin.email}
                helperText={errorsLogin.email?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment> }}
              />
              <TextField
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...registerLogin('password', { required: 'Password is required' })}
                error={!!errorsLogin.password}
                helperText={errorsLogin.password?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faKey} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end"><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></IconButton></InputAdornment>,
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, textTransform: 'none' }} disabled={isSubmittingLogin}>Sign In</Button>
            </Stack>
          </form>
        ) : (
          <form noValidate onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
            <Stack spacing={2}>
              <TextField
                placeholder="Company Name"
                fullWidth
                {...registerSignUp('companyname', { required: 'Company name is required' })}
                error={!!errorsSignUp.companyname}
                helperText={errorsSignUp.companyname?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faBuilding} /></InputAdornment> }}
              />
              <TextField
                placeholder="GST Number"
                fullWidth
                {...registerSignUp('gstnumber', {
                  pattern: { value: gstRegex, message: 'Invalid GST Number' },
                })}
                error={!!errorsSignUp.gstnumber}
                helperText={errorsSignUp.gstnumber?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faKey} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Name"
                fullWidth
                {...registerSignUp('name', { required: 'Name is required' })}
                error={!!errorsSignUp.name}
                helperText={errorsSignUp.name?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUser} /></InputAdornment> }}
              />
              <TextField
                placeholder="Email"
                fullWidth
                {...registerSignUp('email', { required: 'Email is required', pattern: { value: emailRegex, message: 'Invalid email address' } })}
                error={!!errorsSignUp.email}
                helperText={errorsSignUp.email?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment> }}
              />
              <TextField
                placeholder="Phone"
                fullWidth
                {...registerSignUp('phone', { required: 'Phone Number is required', pattern: { value: phoneRegex, message: 'Invalid Phone number' } })}
                error={!!errorsSignUp.phone}
                helperText={errorsSignUp.phone?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment> }}
              />
              <TextField
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...registerSignUp('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
                  },
                })}
                error={!!errorsSignUp.password}
                helperText={errorsSignUp.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faKey} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, textTransform: 'none' }} disabled={isSubmittingSignUp}>Sign Up</Button>
            </Stack>
          </form>
        )}

        <Stack direction="row" justifyContent="center" alignItems="center" mt={2} spacing={1}>
          <Typography variant="body2">{isLogin ? "Don't have an account?" : 'Already have an account?'}</Typography>
          <Button onClick={toggleForm} variant="text" sx={{ fontWeight: 'bold', textTransform: 'none', color: '#22c55e' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthForm;
