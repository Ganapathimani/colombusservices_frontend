import React from 'react';
import {
  Stack, Typography, Card, CardContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruckFast,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { chunk, map } from 'lodash/fp';

type Service = {
  icon: any;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: faTruckFast,
    title: 'Road Freight',
    description:
      'We provide fast, safe, and reliable road freight transport for both short and long distances. Our GPS-enabled fleet and experienced drivers ensure your goods arrive on time and in perfect condition across South India.',
  },
  {
    icon: faWarehouse,
    title: 'Warehousing',
    description:
      'Our secure warehouses are strategically located for quick access to major transportation routes. With advanced inventory tracking, climate control, and 24/7 surveillance, your goods are always protected and easily accessible.',
  },
];

const ServicesSection = () => (
  <Stack
    spacing={4}
    sx={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '4rem 1rem',
    }}
  >
    <Stack spacing={1} alignItems="center" textAlign="center">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: '#2E7D32', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
      >
        Our Services
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        maxWidth="700px"
        sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
      >
        At Colombus Freight Logistics, we offer a complete range of logistics
        solutions to move your goods efficiently, securely, and on time.
        Whether by road, sea, or air, we have the expertise to deliver.
      </Typography>
    </Stack>

    <Stack spacing={3}>
      {map((row: Service[]) => (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} key={row[0].title}>
          {map((service: Service) => (
            <Card
              key={service.title}
              sx={{
                flex: 1,
                textAlign: 'center',
                padding: '1.8rem',
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent>
                <FontAwesomeIcon
                  icon={service.icon}
                  size="3x"
                  style={{
                    marginBottom: '1rem',
                    color: '#388E3C',
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: '#1B5E20', fontSize: '1.25rem' }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#4E342E', lineHeight: 1.7, fontSize: '1rem' }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))(row)}
        </Stack>
      ))(chunk(2)(services))}
    </Stack>
  </Stack>
);

export default ServicesSection;
