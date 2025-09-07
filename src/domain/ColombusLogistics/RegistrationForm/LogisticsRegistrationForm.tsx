import React, { useCallback, useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button, Stepper, Step, StepLabel, Stack, Typography,
} from '@mui/material';
import { useOrderUpsertMutation, useUpdateOrderMutation } from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import OriginForm from './_useOriginForm';
import DestinationForm from './_useDestinationForm';
import CargoForm from './_useCargoForm';
import VehicleForm from './_useVehicleForm';
import CustomerDetailsForm from './_useCustomerDetailsForm';

const steps = ['Customer Details', 'Origin', 'Destination', 'Cargo', 'Vehicle'];

type LogisticsRegistrationWizardProps = {
  defaultValues?: TLogisticsRegistrationForm;
  onClose?: () => void;
  title?: string;
  onSubmitSuccess?: (updatedData: TLogisticsRegistrationForm) => void;
};

const LogisticsRegistrationWizard = ({
  defaultValues,
  onClose,
  onSubmitSuccess,
  title = 'Create Order',
}: LogisticsRegistrationWizardProps) => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: defaultValues || {},
    mode: 'onBlur',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [orderUpsert] = useOrderUpsertMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const storedUser = localStorage.getItem('user');
  let customerName: string | null = null;
  let customerEmail: string | null = null;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      customerName = user?.value?.name ?? null;
      customerEmail = user?.value?.email ?? null;
    } catch {
      throw new Error('Failed to get user');
    }
  }

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
        console.log(formData);
        const payload = {
          ...formData,
          customer: { name: customerName, email: customerEmail },
          cargoDetails: formData.cargoDetails.map((c) => ({ ...c })),
        };

        if (defaultValues?.id) {
          await updateOrder({ orderId: defaultValues.id, data: payload }).unwrap();
          toast.success('Order updated successfully');
          onSubmitSuccess?.(payload);
        } else {
          await orderUpsert(payload).unwrap();
          toast.success('Order created successfully');
        }

        methods.reset();
        setActiveStep(0);
        onClose?.();
      } catch (err) {
        toast.error('Failed to save order');
      }
    },
    [
      customerName, customerEmail,
      defaultValues?.id, methods, onClose, updateOrder,
      onSubmitSuccess, orderUpsert,
    ],
  );

  return (
    <FormProvider {...methods}>
      <Stack spacing={4} maxWidth={900} margin="auto" p={4}>
        <Typography variant="h5" fontWeight={600}>{title}</Typography>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepIcon-root': { color: '#A5D6A7', '&.Mui-active': { color: '#43A047' }, '&.Mui-completed': { color: '#2E7D32' } },
            '& .MuiStepLabel-label.Mui-active': { color: '#2E7D32', fontWeight: 'bold' },
            '& .MuiStepLabel-label.Mui-completed': { color: '#1B5E20' },
          }}
        >
          {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {activeStep === 0 && <CustomerDetailsForm />}
          {activeStep === 1 && <OriginForm />}
          {activeStep === 2 && <DestinationForm />}
          {activeStep === 3 && <CargoForm />}
          {activeStep === 4 && <VehicleForm />}

          <Stack direction="row" justifyContent="space-between" mt={4}>
            {activeStep > 0 ? (
              <Button
                type="button"
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderColor: '#43A047', color: '#43A047', '&:hover': { backgroundColor: '#A5D6A7' }, borderRadius: 2, px: 3,
                }}
              >
                Back
              </Button>
            ) : <div />}

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
                {defaultValues ? 'Update Order' : 'Create Order'}
              </Button>
            )}

          </Stack>
        </form>
      </Stack>
    </FormProvider>
  );
};

export default LogisticsRegistrationWizard;
