import React, { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button, Stepper, Step, StepLabel, Stack,
} from '@mui/material';
import { useOrderUpsertMutation } from '#api/colombusLogisticsApi';
import type { TLogisticsRegistrationForm } from '../../models/TLogisticsRegistrationForm';
import OriginForm from './_useOriginForm';
import DestinationForm from './_useDestinationForm';
import CargoForm from './_useCargoForm';
import VehicleForm from './_useVehicleForm';
import ReviewForm from './_usePreviewForm';

const steps = ['Origin', 'Destination', 'Cargo', 'Vehicle', 'Review'];

const LogisticsRegistrationWizard = () => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: {},
    mode: 'onBlur',
  });

  const [orderUpsert] = useOrderUpsertMutation();

  const [activeStep, setActiveStep] = useState(0);

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
        cargoDetails: formData.cargoDetails.map((cargo) => ({
          ...cargo,
        })),
      };
      await orderUpsert(payload).unwrap();
    } catch (err: any) {
      console.error('Error submitting order:', err);
    }
  }, [orderUpsert]);

  return (
    <FormProvider {...methods}>
      <Stack spacing={4} maxWidth={900} margin="auto" p={4}>
        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepIcon-root': {
              color: '#A5D6A7', // default
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

        {/* Form */}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {activeStep === 0 && <OriginForm />}
          {activeStep === 1 && <DestinationForm />}
          {activeStep === 2 && <CargoForm />}
          {activeStep === 3 && <VehicleForm />}
          {activeStep === 4 && <ReviewForm />}

          {/* Buttons */}
          <Stack direction="row" justifyContent="space-between" mt={4}>
            {/* Back Button */}
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

            {activeStep < steps.length - 1 ? (
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
