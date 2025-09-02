import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '#domain/ColombusLogistics/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '#domain/ColombusLogistics/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => (
  <Grid>
    <Navbar />
    <Outlet />
    <Footer />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'black',
          color: 'white',
        },
      }}
    />
  </Grid>
);

export default Layout;
