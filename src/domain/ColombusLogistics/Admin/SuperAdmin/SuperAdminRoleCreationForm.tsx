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
import { useToggle } from '@react-shanties/core';
import { useCreateEmployeeMutation, useCreateBranchMutation, useListBranchesQuery } from '#api/colombusLogisticsApi';
import CreateBranchDialog from './CreateBranchDialog';

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
  const [openBranchDialog, , BranchDialogActions] = useToggle(false);
  const [createEmployeeMutation] = useCreateEmployeeMutation();

  const { data: branches, refetch } = useListBranchesQuery();
  const [createBranchMutation] = useCreateBranchMutation();

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
      await createEmployeeMutation({ ...data }).unwrap();
      reset();
      toast.success('Employee created successfully');
    } catch (err: any) {
      toast.error('Failed to Create Employee');
    } finally {
      setIsSubmitting(false);
    }
  }, [createEmployeeMutation, reset]);

  const handleCreateBranch = useCallback(async (branchName: string) => {
    await createBranchMutation({
      name: branchName,
    }).unwrap();
    await refetch();
  }, [createBranchMutation, refetch]);

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
          maxWidth: 600,
          backdropFilter: 'blur(8px)',
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {selectedRole === 'ADMIN' ? 'Create Admin' : 'Create Assistant'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {selectedRole === 'ADMIN'
                ? 'Add a new admin with branch assignment'
                : 'Add a new assistant for administrative operations'}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="success"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              ml: 2,
              height: 'fit-content',
            }}
            onClick={BranchDialogActions.setOn}
          >
            + Create Branch
          </Button>
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
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="xs" />
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
                  {branches?.map((branch: any) => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </MenuItem>
                  ))}
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
      <CreateBranchDialog
        open={openBranchDialog}
        onClose={BranchDialogActions.setOff}
        onCreate={handleCreateBranch}
      />

    </Box>
  );
};

export default SuperAdminRoleCreationForm;
