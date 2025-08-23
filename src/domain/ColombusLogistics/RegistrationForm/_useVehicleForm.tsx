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
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCarSide } from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const useVehicleForm = () => {
  const { control, formState: { errors } } = useFormContext<TLogisticsRegistrationForm>();

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
          name="vehicleType"
          control={control}
          rules={{ required: 'Vehicle Type is required' }}
          render={({ field }) => (
            <TextField
              select
              label="Vehicle Type"
              {...field}
              error={!!errors.vehicleType}
              helperText={errors.vehicleType?.message}
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
          name="vehicleModel"
          control={control}
          rules={{ required: 'Vehicle Model is required' }}
          render={({ field }) => (
            <TextField
              select
              label="Vehicle Model"
              {...field}
              error={!!errors.vehicleModel}
              helperText={errors.vehicleModel?.message}
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
