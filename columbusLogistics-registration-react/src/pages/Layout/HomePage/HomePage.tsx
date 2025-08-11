import React from 'react';
import TruckCarousel from '#domain/ColombusLogistics/HomePage/TruckCarousel';
import AboutUs from '#domain/ColombusLogistics/HomePage/AboutUs';
import { Grid } from '@mui/material';
import ServicesSection from '#domain/ColombusLogistics/HomePage/Services';

const HomePage = () => (
  <Grid>
    <TruckCarousel />
    <ServicesSection />
    <AboutUs />
  </Grid>
);

export default HomePage;
