import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  MenuItem,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faEnvelope,
  faPhone,
  faLock,
  faBuilding,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  useCreateEmployeeMutation,
  useListBranchesQuery,
} from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';

export type AdminFormValues = {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  role: string;
  branchId?: string;
};

const CreateAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const { data: branches } = useListBranchesQuery();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: 'ADMIN',
      branchId: '',
    },
  });

  const onSubmit = useCallback(
    async (data: AdminFormValues) => {
      try {
        setIsSubmitting(true);

        const payload = {
          name: data.name,
          email: data.email,
          phone: data.mobile,
          password: data.password,
          role: 'ADMIN',
          branchId: data.branchId,
        };

        await createEmployeeMutation(payload).unwrap();
        reset();
        toast.success('Admin created successfully');
      } catch {
        toast.error('Failed to create admin');
      } finally {
        setIsSubmitting(false);
      }
    },
    [createEmployeeMutation, reset],
  );

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Create Admin
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Add a new admin with branch assignment
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {/* Full Name */}
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

        {/* Email */}
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

        {/* Mobile */}
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

        {/* Password */}
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
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        size="xs"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          )}
        />

        <Controller
          name="branchId"
          control={control}
          rules={{ required: 'Branch is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Assign Branch"
              variant="standard"
              error={!!errors.branchId}
              helperText={errors.branchId?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faBuilding} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            >
              {branches?.map((branch: any) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

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
          {isSubmitting ? 'Creating Admin...' : 'Create Admin'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAdminForm;
