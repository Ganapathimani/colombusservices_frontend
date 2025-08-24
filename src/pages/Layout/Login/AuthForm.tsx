import React, { useCallback, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
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
} from '@fortawesome/free-solid-svg-icons';
import { useLoginUpsertMutation, useSignupUpsertMutation } from '#api/colombusLogisticsApi';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    watch,
  } = useForm<SignUpInputs>({ mode: 'onTouched' });

  const passwordValue = watch('password', '');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onLoginSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await loginUpsert({
        email: data.email,
        password: data.password,
      }).unwrap();

      resetLogin();
      setIsLogin(true);
    } catch (error: any) {
      console.error('SignUp error:', error);
    }
  };

  const onSignUpSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      await signupUpsert({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      resetSignUp();
      setIsLogin(true);
    } catch (error: any) {
      console.error('SignUp error:', error);
    }
  };

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    resetLogin();
    resetSignUp();
  }, [resetLogin, resetSignUp]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#f0fdf4' }}
    >
      <Stack
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'white',
          boxShadow: 6,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
        </Typography>

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

            <TextField
              placeholder="Confirm your password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...registerSignUp('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === passwordValue || 'Passwords must match',
              })}
              error={!!errorsSignUp.confirmPassword}
              helperText={errorsSignUp.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faKey} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} size="sm" />
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
