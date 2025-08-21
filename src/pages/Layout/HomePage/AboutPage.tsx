import React from 'react';
import {
  Stack, Typography, Card, CardContent, Divider,
} from '@mui/material';
import { map } from 'lodash/fp';

const branches = [
  {
    name: 'Tirupur (Head Office)',
    address: '141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur, Tamil Nadu',
    contact: 'Mr. Selva Kumar',
    phone: '+91 94426 02332',
    email: 'tirupur@colombusfreight.com',
    map: 'https://www.google.com/maps/embed?...',
  },
  {
    name: 'Chennai - Manali (Corporate Office)',
    address: 'Warehouse & Port Movements, Manali, Chennai',
    contact: 'Mr. Rajinikanth',
    phone: '+91 94426 45332 / +91 99528 45332',
    email: 'chennai@colombusfreight.com',
    map: 'https://www.google.com/maps/embed?...',
  },
  {
    name: 'Coimbatore',
    address: 'Branch Office, Coimbatore, Tamil Nadu',
    contact: 'Branch Manager',
    phone: '+91 94426 47332 / +91 73050 25406',
    email: 'coimbatore@colombusfreight.com',
    map: 'https://www.google.com/maps/embed?...',
  },
  {
    name: 'Tuticorin',
    address: 'Branch Office, Tuticorin, Tamil Nadu',
    contact: 'Mr. Suresh',
    phone: '+91 73394 19991 / +91 73394 19992',
    email: 'tuticorin@colombusfreight.com',
    map: 'https://www.google.com/maps/embed?...',
  },
];

const AboutUsPage = () => (
  <Stack
    spacing={6}
    sx={{
      maxWidth: 1500, margin: '0 auto', px: { xs: 3, md: 6 }, py: 4,
    }}
  >
    <Stack spacing={2} alignItems="center" textAlign="center">
      <Typography variant="h4" fontWeight="bold">
        About Colombus Freight Logistics
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Your Trusted Logistics Partner Since 2007
      </Typography>
    </Stack>

    <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
      <Stack flex={1} spacing={2}>
        <Typography variant="h4" gutterBottom>
          Our Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Colombus Freight Logistics was founded in 2007 with a vision to
          provide reliable and cost-effective logistics solutions across South
          India. From humble beginnings with a single truck, we have grown into
          a trusted partner for businesses in garments, machinery, household
          items, electronics, and more. With a strong focus on safety,
          punctuality, and customer satisfaction, we continue to expand our
          network and services to meet the evolving needs of the logistics
          industry.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Over the years, we have strategically opened branches in key locations
          including Tirupur, Chennai, Coimbatore, Tuticorin, and Bengaluru. Our
          growing fleet of over 80 trucks ensures that we can handle high
          volumes of cargo efficiently, offering both full-load and specialized
          transport services. Each vehicle is GPS-equipped for real-time tracking,
          ensuring safety and transparency for our clients.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          At Colombus Freight Logistics, we believe in providing value-added
          services such as on-time delivery notifications, personalized logistics
          solutions, and professional handling of goods. Our commitment to
          excellence has helped us build strong, long-term relationships with
          clients across various industries.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          As we look to the future, our focus remains on innovation, operational
          efficiency, and expanding our services across South India and beyond,
          while maintaining the highest standards of service quality and
          reliability.
        </Typography>
      </Stack>
      <Stack flex={1}>
        <img
          src="/images/fleet.jpg"
          alt="Fleet"
          style={{ width: '100%', borderRadius: '16px' }}
        />
      </Stack>
    </Stack>

    <Stack spacing={4} alignItems="center">
      <Typography variant="h4" gutterBottom align="center">
        Our Branches
      </Typography>

      {map((branch: any) => (
        <Card
          key={branch.email}
          sx={{
            borderRadius: '16px', overflow: 'hidden', boxShadow: 3, width: '100%',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {branch.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {branch.address}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              <strong>Contact:</strong>
              {' '}
              {branch.contact}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong>
              {' '}
              {branch.phone}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong>
              {' '}
              {branch.email || 'N/A'}
            </Typography>
          </CardContent>
          <Stack sx={{ height: 250 }}>
            <iframe
              src={branch.map}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={branch.name}
            />
          </Stack>
        </Card>
      ))(branches)}

      <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
        With strategically located offices and fully equipped warehouses across
        Tamil Nadu and South India, Colombus Freight Logistics ensures timely
        and safe delivery of goods, providing businesses with dependable
        road freight solutions.
      </Typography>
    </Stack>
  </Stack>
);

export default AboutUsPage;
