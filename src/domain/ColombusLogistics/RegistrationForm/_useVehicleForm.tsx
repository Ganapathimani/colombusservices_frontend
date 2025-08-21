import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCarSide } from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const useVehicleForm = () => {
  const { register, control, formState: { errors } } = useFormContext<TLogisticsRegistrationForm>();

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Vehicle Type"
          {...register('vehicleType', { required: 'Vehicle Type is required' })}
          error={!!errors.vehicleType}
          helperText={errors.vehicleType?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faTruck} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Vehicle Model"
          {...register('vehicleModel', { required: 'Vehicle Model is required' })}
          error={!!errors.vehicleModel}
          helperText={errors.vehicleModel?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faCarSide} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <FormControl error={!!errors.ftlType}>
        <FormLabel>FTL Type</FormLabel>
        <Controller
          name="ftlType"
          control={control}
          rules={{ required: 'Please select FTL Type' }}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="console" control={<Radio />} label="Console" />
              <FormControlLabel value="separate" control={<Radio />} label="Separate" />
            </RadioGroup>
          )}
        />
        {errors.ftlType && <FormHelperText>{errors.ftlType.message}</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors.loadingType}>
        <FormLabel>Loading Type</FormLabel>
        <Controller
          name="loadingType"
          control={control}
          rules={{ required: 'Please select Loading Type' }}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="stackable" control={<Radio />} label="Stackable" />
              <FormControlLabel value="nonStackable" control={<Radio />} label="Non-Stackable" />
            </RadioGroup>
          )}
        />
        {errors.loadingType && <FormHelperText>{errors.loadingType.message}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default useVehicleForm;
