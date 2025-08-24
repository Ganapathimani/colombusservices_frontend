import React from 'react';
import TruckCarousel from '#domain/ColombusLogistics/HomePage/TruckCarousel';
import AboutUs from '#domain/ColombusLogistics/HomePage/AboutUs';
import { Box, Stack } from '@mui/material';
import ServicesSection from '#domain/ColombusLogistics/HomePage/Services';
import FAQSection from '#domain/ColombusLogistics/HomePage/FAQSection';
import HowItWorks from '#domain/ColombusLogistics/HomePage/HowItWorks';
import ClientLogoCarousel from '#domain/ColombusLogistics/HomePage/ClientLogoCarousel';

const HomePage = () => (
  <Box sx={{ width: '100%', overflowX: 'hidden' }}>
    <Stack
      spacing={4}
      alignItems="center"
      sx={{ width: '100%', margin: 0 }}
    >
      <TruckCarousel />
      <ServicesSection />
      <HowItWorks />
      <AboutUs />
      <ClientLogoCarousel />
      <FAQSection />
    </Stack>
  </Box>
);

export default HomePage;
