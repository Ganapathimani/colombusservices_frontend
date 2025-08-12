import React from 'react';
import TruckCarousel from '#domain/ColombusLogistics/HomePage/TruckCarousel';
import AboutUs from '#domain/ColombusLogistics/HomePage/AboutUs';
import { Grid } from '@mui/material';
import ServicesSection from '#domain/ColombusLogistics/HomePage/Services';
import FAQSection from '#domain/ColombusLogistics/HomePage/FAQSection';

const HomePage = () => (
  <Grid>
    <TruckCarousel />
    <ServicesSection />
    <AboutUs />
    <FAQSection />
  </Grid>
);

export default HomePage;
