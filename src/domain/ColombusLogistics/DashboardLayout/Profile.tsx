import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const fieldLabels: Record<keyof Pick<ProfileFormData, 'currentPassword' | 'newPassword' | 'confirmPassword'>, string> = {
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  confirmPassword: 'Confirm New Password',
};

const Profile = () => {
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      reset({
        ...data,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationRules = (
    field: keyof typeof fieldLabels,
    watchFields: (name: string) => string | undefined,
  ) => {
    if (field === 'newPassword') {
      return {
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      };
    }
    if (field === 'confirmPassword') {
      return {
        validate: (val: string) => val === watchFields('newPassword') || 'Passwords do not match',
      };
    }
    return {};
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', p: 3 }}>
      <Box sx={{ maxWidth: '1000px' }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Stack flex={1}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Personal Info
              </Typography>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    margin="normal"
                  />
                )}
              />
            </Stack>

            <Stack flex={1}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Contact Info
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    margin="normal"
                  />
                )}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Security Settings
          </Typography>

          <Stack spacing={2}>
            {(Object.keys(fieldLabels) as Array<keyof typeof fieldLabels>).map(
              (field) => (
                <Controller
                  key={field}
                  name={field}
                  control={control}
                  rules={getValidationRules(field, watch)}
                  render={({ field: f }) => (
                    <TextField
                      {...f}
                      fullWidth
                      type={showPasswords[field] ? 'text' : 'password'}
                      label={fieldLabels[field]}
                      margin="normal"
                      error={!!errors[field]}
                      helperText={errors[field]?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => togglePasswordVisibility(field)}>
                              <FontAwesomeIcon
                                icon={showPasswords[field] ? faEyeSlash : faEye}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              ),
            )}
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button
              variant="outlined"
              onClick={() => reset()}
              sx={{
                color: '#16a34a',
                borderColor: '#16a34a',
                borderRadius: '6px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  borderColor: '#15803d',
                  backgroundColor: 'rgba(22,163,74,0.08)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                bgcolor: '#166534',
                borderRadius: '6px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                boxShadow: '0 4px 10px rgba(22,163,74,0.3)',
                '&:hover': { bgcolor: '#15803d', boxShadow: '0 6px 14px rgba(21,128,61,0.4)' },
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <FontAwesomeIcon icon={faSave} />
                )
              }
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
