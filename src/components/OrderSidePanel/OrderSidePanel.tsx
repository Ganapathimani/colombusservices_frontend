import React, { useState, useCallback, useEffect } from 'react';
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import { useCreateOrderMutation, useUpdateOrderMutation } from '#api/colombusLogisticsApi';
import CustomerDetailsForm from '#domain/ColombusLogistics/RegistrationForm/_useCustomerDetailsForm';
import OriginForm from '#domain/ColombusLogistics/RegistrationForm/_useOriginForm';
import DestinationForm from '#domain/ColombusLogistics/RegistrationForm/_useDestinationForm';
import CargoForm from '#domain/ColombusLogistics/RegistrationForm/_useCargoForm';
import VehicleForm from '#domain/ColombusLogistics/RegistrationForm/_useVehicleForm';

type OrderSidePanelProps = {
  open: boolean;
  onClose: () => void;
  defaultValues?: TLogisticsRegistrationForm;
  title?: string;
};

const steps = ['Customer Details', 'PickUp', 'Delivery', 'Packages', 'Vehicle'];

const OrderSidePanel = ({
  open,
  onClose,
  defaultValues,
  title,
}: OrderSidePanelProps) => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: defaultValues || {},
    mode: 'onBlur',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [orderUpsert] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const handleNext = useCallback(async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  }, [methods]);

  const handleBack = useCallback(() => setActiveStep((prev) => prev - 1), []);

  const onSubmit = useCallback(
    async (formData: TLogisticsRegistrationForm) => {
      try {
        const payload: TLogisticsRegistrationForm = {
          ...formData,
          packages: formData.packages?.map(({ hasDimensions, ...rest }) => rest) || [],
        };

        if (defaultValues?.id) {
          await updateOrder({ orderId: defaultValues.id, data: payload }).unwrap();
          toast.success('Order updated successfully');
        } else {
          await orderUpsert(payload).unwrap();
          toast.success('Order created successfully');
        }

        methods.reset();
        setActiveStep(0);
        onClose();
      } catch (err) {
        toast.error('Failed to save order');
      }
    },
    [defaultValues?.id!, methods, onClose, updateOrder, orderUpsert],
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 650 },
          maxWidth: '100%',
          p: 0,
          borderRadius: '12px 0 0 12px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight={600}>
          {title || (defaultValues ? 'Edit Order' : 'Create Order')}
        </Typography>
        <IconButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </Box>

      <Divider />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                '& .MuiStepIcon-root': {
                  color: '#A5D6A7',
                  '&.Mui-active': { color: '#43A047' },
                  '&.Mui-completed': { color: '#2E7D32' },
                },
                '& .MuiStepLabel-label.Mui-active': { color: '#2E7D32', fontWeight: 'bold' },
                '& .MuiStepLabel-label.Mui-completed': { color: '#1B5E20' },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box mt={4}>
              {activeStep === 0 && <CustomerDetailsForm />}
              {activeStep === 1 && <OriginForm />}
              {activeStep === 2 && <DestinationForm />}
              {activeStep === 3 && <CargoForm />}
              {activeStep === 4 && <VehicleForm />}
            </Box>

            <Stack direction="row" justifyContent="space-between" mt={4}>
              {activeStep > 0 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    borderColor: '#43A047',
                    color: '#43A047',
                    '&:hover': { backgroundColor: '#A5D6A7' },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Back
                </Button>
              )}

              {activeStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    backgroundColor: '#43A047',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#2E7D32' },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#43A047',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#2E7D32' },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Update Order
                </Button>
              )}
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default OrderSidePanel;
