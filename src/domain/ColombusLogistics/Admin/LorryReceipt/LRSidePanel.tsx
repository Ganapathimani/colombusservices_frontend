import React, { useState, useEffect, useCallback } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { useForm, FormProvider } from 'react-hook-form';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultValues?: TLogisticsRegistrationForm;
  onSubmit: (formData: TLogisticsRegistrationForm) => Promise<void>;
};

const steps = ['Pickup Details', 'Upload Documents'];

const LRTeamSidePanel = ({
  open, onClose, defaultValues, onSubmit,
}: Props) => {
  const methods = useForm<TLogisticsRegistrationForm>({
    defaultValues: defaultValues || {},
    mode: 'onBlur',
  });

  const [activeStep, setActiveStep] = useState(0);

  // File states
  const [ewayBill, setEwayBill] = useState<File | null>(null);
  const [packageList, setPackageList] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<File[] | null>(null);
  const [finalLR, setFinalLR] = useState<File | null>(null);

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

  const handleFile = (setter: (f: File | null) => void) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  const handleInvoices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    setInvoices(files);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight={600}>
          {defaultValues ? 'Edit Pickup Order' : 'Pickup Order'}
        </Typography>
        <IconButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </Box>

      <Divider />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ color: 'green' }}>
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
                  {defaultValues?.status || 'PENDING'}
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
              <Stack spacing={2} flexGrow={1} overflow="auto" pr={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 2: Upload Documents
                </Typography>

                {/* E-Way Bill */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📑 E-Way Bill
                  </Typography>
                  <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                    Upload E-Way Bill
                    <input type="file" accept=".pdf,image/*" hidden onChange={handleFile(setEwayBill)} />
                  </Button>
                  {ewayBill && (
                    <List dense>
                      <ListItem
                        secondaryAction={<IconButton edge="end" onClick={() => setEwayBill(null)}>✕</IconButton>}
                      >
                        <ListItemText primary={ewayBill.name} secondary={`${(ewayBill.size / 1024).toFixed(1)} KB`} />
                      </ListItem>
                    </List>
                  )}
                </Box>

                <Divider />

                {/* Package List */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📦 Package List
                  </Typography>
                  <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                    Upload Package List
                    <input type="file" accept=".pdf,.xlsx,.csv" hidden onChange={handleFile(setPackageList)} />
                  </Button>
                  {packageList && (
                    <List dense>
                      <ListItem
                        secondaryAction={<IconButton edge="end" onClick={() => setPackageList(null)}>✕</IconButton>}
                      >
                        <ListItemText primary={packageList.name} />
                      </ListItem>
                    </List>
                  )}
                </Box>

                <Divider />

                {/* Invoices */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    🧾 Invoices
                  </Typography>
                  <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                    Upload Invoices (multiple)
                    <input type="file" accept=".pdf,image/*" multiple hidden onChange={handleInvoices} />
                  </Button>
                  {invoices && invoices.length > 0 && (
                    <List dense>
                      {invoices.map((f) => (
                        <ListItem
                          key={f.name}
                          secondaryAction={<IconButton edge="end" onClick={() => setInvoices((prev) => prev?.filter((x) => x.name !== f.name) || null)}>✕</IconButton>}
                        >
                          <ListItemText primary={f.name} secondary={`${(f.size / 1024).toFixed(1)} KB`} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>

                <Divider />

                {/* Final LR */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📝 Final LR Copy
                  </Typography>
                  <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                    Upload Final LR Copy (signed)
                    <input type="file" accept=".pdf,image/*" hidden onChange={handleFile(setFinalLR)} />
                  </Button>
                  {finalLR && (
                    <List dense>
                      <ListItem
                        secondaryAction={<IconButton edge="end" onClick={() => setFinalLR(null)}>✕</IconButton>}
                      >
                        <ListItemText primary={finalLR.name} />
                      </ListItem>
                    </List>
                  )}
                </Box>
              </Stack>
            )}

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
              ) : (<div />)}

              {activeStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    backgroundColor: '#43A047', color: '#fff', '&:hover': { backgroundColor: '#2E7D32' }, borderRadius: 2, px: 3,
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#43A047', color: '#fff', '&:hover': { backgroundColor: '#2E7D32' }, borderRadius: 2, px: 3,
                  }}
                >
                  Submit
                </Button>
              )}
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default LRTeamSidePanel;
