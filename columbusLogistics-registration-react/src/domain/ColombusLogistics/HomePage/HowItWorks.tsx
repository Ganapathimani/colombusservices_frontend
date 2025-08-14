import React from 'react';
import { Stack, Typography } from '@mui/material';
import {
  faPhoneAlt,
  faWarehouse,
  faSatelliteDish,
  faTruck,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash/fp';
import StepRow from './_stepRow';

const steps = [
  {
    icon: faPhoneAlt,
    title: 'Booking & Scheduling',
    description:
      'Clients can easily book cargo transportation through our phone line, email support, or by visiting our branch offices. Our team coordinates pickup schedules based on customer requirements, ensuring timely dispatch and smooth logistics planning.',
  },
  {
    icon: faWarehouse,
    title: 'Cargo Handling & Storage',
    description:
      'Upon arrival, goods are carefully inspected, sorted, and securely stored in our well-maintained warehouses. We follow strict safety protocols to prevent damage, ensure optimal storage conditions, and prepare cargo for onward transportation.',
  },
  {
    icon: faSatelliteDish,
    title: 'Real-Time Tracking',
    description:
      'All our vehicles are equipped with GPS technology, enabling customers to monitor their shipments at every stage of the journey. Live tracking updates ensure transparency, enhance security, and keep clients informed about estimated delivery times.',
  },
  {
    icon: faTruck,
    title: 'Transportation & Delivery',
    description:
      'Our modern fleet of trucks and delivery vehicles ensures prompt and safe transportation of goods across Tamil Nadu and the southern region. We prioritize on-time delivery while maintaining the integrity and quality of the cargo.',
  },
  {
    icon: faClipboardCheck,
    title: 'Confirmation & Documentation',
    description:
      'Once the shipment is successfully delivered, customers receive Proof of Delivery (POD) and Image of Delivery (IOD) documents. These serve as official records, ensuring accountability and building trust in our service process.',
  },
];

const HowItWorks = () => {
  const rows = Array.from({ length: Math.ceil(steps.length / 3) }).map((_, index) => {
    const start = index * 3;
    return {
      steps: steps.slice(start, start + 3),
      reverse: index % 2 !== 0,
    };
  });

  return (
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1rem',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="green">
        How It Works
      </Typography>

      {map(
        (row) => (
          <StepRow
            key={row.steps.map((a: any) => a.title).join('-')}
            steps={row.steps}
            reverse={row.reverse}
          />
        ),
        rows,
      )}
    </Stack>
  );
};

export default HowItWorks;
