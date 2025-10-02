import React, { useEffect } from 'react';
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
import type {
  FieldErrorsImpl,
  FieldError,
  Merge,
} from 'react-hook-form';
import type {
  TLogisticsRegistrationForm,
  TCargoDetail,
  TDimension,
} from '#domain/models/TLogisticsRegistrationForm';
import CargoDimensionRow from './cargoDimensionRow';
import CargoSummary from './_cargoSummary';

const CargoForm = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<TLogisticsRegistrationForm>();

  const cargoDetailsErrors = errors.cargoDetails as
    | FieldErrorsImpl<TCargoDetail>[]
    | undefined;

  const dimensionErrors = cargoDetailsErrors?.[0]?.dimensions as
    | (Merge<FieldError, Partial<TDimension>> | undefined)[]
    | undefined;

  const hasDimensions = watch('cargoDetails.0.hasDimensions', false);
  const photo = watch('cargoDetails.0.photo');

  const {
    fields, append, remove, replace,
  } = useFieldArray({
    control,
    name: 'cargoDetails.0.dimensions',
  });

  const dimensions = watch('cargoDetails.0.dimensions') || [];
  const hasDimension = watch('cargoDetails.0.hasDimensions', false);
  useEffect(() => {
    if (hasDimension) {
      if (fields.length === 0) {
        append({
          handlingUnit: 0,
          length: 0,
          width: 0,
          height: 0,
          unit: 'cm',
          materialType: '',
          cubicFeet: 0,
        });
      }
    } else {
      replace([]);
    }
  }, [hasDimension, append, fields.length, replace]);

  const totals = dimensions.reduce(
    (acc: any, dim: any) => {
      acc.packages += Number(dim.handlingUnit || 0);
      acc.cubicFeet += Number(dim.cubicFeet || 0);
      return acc;
    },
    {
      packages: 0, cubicFeet: 0,
    },
  );

  return (
    <Stack spacing={3}>
      <Typography variant="body1">Total Packages</Typography>

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
          label="Net Weight (kgs)"
          type="number"
          {...register('cargoDetails.0.netWeight', {
            required: 'Weight is required',
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={!!cargoDetailsErrors?.[0]?.netWeight}
          helperText={cargoDetailsErrors?.[0]?.netWeight?.message}
          fullWidth
        />

        <TextField
          label="Cross Weight (kgs)"
          type="number"
          {...register('cargoDetails.0.crossWeight', {
            required: 'Weight is required',
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={!!cargoDetailsErrors?.[0]?.crossWeight}
          helperText={cargoDetailsErrors?.[0]?.crossWeight?.message}
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
            <Typography mt={1}>
              Drag & drop a photo, or click to select
            </Typography>
            {photo && (
              <Typography
                variant="caption"
                display="block"
                color="green"
                mt={1}
              >
                {photo.name}
              </Typography>
            )}
          </Paper>
        )}
      </Dropzone>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="cargoDetails.0.hasDimensions"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={(
                <Checkbox
                  {...field}
                  checked={field.value}
                  sx={{ color: 'green' }}
                />
              )}
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
              setValue={setValue}
              watch={watch}
            />
          ))}

          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} />}
            onClick={() => append({
              handlingUnit: 0,
              length: 0,
              width: 0,
              height: 0,
              unit: 'cm',
              cubicFeet: 0,
              materialType: '',
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
          <CargoSummary totals={totals} />
        </Stack>
      )}
    </Stack>
  );
};

export default CargoForm;
