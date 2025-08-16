import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  let errorMessage = 'Please contact support if you need assistance.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = 'We could not find the page you are looking for. It might have moved or never existed.';
    }

    if (error.status === 401) {
      errorMessage = 'You are not authorized to view this content. Contact an admin if needed.';
    }
  }

  return (
    <Grid container padding="2% 2%">
      <Grid>
        <Typography variant="h3">
          Something went wrong!
        </Typography>
        <Typography>
          {errorMessage}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorBoundary;
