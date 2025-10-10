import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '#domain/ColombusLogistics/Navbar/Navbar';
import Footer from '#domain/ColombusLogistics/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const PublicLayout = () => (
  <Grid sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <Grid component="main" sx={{ flexGrow: 1 }}>
      <Outlet />
    </Grid>
    <Footer />
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: 'black', color: 'white' },
      }}
    />
  </Grid>
);

export default PublicLayout;
