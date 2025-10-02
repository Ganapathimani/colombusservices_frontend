import React, { useEffect } from 'react';
import {
  Stack,
  TextField,
  IconButton,
  MenuItem,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import type {
  UseFormRegister,
  FieldError,
  Merge,
  UseFormSetValue,
  UseFormWatch,
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

const convertToFeet = (value: number, unit: string): number => {
  switch (unit) {
    case 'inch':
      return value / 12;
    case 'cm':
      return value * 0.0328084;
    case 'mm':
      return value * 0.00328084;
    default:
      return value;
  }
};

const CargoDimensionRow = ({
  index,
  remove,
  register,
  setValue,
  watch,
}: CargoDimensionRowProps) => {
  const length = watch(`cargoDetails.0.dimensions.${index}.length`);
  const width = watch(`cargoDetails.0.dimensions.${index}.width`);
  const height = watch(`cargoDetails.0.dimensions.${index}.height`);
  const unit = watch(`cargoDetails.0.dimensions.${index}.unit`);
  const units = Number(watch(`cargoDetails.0.dimensions.${index}.handlingUnit`)) || 1;

  useEffect(() => {
    if (length && width && height) {
      const lengthFt = convertToFeet(Number(length), unit);
      const widthFt = convertToFeet(Number(width), unit);
      const heightFt = convertToFeet(Number(height), unit);

      const cubicFeet = lengthFt * widthFt * heightFt * units;
      setValue(
        `cargoDetails.0.dimensions.${index}.cubicFeet`,
        Number(cubicFeet.toFixed(3)),
      );
    }
  }, [length, width, height, unit, index, setValue, units]);

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        border: '1px solid #c8e6c9',
        borderRadius: 2,
        backgroundColor: '#f1f8f1',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Handling Unit"
          {...register(`cargoDetails.0.dimensions.${index}.handlingUnit`)}
          fullWidth
        />

        <TextField
          label="Length"
          type="number"
          {...register(`cargoDetails.0.dimensions.${index}.length`)}
          fullWidth
        />
        <TextField
          label="Width"
          type="number"
          {...register(`cargoDetails.0.dimensions.${index}.width`)}
          fullWidth
        />
        <TextField
          label="Height"
          type="number"
          {...register(`cargoDetails.0.dimensions.${index}.height`)}
          fullWidth
        />

        <TextField
          select
          label="Unit"
          defaultValue="cm"
          {...register(`cargoDetails.0.dimensions.${index}.unit`)}
          fullWidth
        >
          <MenuItem value="cm">cm</MenuItem>
          <MenuItem value="inch">inch</MenuItem>
          <MenuItem value="mm">mm</MenuItem>
        </TextField>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Material Type"
          {...register(`cargoDetails.0.dimensions.${index}.materialType`, {
            required: 'Material type is required',
          })}
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
    </Stack>
  );
};

export default CargoDimensionRow;
