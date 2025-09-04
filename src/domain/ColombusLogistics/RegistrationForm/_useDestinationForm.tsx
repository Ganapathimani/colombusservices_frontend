import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCity,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const useDestinationForm = () => {
  const { register, formState: { errors } } = useFormContext<TLogisticsRegistrationForm>();

  return (
    <Stack spacing={3}>
      <TextField
        label="Company Name"
        {...register('destinationCompanyName', { required: 'Company Name is required' })}
        error={!!errors.destinationCompanyName}
        helperText={errors.destinationCompanyName?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faUser} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Email ID"
        type="email"
        {...register('destinationEmailId', {
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
        })}
        error={!!errors.destinationEmailId}
        helperText={errors.destinationEmailId?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faEnvelope} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Contact Number"
        {...register('destinationContactNumber', {
          required: 'Contact number is required',
          pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' },
        })}
        error={!!errors.destinationContactNumber}
        helperText={errors.destinationContactNumber?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faPhone} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Address"
        {...register('destinationAddress', { required: 'Address is required' })}
        error={!!errors.destinationAddress}
        helperText={errors.destinationAddress?.message}
        multiline
        rows={3}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </InputAdornment>
          ),
        }}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Location"
          {...register('destinationLocation', { required: 'Location is required' })}
          error={!!errors.destinationLocation}
          helperText={errors.destinationLocation?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faCity} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Pin Code"
          {...register('destinationPincode', {
            required: 'Pin Code is required',
            pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
          })}
          error={!!errors.destinationPincode}
          helperText={errors.destinationPincode?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default useDestinationForm;
