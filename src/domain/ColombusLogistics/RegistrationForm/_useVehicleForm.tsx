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
  MenuItem,
  // Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCarSide } from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const useVehicleForm = () => {
  const { register, control, formState: { errors } } = useFormContext<TLogisticsRegistrationForm>();

  const storedUser = localStorage.getItem('user');
  let isAdmin = false;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      const role = (user.value.role || '').toLowerCase();

      isAdmin = role !== 'customer';
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const vehicleTypes = [
    'Open Truck',
    'Closed Body Truck / Container Truck',
    'Flatbed Truck',
    'Trailer Trucks (Multi-Axle)',
    'Tanker Truck',
    'Refrigerated Truck',
    'Pick-up Van / Tempo',
    'Car Carrier Truck',
    'Special Purpose Vehicles',
  ];

  const vehicleModels = [
    'Bolero pickup',
    'Bada dost',
    '14 feet',
    '17 feet',
    '20 feet',
    '24 feet',
    '26 feet',
    '28 feet',
    '32 feet (single axle)',
    '32 feet (multi axle)',
  ];

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="vehicles.0.vehicleType"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Vehicle Type"
              {...field}
              error={!!errors?.vehicles?.[0]?.vehicleType}
              helperText={errors?.vehicles?.[0]?.vehicleType?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faTruck} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="vehicles.0.model"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Vehicle Model"
              {...field}
              error={!!errors?.vehicles?.[0]?.model}
              helperText={errors?.vehicles?.[0]?.model?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faCarSide} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            >
              {vehicleModels.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>

      <FormControl error={!!errors?.vehicles?.[0]?.ftlType}>
        <FormLabel>FTL Type</FormLabel>
        <Controller
          name="vehicles.0.ftlType"
          control={control}
          rules={{ required: 'Please select FTL Type' }}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="CONSOLIDATE" control={<Radio />} label="Console" />
              <FormControlLabel value="SEPARATE" control={<Radio />} label="Separate" />
            </RadioGroup>
          )}
        />
        {errors?.vehicles?.[0]?.ftlType
          && <FormHelperText>{errors?.vehicles?.[0]?.ftlType?.message}</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors?.vehicles?.[0]?.loadingType}>
        <FormLabel>Loading Type</FormLabel>
        <Controller
          name="vehicles.0.loadingType"
          control={control}
          rules={{ required: 'Please select Loading Type' }}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="STACKABLE" control={<Radio />} label="Stackable" />
              <FormControlLabel value="NON_STACKABLE" control={<Radio />} label="Non-Stackable" />
            </RadioGroup>
          )}
        />
        {errors?.vehicles?.[0]?.loadingType
          && <FormHelperText>{errors?.vehicles?.[0]?.loadingType?.message}</FormHelperText>}
      </FormControl>
      {isAdmin && (
      <>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Rate"
            type="number"
            {...register('rate', {
              setValueAs: (v) => (v === '' ? undefined : Number(v)),
            })}
            fullWidth
          />

          <TextField
            label="Rate Quoted By"
            {...register('rateQuotedBy', {
              setValueAs: (v) => (v === '' ? undefined : v),
            })}
            fullWidth
          />
        </Stack>
        <TextField
          label="Tell something about order (if any)"
          {...register('notes')}
          multiline
          rows={3}
        />
      </>
      )}
    </Stack>
  );
};

export default useVehicleForm;
