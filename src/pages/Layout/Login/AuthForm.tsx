import React, { useCallback, useState } from 'react';
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
  onSuccess: (userEmail: string) => void;
  onClose: () => void;
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

  const onLoginSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setErrorMessage(null);
      const response = await loginUpsert({ email: data.email, password: data.password }).unwrap();
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('role', response.user.role);
      localStorage.setItem('token', response.token);

      resetLogin();
      onSuccess(response.user.email);
      onClose();
    } catch (error: any) {
      setErrorMessage(error?.data?.message || 'Login failed. Please try again.');
    }
  };

  const onSignUpSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      setErrorMessage(null);
      const response = await signupUpsert({
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
      }).unwrap();
      localStorage.setItem('user', JSON.stringify(response.user.name));
      localStorage.setItem('email', JSON.stringify(response.user.email));
      localStorage.setItem('role', JSON.stringify(response.user.role));
      localStorage.setItem('token', response.token);

      resetSignUp();
      onSuccess(response.user.email);
      onClose();
    } catch (error: any) {
      setErrorMessage(error?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    resetLogin();
    resetSignUp();
    setErrorMessage(null);
  }, [resetLogin, resetSignUp]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: '#f0fdf4' }}>
      <Stack sx={{
        p: 4, borderRadius: 3, textAlign: 'center', backgroundColor: 'white', boxShadow: 6,
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
                    <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} edge="end">
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
                mt: 3, mb: 1, textTransform: 'none', bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' },
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
                    <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} edge="end">
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
                mt: 3, mb: 1, textTransform: 'none', bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' },
              }}
              disabled={isSubmittingSignUp}
            >
              Sign Up
            </Button>
          </form>
        )}

        <Stack direction="row" justifyContent="center" alignItems="center" mt={2} spacing={1}>
          <Typography variant="body2">{isLogin ? "Don't have an account?" : 'Already have an account?'}</Typography>
          <Button
            onClick={toggleForm}
            variant="text"
            sx={{
              fontWeight: 'bold', textTransform: 'none', padding: 0, minWidth: 0, color: '#22c55e',
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
