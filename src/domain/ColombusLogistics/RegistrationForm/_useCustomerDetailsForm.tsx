import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const STORAGE_KEY = 'user';

const CustomerDetailsForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TLogisticsRegistrationForm>();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored).value;
        if (parsed) {
          setValue('bookedCompanyName', parsed.companyName || '');
          setValue('bookedCustomerName', parsed.name || '');
          setValue('bookedEmail', parsed.email || '');
          setValue('bookedPhoneNumber', parsed.phone || '');
        }
      } catch {
        throw new Error('Failed to parse stored user data');
      }
    }
  }, [setValue]);

  return (
    <Stack spacing={3}>
      <TextField
        label="Company Name"
        {...register('bookedCompanyName', { required: 'Company name is required' })}
        error={!!errors.bookedCompanyName}
        helperText={errors.bookedCompanyName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faBuilding} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Customer Name"
        {...register('bookedCustomerName', { required: 'Customer Name is required' })}
        error={!!errors.bookedCustomerName}
        helperText={errors.bookedCustomerName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faUser} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Email"
        type="email"
        {...register('bookedEmail', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
        })}
        error={!!errors.bookedEmail}
        helperText={errors.bookedEmail?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faEnvelope} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Mobile Number"
        {...register('bookedPhoneNumber', {
          required: 'Mobile is required',
          pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid mobile number' },
        })}
        error={!!errors.bookedPhoneNumber}
        helperText={errors.bookedPhoneNumber?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faPhone} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default CustomerDetailsForm;
