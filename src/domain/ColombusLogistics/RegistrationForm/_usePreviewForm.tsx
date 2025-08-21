import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

const usePreviewForm = () => {
  const { getValues } = useFormContext<TLogisticsRegistrationForm>();
  const values = getValues();

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Review Your Details</Typography>
      <Divider />

      <pre style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        {JSON.stringify(values, null, 2)}
      </pre>

      <Typography variant="body2" color="textSecondary">
        Please review before submitting.
      </Typography>
    </Stack>
  );
};

export default usePreviewForm;
