import React, { useEffect } from 'react';
import { Stack, TextField, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import type {
  UseFormRegister, FieldError, Merge, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import type { TDimension } from '#domain/models/TLogisticsRegistrationForm';

interface CargoDimensionRowProps {
  index: number;
  remove: (index: number) => void;
  dimensionErrors?: (Merge<FieldError, Partial<TDimension>> | undefined)[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const CargoDimensionRow = ({
  index, remove, register, setValue, watch,
}: CargoDimensionRowProps) => {
  const lengthCm = watch(`cargoDetails.0.dimensions.${index}.lengthCm`);
  const widthCm = watch(`cargoDetails.0.dimensions.${index}.widthCm`);
  const heightCm = watch(`cargoDetails.0.dimensions.${index}.heightCm`);

  useEffect(() => {
    if (lengthCm && widthCm && heightCm) {
      const lengthFt = lengthCm * 0.0328084;
      const widthFt = widthCm * 0.0328084;
      const heightFt = heightCm * 0.0328084;

      const cubicFeet = lengthFt * widthFt * heightFt;
      setValue(`cargoDetails.0.dimensions.${index}.cubicFeet`, Number(cubicFeet.toFixed(3)));
    }
  }, [lengthCm, widthCm, heightCm, index, setValue]);

  return (
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
      <TextField
        label="Handling Unit"
        {...register(`cargoDetails.0.dimensions.${index}.handlingUnit`)}
        fullWidth
      />

      <TextField
        label="Length (cm)"
        type="number"
        {...register(`cargoDetails.0.dimensions.${index}.lengthCm`)}
        fullWidth
      />
      <TextField
        label="Width (cm)"
        type="number"
        {...register(`cargoDetails.0.dimensions.${index}.widthCm`)}
        fullWidth
      />
      <TextField
        label="Height (cm)"
        type="number"
        {...register(`cargoDetails.0.dimensions.${index}.heightCm`)}
        fullWidth
      />

      <TextField
        label="Cubic Feet"
        type="number"
        {...register(`cargoDetails.0.dimensions.${index}.cubicFeet`)}
        InputProps={{ readOnly: true }}
        fullWidth
      />

      <IconButton color="error" onClick={() => remove(index)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconButton>
    </Stack>
  );
};

export default CargoDimensionRow;
