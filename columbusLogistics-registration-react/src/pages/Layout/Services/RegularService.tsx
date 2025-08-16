import React from 'react';
import {
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { map } from 'lodash/fp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck, faBoxesStacked, faMotorcycle, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

type Service = {
  title: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  bestFor: string;
  cta: string;
  icon: any;
};

const regularServices: Service[] = [
  {
    title: 'Full Truckload (FTL) Services',
    tagline: 'Dedicated Space for Your Cargo.',
    description: 'Exclusive truck capacity for your goods ensuring faster transit and higher cargo safety.',
    keyFeatures: ['Dedicated trucks', 'Direct route', 'Secure cargo', 'Predictable timelines'],
    bestFor: 'Bulk goods, manufacturing materials, large retail consignments.',
    cta: 'Request an FTL Quote',
    icon: faTruck,
  },
  {
    title: 'Part Truckload (PTL) / Consolidated Shipping',
    tagline: 'Smart Sharing, Big Savings.',
    description: 'Share truck space with other shippers to reduce costs while maintaining reliable delivery.',
    keyFeatures: ['Pay for space used', 'Flexible shipment sizes', 'Optimized routes', 'Professional handling'],
    bestFor: 'Small-to-medium shipments, startups, cost-conscious businesses.',
    cta: 'Book a PTL Service',
    icon: faBoxesStacked,
  },
  {
    title: 'Last-Mile Delivery',
    tagline: 'The Final Step to Your Customer.',
    description: 'Products reach customers quickly and safely, enhancing satisfaction.',
    keyFeatures: ['Doorstep delivery', 'Optimized urban routes', 'Flexible scheduling', 'Instant POD updates'],
    bestFor: 'E-commerce sellers, retail chains, food distributors.',
    cta: 'Schedule a Delivery',
    icon: faMotorcycle,
  },
];

const RegularServices = () => {
  const theme = useTheme();

  return (
    <Stack
      spacing={8}
      sx={{
        maxWidth: 1200,
        margin: '0 auto',
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 4 },
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="h4" fontWeight={700} color="success.main" textAlign="center">
          Our Regular Services
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          maxWidth={700}
          lineHeight={1.6}
        >
          Comprehensive logistics solutions tailored to meet your business needs. From full
          truckloads to last-mile delivery, we’ve got you covered.
        </Typography>
      </Stack>

      <Stack spacing={6}>
        {map((service: Service) => (
          <Stack
            key={service.title}
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 6 }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              bgcolor: '#f9fafb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              },
            }}
          >
            <FontAwesomeIcon icon={service.icon} size="3x" color={theme.palette.success.main} />

            <Stack spacing={1.2} flex={1}>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {service.title}
              </Typography>
              <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
                {service.tagline}
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                {service.description}
              </Typography>

              <Stack spacing={0.5} mt={1}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Key Features:
                </Typography>
                <List dense disablePadding>
                  {map((feature: string, index: number) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0.4 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <FontAwesomeIcon icon={faCheckCircle} color={theme.palette.success.main} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ variant: 'body2', color: 'text.primary', lineHeight: 1.4 }}
                      />
                    </ListItem>
                  ))(service.keyFeatures)}
                </List>
              </Stack>

              <Typography variant="body2" fontWeight={600} color={theme.palette.success.dark} mt={0.5}>
                <strong>Best For:</strong>
                {' '}
                {service.bestFor}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: theme.palette.success.main,
                color: 'white',
                py: 1.3,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                alignSelf: { xs: 'center', md: 'flex-start' },
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {service.cta}
            </Button>
          </Stack>
        ))(regularServices)}
      </Stack>

      <Stack
        spacing={2}
        alignItems="center"
        px={{ xs: 3, md: 6 }}
        borderRadius={4}
        textAlign="center"
      >
        <Typography variant="h5" fontWeight={700} color={theme.palette.success.dark}>
          Need a Custom Solution?
        </Typography>
        <Typography variant="body2" color="text.secondary" maxWidth={700} lineHeight={1.6}>
          Our team can create a tailored logistics solution that perfectly fits your unique
          business requirements.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
            px: 3,
            py: 1.1,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { bgcolor: theme.palette.success.main, color: 'white' },
          }}
        >
          Contact Our Experts
        </Button>
      </Stack>
    </Stack>
  );
};

export default RegularServices;
