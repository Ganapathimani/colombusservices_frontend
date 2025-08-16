import React from 'react';
import TruckCarousel from '#domain/ColombusLogistics/HomePage/TruckCarousel';
import AboutUs from '#domain/ColombusLogistics/HomePage/AboutUs';
import { Grid } from '@mui/material';
import ServicesSection from '#domain/ColombusLogistics/HomePage/Services';
import FAQSection from '#domain/ColombusLogistics/HomePage/FAQSection';
import HowItWorks from '#domain/ColombusLogistics/HomePage/HowItWorks';

const HomePage = () => (
  <Grid>
    <TruckCarousel />
    <ServicesSection />
    <HowItWorks />
    <AboutUs />
    <FAQSection />
  </Grid>
);

export default HomePage;
