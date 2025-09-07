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
          setValue('customerName', parsed.name || '');
          setValue('customerEmail', parsed.email || '');
          setValue('customerMobile', parsed.mobile || '');
          setValue('customerCompanyName', parsed.companyName || '');
        }
      } catch {
        console.warn('Failed to parse stored user');
      }
    }
  }, [setValue]);

  return (
    <Stack spacing={3}>
      <TextField
        label="Company Name"
        {...register('customerCompanyName', { required: 'Company name is required' })}
        error={!!errors.customerCompanyName}
        helperText={errors.customerCompanyName?.message}
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
        {...register('customerName', { required: 'Customer Name is required' })}
        error={!!errors.customerName}
        helperText={errors.customerName?.message}
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
        {...register('customerEmail', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
        })}
        error={!!errors.customerEmail}
        helperText={errors.customerEmail?.message}
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
        {...register('customerMobile', {
          required: 'Mobile is required',
          pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid mobile number' },
        })}
        error={!!errors.customerMobile}
        helperText={errors.customerMobile?.message}
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
