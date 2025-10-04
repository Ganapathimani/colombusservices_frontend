import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Stack, TextField, InputAdornment, IconButton, Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faMapMarkerAlt, faCity, faTrashAlt, faAdd,
  faContactBook,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const DestinationForm = () => {
  const {
    control, register, formState: { errors },
  } = useFormContext<TLogisticsRegistrationForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deliveries',
  });

  useEffect(() => {
    if (!fields.length) {
      append({
        companyName: '',
        contactPerson: '',
        email: '',
        mobile: '',
        address: '',
        location: '',
        pinCode: '',
      });
    }
  }, [append, fields.length]);

  return (
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
              {...register(`deliveries.${index}.companyName` as const, { required: 'Company Name is required' })}
              error={!!errors.deliveries?.[index]?.companyName}
              helperText={errors.deliveries?.[index]?.companyName?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUser} /></InputAdornment>,
              }}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contact Person"
              {...register(`deliveries.${index}.contactPerson` as const, { required: 'Contact Person is required' })}
              error={!!errors.deliveries?.[index]?.contactPerson}
              helperText={errors.deliveries?.[index]?.contactPerson?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faContactBook} /></InputAdornment>,
              }}
              fullWidth
            />
            <TextField
              label="Email Id"
              type="email"
              {...register(`deliveries.${index}.email` as const, {
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
              })}
              error={!!errors.deliveries?.[index]?.email}
              helperText={errors.deliveries?.[index]?.email?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment>,
              }}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contact Number"
              {...register(`deliveries.${index}.mobile` as const, {
                required: 'Mobile number is required',
                pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid mobile number' },
              })}
              error={!!errors.deliveries?.[index]?.mobile}
              helperText={errors.deliveries?.[index]?.mobile?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment>,
              }}
              fullWidth
            />
            <TextField
              label="Pin Code"
              {...register(`deliveries.${index}.pinCode` as const, {
                required: 'Pin Code is required',
                pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
              })}
              error={!!errors.deliveries?.[index]?.pinCode}
              helperText={errors.deliveries?.[index]?.pinCode?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment>,
              }}
              fullWidth
            />
          </Stack>

          <TextField
            label="Address"
            {...register(`deliveries.${index}.address` as const, { required: 'Address is required' })}
            error={!!errors.deliveries?.[index]?.address}
            helperText={errors.deliveries?.[index]?.address?.message}
            multiline
            rows={3}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment>,
            }}
            fullWidth
          />

          <TextField
            label="Location"
            {...register(`deliveries.${index}.location` as const, { required: 'Location is required' })}
            error={!!errors.deliveries?.[index]?.location}
            helperText={errors.deliveries?.[index]?.location?.message}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faCity} /></InputAdornment>,
            }}
            fullWidth
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
        color="success"
        startIcon={<FontAwesomeIcon icon={faAdd} />}
        onClick={() => append({
          companyName: '',
          email: '',
          contactPerson: '',
          mobile: '',
          address: '',
          location: '',
          pinCode: '',
        })}
        sx={{ alignSelf: 'flex-end', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
      >
        Add Destination
      </Button>
    </Stack>
  );
};

export default DestinationForm;
