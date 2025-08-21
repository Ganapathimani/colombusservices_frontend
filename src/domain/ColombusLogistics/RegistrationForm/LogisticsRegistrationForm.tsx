import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button, Stepper, Step, StepLabel, Stack,
} from '@mui/material';
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

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: TLogisticsRegistrationForm) => {
    console.log('Final Submit:', data);
  };

  return (
    <FormProvider {...methods}>
      <Stack spacing={4} maxWidth={900} margin="auto" p={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
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
          {activeStep === 4 && <ReviewForm />}

          <Stack direction="row" justifyContent="space-between" mt={4}>
            {activeStep > 0 && (
              <Button onClick={handleBack} variant="outlined">
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button onClick={handleNext} variant="contained">
                Next
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
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
