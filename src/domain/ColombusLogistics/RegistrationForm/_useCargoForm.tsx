import React from 'react';
import type { FieldErrorsImpl } from 'react-hook-form';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import {
  Stack,
  Typography,
  Button,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrashAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const CargoForm = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<TLogisticsRegistrationForm>();

  // Errors narrowed for array access
  const cargoErrors = errors.cargoDetails as
    | FieldErrorsImpl<TLogisticsRegistrationForm['cargoDetails']>
    | undefined;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cargoDetails.0.dimensions',
  });

  const hasDimensions = watch('cargoDetails.0.hasDimensions', false);
  const photo = watch('cargoDetails.0.photo');

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold" color="green">
        Cargo Details
      </Typography>

      {/* Row 1: Package, Weight, CBM */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Package"
          {...register('cargoDetails.0.package', { required: 'Package is required' })}
          error={!!cargoErrors?.[0]?.package}
          helperText={cargoErrors?.[0]?.package?.message}
          fullWidth
        />

        <TextField
          label="Weight (kg)"
          type="number"
          {...register('cargoDetails.0.weight', { required: 'Weight is required' })}
          error={!!cargoErrors?.[0]?.weight}
          helperText={cargoErrors?.[0]?.weight?.message}
          fullWidth
        />

        <TextField
          label="CBM"
          type="number"
          {...register('cargoDetails.0.cbm', { required: 'CBM is required' })}
          error={!!cargoErrors?.[0]?.cbm}
          helperText={cargoErrors?.[0]?.cbm?.message}
          fullWidth
        />
      </Stack>

      {/* Dropzone */}
      <Dropzone
        accept={{ 'image/*': [] }}
        onDrop={(acceptedFiles) => {
          setValue('cargoDetails.0.photo', acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Paper
            {...getRootProps()}
            sx={{
              border: `2px dashed ${isDragActive ? 'green' : '#999'}`,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? '#f1f8f1' : '#fafafa',
              transition: 'all 0.2s ease-in-out',
              '&:hover': { borderColor: 'darkgreen' },
            }}
          >
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faImage} size="2x" color="gray" />
            <Typography variant="body2" mt={1}>
              Drag & drop a photo, or click to select
            </Typography>
            {photo && (
              <Typography variant="caption" display="block" color="green" mt={1}>
                {photo.name}
              </Typography>
            )}
          </Paper>
        )}
      </Dropzone>

      {/* Row 2: Material Type + Checkbox */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Material Type"
          {...register('cargoDetails.0.materialType', { required: 'Material type is required' })}
          error={!!cargoErrors?.[0]?.materialType}
          helperText={cargoErrors?.[0]?.materialType?.message}
          fullWidth
        />

        <Controller
          name="cargoDetails.0.hasDimensions"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} sx={{ color: 'green' }} />}
              label="Add Dimensions"
            />
          )}
        />
      </Stack>

      {/* Dynamic Dimensions Section */}
      {hasDimensions && (
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Stack
              key={field.id}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              sx={{
                p: 2,
                border: '1px solid #c8e6c9',
                borderRadius: 2,
                backgroundColor: '#f1f8f1',
              }}
            >
              {['handlingUnit', 'length', 'width', 'height', 'cubicFeet'].map((fieldName) => (
                <TextField
                  key={fieldName}
                  label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  type={fieldName === 'handlingUnit' ? 'text' : 'number'}
                  {...register(`cargoDetails.0.dimensions.${index}.${fieldName}` as const, {
                    required: `${fieldName} required`,
                  })}
                  error={!!cargoErrors?.[0]?.dimensions?.[index]?.[fieldName]}
                  helperText={cargoErrors?.[0]?.dimensions?.[index]?.[fieldName]?.message}
                  fullWidth
                />
              ))}

              {fields.length > 1 && (
                <IconButton color="error" onClick={() => remove(index)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </IconButton>
              )}
            </Stack>
          ))}

          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => append({
              handlingUnit: '',
              length: '',
              width: '',
              height: '',
              cubicFeet: '',
            })}
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: 'green',
              '&:hover': { backgroundColor: 'darkgreen' },
              borderRadius: 2,
            }}
          >
            Add More Items
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default CargoForm;
