import {
  TextField,
  Typography,
  Stack,
  InputAdornment,
  Button,
  Alert,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShuttleVan,
  faDriversLicense,
  faContactBook,
} from '@fortawesome/free-solid-svg-icons';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useUpdateOrderMutation } from '#api/colombusLogisticsApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

type EditOrder = {
  currentEditOrder: any
};

type UpdateVehicleDetailsForm = {
  currentEditOrder: EditOrder,
  vehicleNumber: string,
  driverMobile: string,
  driverName: string,
  pickupTeamNotes: string
};

type EditOrderModalProps = {
  currentEditOrder: EditOrder,
  onClose: () => void
};

const AddVechileDetailsModal = ({ currentEditOrder, onClose }: EditOrderModalProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateVehicleDetailsForm>({ mode: 'onTouched' });
  const [updateOrder] = useUpdateOrderMutation();

  const onSubmit: SubmitHandler<UpdateVehicleDetailsForm> = async (formProps) => {
    try {
      const { id } = currentEditOrder as { id: string };
      const response = await updateOrder({
        orderId: id,
        data: { ...currentEditOrder, ...formProps, status: 'PICKED_UP' },
      });
      if (response.data) {
        toast.success('Order updated Successfully');
        onClose();
        reset();
      }
    } catch (error) {
      setErrorMessage('Order update failed');
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: '#f0fdf4' }}>
      <Stack
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'white',
          boxShadow: 6,
          width: 420,
          maxWidth: '96vw',
        }}
      >
        <Typography variant="h5" color="text.secondary" mb={3}>
          Update Order
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Vehicle Number"
            {...register('vehicleNumber', { required: 'Vehicle number is required' })}
            fullWidth
            error={!!errors.vehicleNumber}
            helperText={errors.vehicleNumber?.message}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faShuttleVan} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Driver Name"
            {...register('driverName', { required: 'Driver name is required' })}
            fullWidth
            error={!!errors.driverName}
            helperText={errors.driverName?.message}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faDriversLicense} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Driver Contact number"
            {...register('driverMobile', { required: 'Driver contact number is required' })}
            fullWidth
            error={!!errors.driverMobile}
            helperText={errors.driverMobile?.message}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faContactBook} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Remarks (Anything about order)"
            {...register('pickupTeamNotes')}
            multiline
            margin="normal"
            rows={3}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#166534',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#14532d' },
            }}
          >
            Move this to LR Team
          </Button>
        </form>
      </Stack>
      {errorMessage && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage}
      </Alert>
      )}
    </Stack>
  );
};

export default AddVechileDetailsModal;
