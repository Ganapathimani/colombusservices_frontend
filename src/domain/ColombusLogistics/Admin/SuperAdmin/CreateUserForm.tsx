import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CardContent,
  Fade,
  MenuItem,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faShield,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useCreateUserMutation } from '#api/colombusLogisticsApi';

type Role = 'ADMIN' | 'ASSISTANT' | 'PICKUP' | 'LR' | 'DELIVERY' | 'CUSTOMER';

type AdminCreateUserFormValues = {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  role: Role;
};

const roles = [
  {
    value: 'ADMIN',
    label: 'Administrator',
    description: 'Full system access and management',
    color: '#1565c0',
  },
  {
    value: 'ASSISTANT',
    label: 'Assistant',
    description: 'Administrative support operations',
    color: '#2e7d32',
  },
  {
    value: 'PICKUP',
    label: 'Pickup Staff',
    description: 'Package collection services',
    color: '#ed6c02',
  },
  {
    value: 'LR',
    label: 'LR Staff',
    description: 'Logistics and routing operations',
    color: '#7b1fa2',
  },
  {
    value: 'DELIVERY',
    label: 'Delivery Staff',
    description: 'Package delivery operations',
    color: '#d32f2f',
  },
  {
    value: 'CUSTOMER',
    label: 'Customer',
    description: 'Client account access',
    color: '#424242',
  },
];

const AdminCreateUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createUser] = useCreateUserMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AdminCreateUserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: 'CUSTOMER',
    },
  });

  const onSubmit = async (data: AdminCreateUserFormValues) => {
    try {
      setIsSubmitting(true);
      await createUser(data).unwrap();
      setSubmitSuccess(true);
      reset();
    } catch (err: any) {
      throw new Error(err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Fade in={submitSuccess}>
          <Paper
            elevation={4}
            sx={{
              maxWidth: 420,
              p: 6,
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#f0f9ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                border: '2px solid #0ea5e9',
              }}
            >
              <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#0ea5e9" />
            </Box>
            <Typography variant="h5" fontWeight={600} color="#1e293b" mb={2}>
              User Created Successfully
            </Typography>
            <Typography variant="body1" color="#64748b" mb={4}>
              The new user account has been set up and is ready for use.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSubmitSuccess(false)}
              sx={{
                borderColor: '#0ea5e9',
                color: '#0ea5e9',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#f0f9ff',
                  borderColor: '#0284c7',
                },
              }}
            >
              Create Another User
            </Button>
          </Paper>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <Box
          sx={{
            p: 2,
            color: '#1e293b',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={1}>
            Create New User
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Add a new team member to your organization
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faUser} color="#64748b" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafbfc',
                      '&:hover fieldset': { borderColor: '#0ea5e9' },
                      '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#0ea5e9' },
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faEnvelope} color="#64748b" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafbfc',
                      '&:hover fieldset': { borderColor: '#0ea5e9' },
                      '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#0ea5e9' },
                  }}
                />
              )}
            />

            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number"
                  variant="outlined"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPhone} color="#64748b" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafbfc',
                      '&:hover fieldset': { borderColor: '#0ea5e9' },
                      '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#0ea5e9' },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain uppercase, lowercase, and number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message || 'Must contain uppercase, lowercase, and number'}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faLock} color="#64748b" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#64748b' }}
                        >
                          <FontAwesomeIcon size="sm" icon={showPassword ? faEyeSlash : faEye} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafbfc',
                      '&:hover fieldset': { borderColor: '#0ea5e9' },
                      '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#0ea5e9' },
                  }}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="User Role"
                  variant="outlined"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faShield} color="#64748b" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafbfc',
                      '&:hover fieldset': { borderColor: '#0ea5e9' },
                      '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#0ea5e9' },
                    '& .MuiSelect-select': {
                      color: '#1e293b',
                      fontWeight: 500,
                    },
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Box>
                        <Typography variant="body1" fontWeight={500} color="#1e293b">
                          {role.label}
                        </Typography>
                        <Typography variant="body2" color="#64748b">
                          {role.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Divider sx={{ my: 1 }} />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                backgroundColor: '#0ea5e9',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#0284c7',
                  boxShadow: 'none',
                },
                '&:disabled': {
                  backgroundColor: '#cbd5e1',
                  color: '#94a3b8',
                },
              }}
            >
              {isSubmitting ? 'Creating User...' : 'Create User Account'}
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default AdminCreateUserForm;
