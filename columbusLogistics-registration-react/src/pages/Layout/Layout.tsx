import TruckCarousel from '#domain/ColombusLogistics/HomePage/TruckCarousel';
import Navbar from '#domain/ColombusLogistics/Navbar/Navbar';
import { Grid } from '@mui/material';
import React from 'react';

const Layout = () => (
  <Grid>
    <Navbar />
    <TruckCarousel />
  </Grid>
);

export default Layout;
