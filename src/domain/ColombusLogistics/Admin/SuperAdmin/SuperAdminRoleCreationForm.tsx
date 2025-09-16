import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from '@mui/material';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faUserTie,
  faEnvelope,
  faPhone,
  faLock,
  faUserShield,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { useCreateEmployeeMutation } from '#api/colombusLogisticsApi';

export type UserFormValues = {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  role: 'ASSISTANT' | 'ADMIN';
  branch?: string;
};

const SuperAdminRoleCreationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEmployeeMutation] = useCreateEmployeeMutation();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: 'ASSISTANT',
      branch: '',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = useCallback(async (data: UserFormValues) => {
    try {
      setIsSubmitting(true);
      await createEmployeeMutation({ ...data, role: 'ADMIN' }).unwrap();
      reset();
      toast.success('Employee created successfully');
    } catch (err: any) {
      toast.error('Failed to Create Employee');
    } finally {
      setIsSubmitting(false);
    }
  }, [createEmployeeMutation, reset]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          backdropFilter: 'blur(8px)',
          p: 4,
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {selectedRole === 'ADMIN' ? 'Create Admin' : 'Create Assistant'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {selectedRole === 'ADMIN'
              ? 'Add a new admin with branch assignment and elevated privileges'
              : 'Add a new assistant for administrative operations'}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                variant="standard"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUserTie} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                variant="standard"
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
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
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faPhone} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faLock} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="User Role"
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUserShield} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="ASSISTANT">Assistant</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </TextField>
            )}
          />

          {selectedRole === 'ADMIN' && (
            <Controller
              name="branch"
              control={control}
              rules={{ required: 'Branch is required for Admin' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Assign Branch"
                  variant="standard"
                  error={!!errors.branch}
                  helperText={errors.branch?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faBuilding} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                >
                  <MenuItem value="MANALI_CHENNAI">Manali (Chennai)</MenuItem>
                  <MenuItem value="PAMMAL_CHENNAI">Pammal (Chennai)</MenuItem>
                  <MenuItem value="COIMBATORE">Coimbatore</MenuItem>
                  <MenuItem value="TIRUPUR">Tirupur</MenuItem>
                </TextField>
              )}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {isSubmitting
              ? `Creating ${selectedRole === 'ADMIN' ? 'Admin' : 'Assistant'}...`
              : `Create ${selectedRole === 'ADMIN' ? 'Admin' : 'Assistant'}`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminRoleCreationForm;
