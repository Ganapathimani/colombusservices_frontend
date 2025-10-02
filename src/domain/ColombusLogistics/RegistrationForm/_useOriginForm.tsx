import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import {
  Stack, TextField, InputAdornment, IconButton, Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faMapMarkerAlt, faCity, faCalendarAlt, faTrashAlt, faAdd,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const OriginForm = () => {
  const {
    control, register, formState: { errors },
  } = useFormContext<TLogisticsRegistrationForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'origins',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        companyName: '',
        emailId: '',
        contactNumber: '',
        address: '',
        location: '',
        pincode: '',
        pickupDate: null,
      });
    }
  }, [fields.length, append]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {fields.map((field, index) => (
          <Stack
            key={field.id}
            spacing={2}
            sx={{
              p: 2, border: '1px solid #c8e6c9', borderRadius: 2,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Company Name"
                fullWidth
                {...register(`origins.${index}.companyName`, { required: 'Company Name is required' })}
                error={!!errors.origins?.[index]?.companyName}
                helperText={errors.origins?.[index]?.companyName?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUser} /></InputAdornment> }}
              />
              <TextField
                label="Email ID"
                fullWidth
                type="email"
                {...register(`origins.${index}.emailId`, {
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                })}
                error={!!errors.origins?.[index]?.emailId}
                helperText={errors.origins?.[index]?.emailId?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment> }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Contact Number"
                fullWidth
                {...register(`origins.${index}.contactNumber`, {
                  required: 'Contact number is required',
                  pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' },
                })}
                error={!!errors.origins?.[index]?.contactNumber}
                helperText={errors.origins?.[index]?.contactNumber?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment> }}
              />
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                {...register(`origins.${index}.address`, { required: 'Address is required' })}
                error={!!errors.origins?.[index]?.address}
                helperText={errors.origins?.[index]?.address?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment> }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Location"
                fullWidth
                {...register(`origins.${index}.location`, { required: 'Location is required' })}
                error={!!errors.origins?.[index]?.location}
                helperText={errors.origins?.[index]?.location?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faCity} /></InputAdornment> }}
              />
              <TextField
                label="Pin Code"
                fullWidth
                {...register(`origins.${index}.pincode`, {
                  required: 'Pin Code is required',
                  pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
                })}
                error={!!errors.origins?.[index]?.pincode}
                helperText={errors.origins?.[index]?.pincode?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment> }}
              />
            </Stack>

            <Controller
              name={`origins.${index}.pickupDate`}
              control={control}
              render={({ field: controllerField }) => (
                <DatePicker
                  {...controllerField}
                  label="Pickup Date"
                  disablePast
                  onChange={(date) => controllerField.onChange(date)}
                  value={controllerField.value}
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

            <Stack direction="row" justifyContent="flex-end">
              <IconButton color="error" onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButton>
            </Stack>
          </Stack>
        ))}

        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faAdd} />}
          onClick={() => append({
            companyName: '',
            emailId: '',
            contactNumber: '',
            address: '',
            location: '',
            pincode: '',
            pickupDate: null,
          })}
          sx={{ alignSelf: 'flex-end', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
        >
          Add More Origins
        </Button>
      </Stack>
    </LocalizationProvider>
  );
};

export default OriginForm;
