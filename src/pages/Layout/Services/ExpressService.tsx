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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faBolt, faClock, faShippingFast,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash/fp';

type Service = {
  title: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  bestFor: string;
  cta: string;
  icon: any;
};

const expressServices: Service[] = [
  {
    title: 'Fast Delivery',
    tagline: 'Speed You Can Trust, Every Mile of the Way.',
    description: 'Urgent shipments handled with priority scheduling, dedicated vehicles, and express routes.',
    keyFeatures: ['Priority shipment handling', 'Express lanes', 'Real-time GPS tracking', 'Guaranteed delivery'],
    bestFor: 'Urgent consignments, retail stock replenishment, event supplies.',
    cta: 'Get a Quote Now',
    icon: faBolt,
  },
  {
    title: '24×7 Delivery',
    tagline: 'Around the Clock, Around the Country.',
    description: 'Operate round-the-clock including weekends and holidays with flexible pickup options.',
    keyFeatures: ['24/7 availability', 'Weekend & holiday delivery', 'Dedicated support team', 'Flexible pickup'],
    bestFor: 'E-commerce deliveries, medical supplies, urgent industrial shipments.',
    cta: 'Book a 24×7 Delivery',
    icon: faClock,
  },
  {
    title: 'Express Cargo Service',
    tagline: 'When Every Second Counts.',
    description: 'Shortest possible transit time for high-priority shipments, with dedicated resources and routes.',
    keyFeatures: ['Guaranteed express delivery', 'Priority dispatching', 'Minimal handling points', 'Dedicated routes'],
    bestFor: 'Event goods, medical equipment, emergency industrial supplies.',
    cta: 'Send an Express Cargo',
    icon: faShippingFast,
  },
];

const ExpressServices = () => {
  const theme = useTheme();

  return (
    <Stack
      spacing={8}
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 4 },
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="h4" fontWeight={700} color="success.main" textAlign="center">
          Our Express Services
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          maxWidth={700}
          lineHeight={1.6}
        >
          Quick and reliable express logistics solutions designed for urgent
          and high-priority shipments.
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
                transform: 'translateY(-3px)',
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
        ))(expressServices)}
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

export default ExpressServices;
