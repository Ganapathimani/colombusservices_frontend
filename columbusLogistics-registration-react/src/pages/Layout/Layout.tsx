import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '#domain/ColombusLogistics/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '#domain/ColombusLogistics/Footer/Footer';

const Layout = () => (
  <Grid>
    <Navbar />
    <Outlet />
    <Footer />
  </Grid>
);

export default Layout;
