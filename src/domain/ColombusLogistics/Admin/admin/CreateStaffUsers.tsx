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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faEnvelope,
  faPhone,
  faLock,
  faUserShield,
  faEye,
  faEyeSlash,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import {
  useCreateEmployeeMutation,
  useListBranchesQuery,
} from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';

export type StaffFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string; // fixed = "STAFF"
  staffRole: string;
  branchId?: string;
};

const CreateStaffForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const { data: branches } = useListBranchesQuery();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StaffFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'STAFF', // fixed
      staffRole: '',
      branchId: '',
    },
  });

  const onSubmit = useCallback(
    async (data: StaffFormValues) => {
      try {
        setIsSubmitting(true);

        const payload = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: 'STAFF', // fixed
          staffRole: data.staffRole,
          branchId: data.branchId || undefined,
        };

        await createEmployeeMutation(payload).unwrap();
        reset();
        toast.success('Staff created successfully');
      } catch (err: any) {
        const errorMessage = err?.data?.message
          || err?.message
          || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [createEmployeeMutation, reset],
  );

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Create Staff
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Add a new staff member with branch and staff role assignment.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {/* Name */}
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
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          }}
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

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Phone number is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="standard"
              error={!!errors.phone}
              helperText={errors.phone?.message}
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

        {/* Staff Role */}
        <Controller
          name="staffRole"
          control={control}
          rules={{ required: 'Staff Role is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Select Staff Role"
              variant="standard"
              error={!!errors.staffRole}
              helperText={errors.staffRole?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faUserShield} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            >
              <MenuItem value="PICKUP">Pickup</MenuItem>
              <MenuItem value="LR">LR</MenuItem>
              <MenuItem value="DELIVERY">Delivery</MenuItem>
            </TextField>
          )}
        />

        {/* Branch */}
        <Controller
          name="branchId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Assign Branch"
              variant="standard"
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
          {isSubmitting ? 'Creating Staff...' : 'Create Staff'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateStaffForm;
