import React, { useState, useEffect, useCallback } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm, FormProvider } from 'react-hook-form';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultValues?: TLogisticsRegistrationForm;
  onSubmit: (formData: TLogisticsRegistrationForm) => Promise<void>;
};

const steps = ['Pickup Details', 'Vehicle & Driver Info'];

const PickupTeamSidePanel = ({
  open,
  onClose,
  defaultValues,
  onSubmit,
}: Props) => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: defaultValues || {},
    mode: 'onBlur',
  });

  const [activeStep, setActiveStep] = useState(0);

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      await methods.handleSubmit(onSubmit)(e);
    } else {
      await handleNext();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 560 },
          maxWidth: '100%',
          p: 0,
          borderRadius: '12px 0 0 12px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        sx={{ borderBottom: '1px solid #e0e0e0' }}
      >
        <Typography variant="h6" fontWeight={600}>
          {defaultValues ? 'Edit Pickup Order' : 'Pickup Order'}
        </Typography>
        <IconButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </Box>

      <Divider />

      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ color: 'green' }}
            >
              Step
              {' '}
              {activeStep + 1}
              {' '}
              of
              {' '}
              {steps.length}
              :
              {' '}
              {steps[activeStep]}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {activeStep === 0 && (
              <Stack spacing={2}>
                <Typography variant="body2">
                  <b>Customer:</b>
                  {' '}
                  {defaultValues?.bookedCustomerName || '—'}
                </Typography>
                <Typography variant="body2">
                  <b>Contact:</b>
                  {' '}
                  {defaultValues?.bookedPhoneNumber || '—'}
                </Typography>
                <Typography variant="body2">
                  <b>Status:</b>
                  {' '}
                  {defaultValues?.status || 'Pending'}
                </Typography>

                {defaultValues?.pickups?.map((p) => (
                  <Box key={p.email}>
                    <Typography variant="subtitle1" mt={2}>
                      <b>Pickup Location:</b>
                      {' '}
                      {p.location}
                    </Typography>
                    <Typography variant="body2">{p.address}</Typography>
                    <Typography variant="body2">
                      <b>Date:</b>
                      {' '}
                      {p.pickupDate?.toString() || 'N/A'}
                    </Typography>
                  </Box>
                ))}

                <Divider />

                {defaultValues?.deliveries?.map((d) => (
                  <Box key={d.email}>
                    <Typography variant="subtitle1">
                      <b>Delivery To:</b>
                      {' '}
                      {d.location}
                    </Typography>
                    <Typography variant="body2">{d.address}</Typography>
                  </Box>
                ))}

                <Divider />

                <Typography variant="body2">
                  <b>Vehicle Type:</b>
                  {' '}
                  {defaultValues?.vehicles?.[0]?.vehicleType || '—'}
                </Typography>
                <Typography variant="body2">
                  <b>FTL Type:</b>
                  {' '}
                  {defaultValues?.vehicles?.[0]?.ftlType || '—'}
                </Typography>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2}>
                <TextField
                  label="Vehicle Number"
                  fullWidth
                  {...methods.register('vehicleNumber', { required: true })}
                />
                <TextField
                  label="Driver Name"
                  fullWidth
                  {...methods.register('driverName', { required: true })}
                />
                <TextField
                  label="Driver Mobile"
                  fullWidth
                  {...methods.register('driverMobile', { required: true })}
                />
                <TextField
                  label="Pickup Team Notes"
                  fullWidth
                  multiline
                  minRows={3}
                  {...methods.register('pickupTeamNotes')}
                />
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between" mt={4}>
              {activeStep > 0 ? (
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
              ) : (
                <div />
              )}

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
                {activeStep < steps.length - 1 ? 'Next' : 'Submit'}
              </Button>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default PickupTeamSidePanel;
