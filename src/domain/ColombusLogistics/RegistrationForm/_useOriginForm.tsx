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
  faContactBook,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const OriginForm = () => {
  const {
    control, register, formState: { errors },
  } = useFormContext<TLogisticsRegistrationForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pickups',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        companyName: '',
        contactPerson: '',
        email: '',
        mobile: '',
        address: '',
        location: '',
        pinCode: '',
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
                {...register(`pickups.${index}.companyName`, { required: 'Company Name is required' })}
                error={!!errors.pickups?.[index]?.companyName}
                helperText={errors.pickups?.[index]?.companyName?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUser} /></InputAdornment> }}
              />
              <TextField
                label="Email ID"
                fullWidth
                type="email"
                {...register(`pickups.${index}.email`, {
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                })}
                error={!!errors.pickups?.[index]?.email}
                helperText={errors.pickups?.[index]?.email?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment> }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Contact Person"
                fullWidth
                {...register(`pickups.${index}.contactPerson`, {
                  required: 'Contact person is required',
                })}
                error={!!errors.pickups?.[index]?.contactPerson}
                helperText={errors.pickups?.[index]?.contactPerson?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faContactBook} /></InputAdornment> }}
              />
              <TextField
                label="Contact Number"
                fullWidth
                {...register(`pickups.${index}.mobile`, {
                  required: 'Contact number is required',
                  pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' },
                })}
                error={!!errors.pickups?.[index]?.mobile}
                helperText={errors.pickups?.[index]?.mobile?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment> }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                {...register(`pickups.${index}.address`, { required: 'Address is required' })}
                error={!!errors.pickups?.[index]?.address}
                helperText={errors.pickups?.[index]?.address?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment> }}
              />
              <TextField
                label="Location"
                fullWidth
                {...register(`pickups.${index}.location`, { required: 'Location is required' })}
                error={!!errors.pickups?.[index]?.location}
                helperText={errors.pickups?.[index]?.location?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faCity} /></InputAdornment> }}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

              <TextField
                label="Pin Code"
                fullWidth
                {...register(`pickups.${index}.pinCode`, {
                  required: 'Pin Code is required',
                  pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
                })}
                error={!!errors.pickups?.[index]?.pinCode}
                helperText={errors.pickups?.[index]?.pinCode?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment> }}
              />
              <Controller
                name={`pickups.${index}.pickupDate`}
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
            </Stack>
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
            email: '',
            contactPerson: '',
            mobile: '',
            address: '',
            location: '',
            pinCode: '',
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
