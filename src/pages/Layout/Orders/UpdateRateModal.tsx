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
  faIndianRupeeSign,
  faPersonCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useUpdateOrderMutation } from '#api/colombusLogisticsApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

type EditOrder = {
  currentEditOrder: any
};

type UpdateRateForm = {
  currentEditOrder: EditOrder,
  rate: number,
  rateQuotedBy: string,
  notes: string
};

type EditOrderModalProps = {
  currentEditOrder: EditOrder,
  onClose: () => void
};

const UpdateRateModal = ({ currentEditOrder, onClose }: EditOrderModalProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateRateForm>({ mode: 'onTouched' });
  const [updateOrder] = useUpdateOrderMutation();

  const onSubmit: SubmitHandler<UpdateRateForm> = async (formProps) => {
    try {
      const status = 'CONFIRMED';
      const response = await updateOrder({
        orderId: currentEditOrder?.id,
        data: { ...currentEditOrder, ...formProps, status },
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
            placeholder="Order Rate"
            {...register('rate', { required: 'Order rate is required' })}
            fullWidth
            error={!!errors.rate}
            helperText={errors.rate?.message}
            type="number"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faIndianRupeeSign} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Rate Quote by"
            {...register('rateQuotedBy', { required: 'Rate Quoted by is required' })}
            fullWidth
            error={!!errors.rateQuotedBy}
            helperText={errors.rateQuotedBy?.message}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faPersonCircleQuestion} color="#6b7280" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Remarks (Anything about order)"
            {...register('notes')}
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
            Confirm order
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

export default UpdateRateModal;
