import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Stack, TextField, InputAdornment, IconButton, Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faPhone, faMapMarkerAlt, faCity, faTrashAlt, faAdd,
} from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const DestinationForm = () => {
  const {
    control, register, formState: { errors },
  } = useFormContext<TLogisticsRegistrationForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'destinations',
  });

  useEffect(() => {
    if (!fields.length) {
      append({
        companyName: '',
        emailId: '',
        contactNumber: '',
        address: '',
        location: '',
        pincode: '',
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
              {...register(`destinations.${index}.companyName` as const, { required: 'Company Name is required' })}
              error={!!errors.destinations?.[index]?.companyName}
              helperText={errors.destinations?.[index]?.companyName?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faUser} /></InputAdornment>,
              }}
              fullWidth
            />
            <TextField
              label="Email ID"
              type="email"
              {...register(`destinations.${index}.emailId` as const, {
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
              })}
              error={!!errors.destinations?.[index]?.emailId}
              helperText={errors.destinations?.[index]?.emailId?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faEnvelope} /></InputAdornment>,
              }}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Contact Number"
              {...register(`destinations.${index}.contactNumber` as const, {
                required: 'Contact number is required',
                pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' },
              })}
              error={!!errors.destinations?.[index]?.contactNumber}
              helperText={errors.destinations?.[index]?.contactNumber?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faPhone} /></InputAdornment>,
              }}
              fullWidth
            />
            <TextField
              label="Pin Code"
              {...register(`destinations.${index}.pincode` as const, {
                required: 'Pin Code is required',
                pattern: { value: /^[0-9]{5,10}$/, message: 'Invalid Pin Code' },
              })}
              error={!!errors.destinations?.[index]?.pincode}
              helperText={errors.destinations?.[index]?.pincode?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment>,
              }}
              fullWidth
            />
          </Stack>

          <TextField
            label="Address"
            {...register(`destinations.${index}.address` as const, { required: 'Address is required' })}
            error={!!errors.destinations?.[index]?.address}
            helperText={errors.destinations?.[index]?.address?.message}
            multiline
            rows={3}
            InputProps={{
              startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faMapMarkerAlt} /></InputAdornment>,
            }}
            fullWidth
          />

          <TextField
            label="Location"
            {...register(`destinations.${index}.location` as const, { required: 'Location is required' })}
            error={!!errors.destinations?.[index]?.location}
            helperText={errors.destinations?.[index]?.location?.message}
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
          emailId: '',
          contactNumber: '',
          address: '',
          location: '',
          pincode: '',
        })}
        sx={{ alignSelf: 'flex-end', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
      >
        Add Destination
      </Button>
    </Stack>
  );
};

export default DestinationForm;
