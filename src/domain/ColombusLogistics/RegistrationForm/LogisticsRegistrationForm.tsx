import React, { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button, Stepper, Step, StepLabel, Stack,
} from '@mui/material';
import { useOrderUpsertMutation } from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';
import type { TLogisticsRegistrationForm } from '../../models/TLogisticsRegistrationForm';
import OriginForm from './_useOriginForm';
import DestinationForm from './_useDestinationForm';
import CargoForm from './_useCargoForm';
import VehicleForm from './_useVehicleForm';

const steps = ['Origin', 'Destination', 'Cargo', 'Vehicle'];

const LogisticsRegistrationWizard = () => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const [orderUpsert] = useOrderUpsertMutation();

  const [activeStep, setActiveStep] = useState(0);

  const storedUser = localStorage.getItem('user');
  let customerName: string | null = null;
  let customerEmail: string | null = null;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      customerName = user?.value?.name ?? null;
      customerEmail = user?.value?.email ?? null;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = useCallback(async (formData: TLogisticsRegistrationForm) => {
    try {
      const payload = {
        ...formData,
        customer: {
          name: customerName,
          email: customerEmail,
        },
        cargoDetails: formData.cargoDetails.map((cargo) => ({
          ...cargo,
        })),
      };
      await orderUpsert(payload).unwrap();
      methods.reset();
      toast.success('Order created Successfully');
      setActiveStep(0);
    } catch (err: any) {
      throw new Error(err);
    }
  }, [customerName, customerEmail, orderUpsert, methods]);

  return (
    <FormProvider {...methods}>
      <Stack spacing={4} maxWidth={900} margin="auto" p={4}>
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

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {activeStep === 0 && <OriginForm />}
          {activeStep === 1 && <DestinationForm />}
          {activeStep === 2 && <CargoForm />}
          {activeStep === 3 && <VehicleForm />}

          <Stack direction="row" justifyContent="space-between" mt={4}>
            {activeStep > 0 ? (
              <Button
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderColor: '#43A047',
                  color: '#43A047',
                  '&:hover': {
                    backgroundColor: '#A5D6A7',
                    borderColor: '#43A047',
                  },
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {activeStep < steps.length ? (
              <Button
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
                Submit
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </FormProvider>
  );
};

export default LogisticsRegistrationWizard;
