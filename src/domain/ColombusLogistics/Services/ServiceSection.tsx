// src/components/Services/ServicesSection.tsx
import {
  Box,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCubes,
  faBoxOpen,
  faRoute,
  faBolt,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

const services = [
  { title: 'DOMESTIC TRANSPORT', icon: faTruck, id: 1 },
  { title: 'LOAD', icon: faCubes, id: 2 },
  { title: 'PART LOAD', icon: faBoxOpen, id: 3 },
  { title: 'TRUCK LOAD', icon: faRoute, id: 4 },
  { title: 'CONSULTING', icon: faUserTie, id: 5 },
  { title: 'FAST DELIVERY', icon: faBolt, id: 6 },
];

const ServicesSection = () => (
  <Box sx={{ py: 10, px: { xs: 2, md: 8 }, backgroundColor: '#f9fafb' }}>
    <Box textAlign="center" mb={6}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: 'text.primary', mb: 1 }}
      >
        OUR SERVICES
      </Typography>
      <Box
        sx={{
          width: 80,
          height: 3,
          bgcolor: 'success.main',
          mx: 'auto',
          borderRadius: 2,
        }}
      />
    </Box>

    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={6}
      alignItems="stretch"
      sx={{
        mt: 10,
      }}
    >
      <Box flex={1}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'text.primary', lineHeight: 1.3 }}
        >
          Smart, Fast & Reliable Logistics for Your Business
        </Typography>

        <Box sx={{
          width: 50, height: 2, bgcolor: 'success.main', mb: 3,
        }}
        />

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}
        >
          At Colombus Logistics, time and reliability define our services. We
          specialize in fast, secure, and cost-efficient transport solutions
          tailored to your business needs.
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 1 }}
        >
          <b>Fast Delivery</b>
          {' '}
          – Speed you can trust, every mile of the way.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 1 }}
        >
          <b>24×7 Service</b>
          {' '}
          – Around the clock, around the country.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 1 }}
        >
          <b>FTL & PTL Options</b>
          {' '}
          – Pay only for what you need, or book a
          full truckload.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 1 }}
        >
          <b>Express Cargo</b>
          {' '}
          – When every second counts.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8 }}
        >
          <b>Last-Mile Delivery</b>
          {' '}
          – The final step to your customer’s
          doorstep.
        </Typography>
      </Box>

      <Box flex={1}>
        <Stack
          direction="row"
          flexWrap="wrap"
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {services.map((service, i) => (
            <Box
              key={service.id}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 50%' },
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 3,
                bgcolor: '#fff',
                borderRight: i % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                borderBottom:
                  i < services.length - 2 ? '1px solid #e5e7eb' : 'none',
                minHeight: 120,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#f0fdf4',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
              }}
            >
              <FontAwesomeIcon icon={service.icon} size="2x" color="#16a34a" />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: 'text.primary' }}
              >
                {service.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default ServicesSection;
