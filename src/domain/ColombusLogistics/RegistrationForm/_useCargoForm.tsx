import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import {
  Stack,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faImage } from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'react-dropzone';
import type { FieldErrorsImpl, FieldError, Merge } from 'react-hook-form';
import type { TLogisticsRegistrationForm, TCargoDetail, TDimension } from '#domain/models/TLogisticsRegistrationForm';
import CargoDimensionRow from './cargoDimensionRow';

const CargoForm = () => {
  const {
    control, register, formState: { errors }, setValue, watch,
  } = useFormContext<TLogisticsRegistrationForm>();

  const cargoDetailsErrors = errors.cargoDetails as
  | FieldErrorsImpl<TCargoDetail>[]
  | undefined;

  const dimensionErrors = cargoDetailsErrors?.[0]?.dimensions as
  | (Merge<FieldError, Partial<TDimension>> | undefined)[]
  | undefined;
  const hasDimensions = watch('cargoDetails.0.hasDimensions', false);
  const photo = watch('cargoDetails.0.photo');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cargoDetails.0.dimensions',
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Cargo Details</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Package"
          type="number"
          {...register('cargoDetails.0.package', {
            required: 'Package is required',
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={!!cargoDetailsErrors?.[0]?.package}
          helperText={cargoDetailsErrors?.[0]?.package?.message}
          fullWidth
        />

        <TextField
          label="Weight (kg)"
          type="number"
          {...register('cargoDetails.0.weight', {
            required: 'Weight is required',
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={!!cargoDetailsErrors?.[0]?.weight}
          helperText={cargoDetailsErrors?.[0]?.weight?.message}
          fullWidth
        />

        <TextField
          label="CBM"
          {...register('cargoDetails.0.cbm', {
            required: 'CBM is required',
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={!!cargoDetailsErrors?.[0]?.cbm}
          helperText={cargoDetailsErrors?.[0]?.cbm?.message}
          fullWidth
        />
      </Stack>

      <Dropzone
        accept={{ 'image/*': [] }}
        onDrop={(acceptedFiles) => setValue('cargoDetails.0.photo', acceptedFiles[0])}
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
            <Typography mt={1}>Drag & drop a photo, or click to select</Typography>
            {photo && (
              <Typography variant="caption" display="block" color="green" mt={1}>
                {photo.name}
              </Typography>
            )}
          </Paper>
        )}
      </Dropzone>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Material Type"
          {...register('cargoDetails.0.materialType', { required: 'Material type is required' })}
          error={!!cargoDetailsErrors?.[0]?.materialType}
          helperText={cargoDetailsErrors?.[0]?.materialType?.message}
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

      {hasDimensions && (
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <CargoDimensionRow
              key={field.id}
              index={index}
              remove={remove}
              dimensionErrors={dimensionErrors}
              register={register}
            />
          ))}

          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => append({
              handlingUnit: 0, length: 0, width: 0, height: 0, cubicFeet: 0,
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
