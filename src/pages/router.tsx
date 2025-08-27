import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '#components/ErrorBoundary/ErrorBoundary';
import LogisticsRegistrationForm from '#domain/ColombusLogistics/RegistrationForm/LogisticsRegistrationForm';
import DashboardLayout from '#domain/ColombusLogistics/DashboardLayout/DashboardLayout';
import Support from '#domain/ColombusLogistics/DashboardLayout/Support';
import Profile from '#domain/ColombusLogistics/DashboardLayout/Profile';
import Layout from './Layout/Layout';
import HomePage from './Layout/HomePage/HomePage';
import AboutPage from './Layout/HomePage/AboutPage';
import TrackingPage from './Layout/HomePage/TrackingPage';
import ContactPage from './Layout/Contact/ContactPage';
import ServicesPage from './Layout/Services/Services';

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
        path: 'services',
        element: <ServicesPage />,
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
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'support',
            element: <Support />,
          },
        ],
      },
    ],
  },
]);

export default router;
