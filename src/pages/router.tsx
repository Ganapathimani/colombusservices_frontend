import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '#components/ErrorBoundary/ErrorBoundary';
import Layout from './Layout/Layout';

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    path: '/',
    element: <Layout />,
  },
]);

export default router;
