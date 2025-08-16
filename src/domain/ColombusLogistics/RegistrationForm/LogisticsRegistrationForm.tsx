import React, { useCallback } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMapMarkerAlt,
  faCity,
  faTruck,
  faCarSide,
  faBox,
  faCubes,
  faWeight,
  faRulerCombined,
  faAdd,
  faTrashAlt,
  faCalendarAlt,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#66bb6a',
    },
  },
});

const LogisticsRegistrationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogisticsRegistrationForm>({
    defaultValues: {
      ftlType: 'console',
      loadingType: 'stackable',
      cargoDetails: [{
        package: '', cbm: '', weight: '', dimensions: '',
      }],
      originCustomerName: '',
      originAddress: '',
      originLocation: '',
      originPincode: '',
      originContactNumber: '',
      originEmailId: '',
      pickupDate: null,
      destinationCustomerName: '',
      destinationAddress: '',
      destinationLocation: '',
      destinationPincode: '',
      destinationContactNumber: '',
      destinationEmailId: '',
      vehicleType: '',
      vehicleModel: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cargoDetails',
  });

  const onSubmit = (data: TLogisticsRegistrationForm) => {
    console.log('Form data:', data);
  };

  const handleAddPackage = useCallback(() => {
    append({
      package: '',
      cbm: '',
      weight: '',
      dimensions: '',
    });
  }, [append]);

  const handleRemovePackage = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <ThemeProvider theme={greenTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4} maxWidth={800} margin="auto" padding={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Columbus Logistics Registration
            </Typography>

            {/* Origin / Pickup Section */}
            <Typography variant="h5" gutterBottom>
              Origin / Pickup Location
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Customer Name"
                  {...register('originCustomerName', {
                    required: 'Customer Name is required',
                  })}
                  error={!!errors.originCustomerName}
                  helperText={errors.originCustomerName?.message}
                  fullWidth
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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.originEmailId}
                  helperText={errors.originEmailId?.message}
                  fullWidth
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
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid contact number',
                    },
                  })}
                  error={!!errors.originContactNumber}
                  helperText={errors.originContactNumber?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPhone} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Address"
                  {...register('originAddress', {
                    required: 'Address is required',
                  })}
                  error={!!errors.originAddress}
                  helperText={errors.originAddress?.message}
                  multiline
                  minRows={2}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Location"
                  {...register('originLocation', {
                    required: 'Location is required',
                  })}
                  error={!!errors.originLocation}
                  helperText={errors.originLocation?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faCity} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Zip Code"
                  {...register('originPincode', {
                    required: 'Zip Code is required',
                    pattern: {
                      value: /^[0-9]{5,10}$/,
                      message: 'Invalid Zip Code',
                    },
                  })}
                  error={!!errors.originPincode}
                  helperText={errors.originPincode?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Controller
                  name="pickupDate"
                  control={control}
                  rules={{ required: 'Pickup date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Pickup Date"
                      disablePast
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      slotProps={{
                        textField: {
                          error: !!errors.pickupDate,
                          helperText: errors.pickupDate?.message,
                          fullWidth: true,
                          sx: { minWidth: 250 },
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
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Destination Location
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Customer Name"
                  {...register('destinationCustomerName', {
                    required: 'Customer Name is required',
                  })}
                  error={!!errors.destinationCustomerName}
                  helperText={errors.destinationCustomerName?.message}
                  fullWidth
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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.destinationEmailId}
                  helperText={errors.destinationEmailId?.message}
                  fullWidth
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
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid contact number',
                    },
                  })}
                  error={!!errors.destinationContactNumber}
                  helperText={errors.destinationContactNumber?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faPhone} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Address"
                  {...register('destinationAddress', {
                    required: 'Address is required',
                  })}
                  error={!!errors.destinationAddress}
                  helperText={errors.destinationAddress?.message}
                  multiline
                  minRows={2}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Location"
                  {...register('destinationLocation', {
                    required: 'Location is required',
                  })}
                  error={!!errors.destinationLocation}
                  helperText={errors.destinationLocation?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faCity} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Zip Code"
                  {...register('destinationPincode', {
                    required: 'Zip Code is required',
                    pattern: {
                      value: /^[0-9]{5,10}$/,
                      message: 'Invalid Zip Code',
                    },
                  })}
                  error={!!errors.destinationPincode}
                  helperText={errors.destinationPincode?.message}
                  fullWidth
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

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Shipment Details
            </Typography>

            {fields.map((field, index) => (
              <Stack
                key={field.id}
                spacing={2}
                sx={{
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  mb: 2,
                  position: 'relative',
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    Package #
                    {index + 1}
                  </Typography>
                  {fields.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemovePackage(index)}
                    size="large"
                    aria-label={`Remove package ${index + 1}`}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </IconButton>
                  )}
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Package"
                    {...register(`cargoDetails.${index}.package` as const, {
                      required: 'Package is required',
                    })}
                    error={!!errors.cargoDetails?.[index]?.package}
                    helperText={errors.cargoDetails?.[index]?.package?.message}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faBox} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="CBM"
                    {...register(`cargoDetails.${index}.cbm` as const, {
                      required: 'CBM is required',
                      pattern: {
                        value: /^[0-9]*\.?[0-9]+$/,
                        message: 'Invalid CBM value',
                      },
                    })}
                    error={!!errors.cargoDetails?.[index]?.cbm}
                    helperText={errors.cargoDetails?.[index]?.cbm?.message}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faCubes} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Weight"
                    {...register(`cargoDetails.${index}.weight` as const, {
                      required: 'Weight is required',
                      pattern: {
                        value: /^[0-9]*\.?[0-9]+$/,
                        message: 'Invalid Weight value',
                      },
                    })}
                    error={!!errors.cargoDetails?.[index]?.weight}
                    helperText={errors.cargoDetails?.[index]?.weight?.message}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faWeight} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Dimensions"
                    {...register(`cargoDetails.${index}.dimensions` as const, {
                      required: 'Dimensions are required',
                    })}
                    error={!!errors.cargoDetails?.[index]?.dimensions}
                    helperText={errors.cargoDetails?.[index]?.dimensions?.message}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faRulerCombined} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            ))}
            <Divider sx={{ my: 2 }} />

            <Button
              startIcon={<FontAwesomeIcon icon={faAdd} />}
              variant="outlined"
              onClick={handleAddPackage}
            >
              Add More Package
            </Button>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Vehicle Type"
                {...register('vehicleType', {
                  required: 'Vehicle Type is required',
                })}
                error={!!errors.vehicleType}
                helperText={errors.vehicleType?.message}
                fullWidth
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
                {...register('vehicleModel', {
                  required: 'Vehicle Model is required',
                })}
                error={!!errors.vehicleModel}
                helperText={errors.vehicleModel?.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faCarSide} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <FormLabel sx={{ mt: 2 }}>FTL Type</FormLabel>
            <Controller
              name="ftlType"
              control={control}
              rules={{ required: 'Please select FTL Type' }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="console"
                    control={<Radio color="primary" />}
                    label="Console"
                  />
                  <FormControlLabel
                    value="separate"
                    control={<Radio color="primary" />}
                    label="Separate"
                  />
                </RadioGroup>
              )}
            />
            {errors.ftlType && (
              <Typography color="error" variant="body2">
                {errors.ftlType.message}
              </Typography>
            )}

            <FormLabel sx={{ mt: 2 }}>Loading Type</FormLabel>
            <Controller
              name="loadingType"
              control={control}
              rules={{ required: 'Please select Loading Type' }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="stackable"
                    control={<Radio color="primary" />}
                    label="Stackable"
                  />
                  <FormControlLabel
                    value="non-stackable"
                    control={<Radio color="primary" />}
                    label="Non-Stackable"
                  />
                </RadioGroup>
              )}
            />
            {errors.loadingType && (
              <Typography color="error" variant="body2">
                {errors.loadingType.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default LogisticsRegistrationForm;
