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
import type { TMaterial } from '#domain/models/TLogisticsRegistrationForm';

interface CargoDimensionRowProps {
  index: number;
  remove: (index: number) => void;
  dimensionErrors?: (Merge<FieldError, Partial<TMaterial>> | undefined)[];
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
  const length = watch(`packages.0.materials.${index}.length`);
  const width = watch(`packages.0.materials.${index}.width`);
  const height = watch(`packages.0.materials.${index}.height`);
  const unit = watch(`packages.0.materials.${index}.unit`);
  const units = Number(watch(`packages.0.materials.${index}.handlingUnit`)) || 1;

  useEffect(() => {
    if (length && width && height) {
      const lengthFt = convertToFeet(Number(length), unit);
      const widthFt = convertToFeet(Number(width), unit);
      const heightFt = convertToFeet(Number(height), unit);

      const cubicFeet = lengthFt * widthFt * heightFt * units;
      setValue(
        `packages.0.materials.${index}.cubicFeet`,
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
          type="number"
          {...register(`packages.0.materials.${index}.handlingUnit`, {
            valueAsNumber: true,
          })}
          fullWidth
        />

        <TextField
          label="Length"
          type="number"
          {...register(`packages.0.materials.${index}.length`, {
            valueAsNumber: true,
          })}
          fullWidth
        />
        <TextField
          label="Width"
          type="number"
          {...register(`packages.0.materials.${index}.width`, {
            valueAsNumber: true,
          })}
          fullWidth
        />
        <TextField
          label="Height"
          type="number"
          {...register(`packages.0.materials.${index}.height`, {
            valueAsNumber: true,
          })}
          fullWidth
        />

        <TextField
          select
          label="Unit"
          defaultValue="CM"
          {...register(`packages.0.materials.${index}.unit`)}
          fullWidth
        >
          <MenuItem value="CM">cm</MenuItem>
          <MenuItem value="INCH">inch</MenuItem>
          <MenuItem value="MM">mm</MenuItem>
        </TextField>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Material Type"
          {...register(`packages.0.materials.${index}.materialType`, {
            required: 'Material type is required',
          })}
          fullWidth
        />

        <TextField
          label="Cubic Feet"
          type="number"
          {...register(`packages.0.materials.${index}.cubicFeet`, {
            valueAsNumber: true,
          })}
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
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
