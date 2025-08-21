import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Collapse,
  useTheme,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faBoxesStacked,
  faMotorcycle,
  faBolt,
  faClock,
  faShippingFast,
  faCheckCircle,
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

// Services data (Regular + Express)
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

const ServicesPage = () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
    setExpandedIndex(null); // Collapse all when switching tabs
  };

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const servicesData = tabIndex === 0 ? regularServices : expressServices;

  return (
    <Stack spacing={8} sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 3, md: 6 }, py: 6 }}>
      {/* Header */}
      <Stack spacing={1} alignItems="center">
        <Typography variant="h4" fontWeight={700} color="success.main" textAlign="center">
          Our Services
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" maxWidth={700} lineHeight={1.6}>
          Explore our Regular and Express services. Click on a service to see full details and features.
        </Typography>
      </Stack>

      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 4 }}>
        <Tab label="Regular Services" />
        <Tab label="Express Services" />
      </Tabs>

      {/* Service Cards */}
      <Stack spacing={4}>
        {map((service: Service, index: number) => (
          <Card
            key={service.title}
            sx={{
              cursor: 'pointer',
              borderRadius: 4,
              boxShadow: expandedIndex === index ? '0 12px 30px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
            }}
            onClick={() => handleExpand(index)}
          >
            <CardContent sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
              <FontAwesomeIcon icon={service.icon} size="3x" color={theme.palette.success.main} />
              <Stack flex={1}>
                <Typography variant="h5" fontWeight={700} color="success.main">
                  {service.title}
                </Typography>
                <Typography variant="subtitle2" fontStyle="italic" color="text.secondary">
                  {service.tagline}
                </Typography>
              </Stack>
            </CardContent>

            {/* Expandable Section */}
            <Collapse in={expandedIndex === index}>
              <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7} paragraph>
                  {service.description}
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  Key Features:
                </Typography>
                <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                  {map((feature: string, i: number) => (
                    <li key={i} style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FontAwesomeIcon icon={faCheckCircle} color={theme.palette.success.main} />
                      <Typography variant="body2">{feature}</Typography>
                    </li>
                  ))(service.keyFeatures)}
                </Stack>
                <Typography variant="body2" fontWeight={600} color={theme.palette.success.dark} mt={1}>
                  <strong>Best For:</strong> {service.bestFor}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: theme.palette.success.main,
                    color: 'white',
                    py: 1.3,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    '&:hover': { bgcolor: theme.palette.success.dark },
                  }}
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Collapse>
          </Card>
        ))(servicesData)}
      </Stack>

      <Stack spacing={2} alignItems="center" textAlign="center" mt={6}>
        <Typography variant="h5" fontWeight={700} color={theme.palette.success.dark}>
          Timely and Safe Deliveries Across South India
        </Typography>
        <Typography variant="body2" color="text.secondary" maxWidth={700} lineHeight={1.6}>
          Custom logistics solutions tailored to your business needs. Click any service to see details and request a quote.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ServicesPage;
