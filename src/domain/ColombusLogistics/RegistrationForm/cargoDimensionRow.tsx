import React from 'react';
import { Stack, TextField, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import type { UseFormRegister, FieldError, Merge } from 'react-hook-form';
import type { TDimension } from '#domain/models/TLogisticsRegistrationForm';

interface CargoDimensionRowProps {
  index: number;
  remove: (index: number) => void;
  dimensionErrors?: (Merge<FieldError, Partial<TDimension>> | undefined)[];
  register: UseFormRegister<any>;
}

const dimensionKeys: (keyof TDimension)[] = ['handlingUnit', 'length', 'width', 'height', 'cubicFeet'];

const CargoDimensionRow = ({
  index, remove, dimensionErrors, register,
}: CargoDimensionRowProps) => (
  <Stack
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
    {dimensionKeys.map((key) => {
      const rawError = dimensionErrors?.[index]?.[key];
      const error = rawError && typeof rawError === 'object' && 'message' in rawError
        ? (rawError as FieldError)
        : undefined;

      return (
        <TextField
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          type={key === 'handlingUnit' ? 'text' : 'number'}
          {...register(`cargoDetails.0.dimensions.${index}.${key}`)}
          error={!!error}
          helperText={error?.message ?? ''}
          fullWidth
        />
      );
    })}

    <IconButton color="error" onClick={() => remove(index)}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </IconButton>
  </Stack>
);

export default CargoDimensionRow;
