import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCity,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const OriginForm = () => {
  const { register, control, formState: { errors } } = useFormContext<TLogisticsRegistrationForm>();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <TextField
          label="Company Name"
          {...register('originCompanyName', { required: 'Company Name is required' })}
          error={!!errors.originCompanyName}
          helperText={errors.originCompanyName?.message}
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
          {...register('originEmailId', {
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
          })}
          error={!!errors.originEmailId}
          helperText={errors.originEmailId?.message}
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
          {...register('originContactNumber', {
            required: 'Contact number is required',
            pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' },
          })}
          error={!!errors.originContactNumber}
          helperText={errors.originContactNumber?.message}
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
          {...register('originAddress', { required: 'Address is required' })}
          error={!!errors.originAddress}
          helperText={errors.originAddress?.message}
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
            {...register('originLocation', { required: 'Location is required' })}
            error={!!errors.originLocation}
            helperText={errors.originLocation?.message}
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
            {...register('originPincode', {
              required: 'Pin Code is required',
              pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
            })}
            error={!!errors.originPincode}
            helperText={errors.originPincode?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Controller
          name="pickupDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Pickup Date"
              disablePast
              onChange={(date) => field.onChange(date)}
              value={field.value}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          )}
        />

      </Stack>
    </LocalizationProvider>
  );
};

export default OriginForm;
