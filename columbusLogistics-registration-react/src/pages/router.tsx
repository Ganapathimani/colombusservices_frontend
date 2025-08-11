import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '#components/ErrorBoundary/ErrorBoundary';
import Layout from './Layout/Layout';
import HomePage from './Layout/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        // element: <ServicesSection />,
      },
    ],
  },
]);

export default router;
