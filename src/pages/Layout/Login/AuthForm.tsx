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
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useLoginUpsertMutation, useSignupUpsertMutation } from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  mobile: string;
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

  const [signupUpsert] = useSignupUpsertMutation();
  const [loginUpsert] = useLoginUpsertMutation();

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
  const mobileRegex = /^[0-9]{10}$/;

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
        };
        setWithExpiry(STORAGE_KEY, user, DAY_MS);
        resetLogin();
        onSuccess(user);
        toast.success(`Welcome ${user.name}!`);
        onClose();
      } catch (error: any) {
        setErrorMessage(error?.data?.message || error?.message || 'Login failed. Please try again.');
      }
    },
    [loginUpsert, onClose, onSuccess, resetLogin],
  );

  const onSignUpSubmit: SubmitHandler<SignUpInputs> = useCallback(
    async (data) => {
      try {
        setErrorMessage(null);

        const response = await signupUpsert({
          name: data.name,
          email: data.email,
          password: data.password,
          mobile: data.mobile,
        }).unwrap();
        const userData = response?.user || response?.user;
        const token = response?.token || response?.token;
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
        };
        setWithExpiry(STORAGE_KEY, user, DAY_MS);
        resetSignUp();
        onSuccess(user);
        onClose();
      } catch (error: any) {
        setErrorMessage(error?.data?.message || error?.message || 'Signup failed. Please try again.');
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
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'white',
          boxShadow: 6,
          width: 420,
          maxWidth: '96vw',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {isLogin ? (
          <form noValidate onSubmit={handleSubmitLogin(onLoginSubmit)}>
            <TextField
              placeholder="Enter your email"
              fullWidth
              margin="normal"
              {...registerLogin('email', {
                required: 'Email is required',
                pattern: { value: emailRegex, message: 'Invalid email address' },
              })}
              error={!!errorsLogin.email}
              helperText={errorsLogin.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} color="#6b7280" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...registerLogin('password', { required: 'Password is required' })}
              error={!!errorsLogin.password}
              helperText={errorsLogin.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faKey} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 1,
                textTransform: 'none',
                bgcolor: '#22c55e',
                '&:hover': { bgcolor: '#16a34a' },
              }}
              disabled={isSubmittingLogin}
            >
              Sign In
            </Button>
          </form>
        ) : (
          <form noValidate onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
            <TextField
              placeholder="Enter your name"
              fullWidth
              margin="normal"
              {...registerSignUp('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name should be at least 2 characters' },
              })}
              error={!!errorsSignUp.name}
              helperText={errorsSignUp.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faUser} color="#6b7280" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Enter your email"
              fullWidth
              margin="normal"
              {...registerSignUp('email', {
                required: 'Email is required',
                pattern: { value: emailRegex, message: 'Invalid email address' },
              })}
              error={!!errorsSignUp.email}
              helperText={errorsSignUp.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} color="#6b7280" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Enter your mobile number"
              fullWidth
              margin="normal"
              {...registerSignUp('mobile', {
                required: 'Mobile number is required',
                pattern: { value: mobileRegex, message: 'Enter valid 10-digit number' },
              })}
              error={!!errorsSignUp.mobile}
              helperText={errorsSignUp.mobile?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faPhone} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...registerSignUp('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
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
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 1,
                textTransform: 'none',
                bgcolor: '#22c55e',
                '&:hover': { bgcolor: '#16a34a' },
              }}
              disabled={isSubmittingSignUp}
            >
              Sign Up
            </Button>
          </form>
        )}

        <Stack direction="row" justifyContent="center" alignItems="center" mt={2} spacing={1}>
          <Typography variant="body2">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Typography>
          <Button
            onClick={toggleForm}
            variant="text"
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              padding: 0,
              minWidth: 0,
              color: '#22c55e',
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthForm;
