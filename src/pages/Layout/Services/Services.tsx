import React from 'react';
import { Stack } from '@mui/material';
import HeroSection from '#domain/ColombusLogistics/Services/HeroSection';
import ServicesSection from '#domain/ColombusLogistics/Services/ServiceSection';
import CTASection from '#domain/ColombusLogistics/Services/CTASection';

const ServicesPage = () => (
  <Stack spacing={6}>
    <HeroSection />
    <ServicesSection />
    <CTASection />
  </Stack>
);

export default ServicesPage;
