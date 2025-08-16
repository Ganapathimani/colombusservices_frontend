import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '#components/ErrorBoundary/ErrorBoundary';
import LogisticsRegistrationForm from '#domain/ColombusLogistics/RegistrationForm/LogisticsRegistrationForm';
import Layout from './Layout/Layout';
import HomePage from './Layout/HomePage/HomePage';
import AboutPage from './Layout/HomePage/AboutPage';
import TrackingPage from './Layout/HomePage/TrackingPage';
import ContactPage from './Layout/Contact/ContactPage';
import RegularServices from './Layout/Services/RegularService';
import ExpressServices from './Layout/Services/ExpressService';

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
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'regular-services',
        element: <RegularServices />,
      },
      {
        path: 'express-services',
        element: <ExpressServices />,
      },
      {
        path: 'tracking',
        element: <TrackingPage />,
      },
      {
        path: 'registration',
        element: <LogisticsRegistrationForm />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
