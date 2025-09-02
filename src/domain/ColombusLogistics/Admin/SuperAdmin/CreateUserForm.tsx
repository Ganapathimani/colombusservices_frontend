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
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faUserPlus,
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
    description: 'Full system access',
    color: '#d32f2f',
    bgColor: '#ffebee',
  },
  {
    value: 'ASSISTANT',
    label: 'Assistant',
    description: 'Support operations',
    color: '#1976d2',
    bgColor: '#e3f2fd',
  },
  {
    value: 'PICKUP',
    label: 'Pickup Staff',
    description: 'Collection services',
    color: '#f57c00',
    bgColor: '#fff3e0',
  },
  {
    value: 'LR',
    label: 'LR Staff',
    description: 'Logistics & routing',
    color: '#7b1fa2',
    bgColor: '#f3e5f5',
  },
  {
    value: 'DELIVERY',
    label: 'Delivery Staff',
    description: 'Delivery operations',
    color: '#388e3c',
    bgColor: '#e8f5e8',
  },
  {
    value: 'CUSTOMER',
    label: 'Customer',
    description: 'Client account',
    color: '#616161',
    bgColor: '#f5f5f5',
  },
];

const AdminCreateUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
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
  const [createUser] = useCreateUserMutation();

  const watchedRole = watch('role');
  const selectedRoleInfo = roles.find((role) => role.value === watchedRole);

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
          background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c8 50%, #a5d6a7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Fade in={submitSuccess}>
          <Paper
            elevation={12}
            sx={{
              maxWidth: 400,
              p: 6,
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fbf8 100%)',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: '#e8f5e8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
              }}
            >
              <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#4caf50" />
            </Box>
            <Typography variant="h4" fontWeight={700} color="#2e7d32" mb={2}>
              User Created Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The new user account has been set up and is ready to use.
            </Typography>
          </Paper>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={16}
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fbf8 100%)',
          boxShadow: '0 20px 60px rgba(76, 175, 80, 0.15)',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
            color: 'white',
            p: 1,
            textAlign: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
              backgroundSize: '20px 20px',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                backdropFilter: 'blur(10px)',
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} size="lg" />
            </Box>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Create New User
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Add a new team member to your organization
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box component="div" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                        <FontAwesomeIcon icon={faUser} color="#4caf50" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8fbf8',
                      '&:hover fieldset': { borderColor: '#4caf50' },
                      '&.Mui-focused fieldset': { borderColor: '#4caf50', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                  }}
                />
              )}
            />

            {/* Email Field */}
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
                        <FontAwesomeIcon icon={faEnvelope} color="#4caf50" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8fbf8',
                      '&:hover fieldset': { borderColor: '#4caf50' },
                      '&.Mui-focused fieldset': { borderColor: '#4caf50', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                  }}
                />
              )}
            />

            {/* Mobile Field */}
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number (Optional)"
                  variant="outlined"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPhone} color="#4caf50" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8fbf8',
                      '&:hover fieldset': { borderColor: '#4caf50' },
                      '&.Mui-focused fieldset': { borderColor: '#4caf50', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                  }}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faLock} color="#4caf50" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#0c150cff' }}
                        >
                          <FontAwesomeIcon size="sm" icon={showPassword ? faEyeSlash : faEye} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8fbf8',
                      '&:hover fieldset': { borderColor: '#4caf50' },
                      '&.Mui-focused fieldset': { borderColor: '#4caf50', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
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
                        <FontAwesomeIcon icon={faShield} color="#4caf50" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: '#f8fbf8',
                      '&:hover fieldset': { borderColor: '#4caf50' },
                      '&.Mui-focused fieldset': { borderColor: '#4caf50', borderWidth: 2 },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
                    '& .MuiSelect-select': {
                      color: '#2e7d32',
                      fontWeight: 500,
                    },
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem
                      key={role.value}
                      value={role.value}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#e8f5e8',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#e8f5e8',
                          '&:hover': {
                            backgroundColor: '#e8f5e8',
                          },
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} color="#2e7d32">
                          {role.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {selectedRoleInfo && (
              <Fade in>
                <Paper
                  sx={{
                    background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
                    border: '2px solid #a5d6a7',
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <FontAwesomeIcon icon={faShield} color="#4caf50" style={{ marginRight: 12 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} color="#2e7d32">
                        Selected Role:
                        {' '}
                        {selectedRoleInfo.label}
                      </Typography>
                      <Typography variant="body2" color="#388e3c">
                        {selectedRoleInfo.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            )}

            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <FontAwesomeIcon icon={faUserPlus} />
                )
              }
              sx={{
                py: 2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
                  boxShadow: '0 12px 35px rgba(76, 175, 80, 0.5)',
                },
                '&:disabled': {
                  background: '#c8e6c8',
                  color: '#81c784',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isSubmitting ? 'Creating User...' : 'Create User Account'}
            </Button>
          </Box>
        </CardContent>

        <Box
          sx={{
            backgroundColor: '#f1f8e9',
            borderTop: '1px solid #c8e6c8',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            By creating this account, you agree to provide accurate
            information and follow company policies.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminCreateUserForm;
