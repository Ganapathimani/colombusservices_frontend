import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useCreateEmployeeMutation } from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';

export type AdminFormValues = {
  name: string;
  email: string;
  mobile?: string;
  password: string;
  role: string;
  branch: string;
};

const CreateAssistantForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEmployeeMutation] = useCreateEmployeeMutation();

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
      role: 'ASSISTANT',
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
          role: 'ASSISTANT',
        };

        await createEmployeeMutation(payload).unwrap();
        reset();
        toast.success('Assistant created successfully');
      } catch (err) {
        toast.error(err as string);
      } finally {
        setIsSubmitting(false);
      }
    },
    [createEmployeeMutation, reset],
  );

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Create Assistant
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Add a new assistant for administrative operations
      </Typography>

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
          {isSubmitting ? 'Creating Assistant...' : 'Create Assistant'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAssistantForm;
