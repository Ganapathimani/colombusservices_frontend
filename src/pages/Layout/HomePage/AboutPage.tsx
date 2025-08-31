import React from 'react';
import {
  Stack, Typography, Card,
  CardContent, Divider, Link, Box,
} from '@mui/material';
import { map } from 'lodash/fp';

const branches = [
  {
    name: 'Tirupur (Head Office)',
    address:
      '141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur, Tamil Nadu',
    contact: 'Mr. Selva Kumar',
    phone: '+91 94426 02332',
    email: 'tirupur@colombusfreight.com',
    mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.3606428897747!2d77.296803!3d11.160910899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907dcf73c93f7%3A0xef2846de0e34092b!2sColombus%20Tirupur!5e0!3m2!1sen!2sin!4v1756613053959!5m2!1sen!2sin',
  },
  {
    name: 'Chennai - Manali (Corporate Office)',
    address: 'Warehouse & Port Movements, Manali, Chennai',
    contact: 'Mr. Rajinikanth',
    phone: '+91 94426 45332 / +91 99528 45332',
    email: 'chennai@colombusfreight.com',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.262956602965!2d80.27260150000001!3d13.17608595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52653e6a8d316d%3A0xf125e0fa69c48747!2sManali%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1756613195121!5m2!1sen!2sin',
  },
  {
    name: 'Coimbatore',
    address: 'Branch Office, Coimbatore, Tamil Nadu',
    contact: 'Branch Manager',
    phone: '+91 94426 47332 / +91 73050 25406',
    email: 'coimbatore@colombusfreight.com',
    mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.4228613965624!2d77.12119826310054!3d11.099765640373828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff0033913e47%3A0x17774a3530a1c6c4!2sColombus%20Transport!5e0!3m2!1sen!2sin!4v1756613238421!5m2!1sen!2sin',
  },
  {
    name: 'Chennai - Pammal',
    address: 'Branch Office, Pammal, Chennai',
    contact: 'Branch Manager',
    phone: '+91 73394 19991 / +91 73394 19992',
    email: 'pammal@colombusfreight.com',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.008963053885!2d80.1416678!3d12.9712781!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e332152f535%3A0x74e23acbd0523f08!2sCOLOMBUS%20FREIGHT%20LOGISTICS%20PVT%20LTD.!5e0!3m2!1sen!2sin!4v1756613157090!5m2!1sen!2sin',
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
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 3,
            width: '100%',
            maxWidth: 800,
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {branch.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {branch.address}
            </Typography>

            <Typography variant="body2">
              <strong>Contact:</strong>
              {' '}
              {branch.contact}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong>
              {' '}
              <Link href={`tel:${branch.phone}`} underline="hover" color="primary">
                {branch.phone}
              </Link>
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong>
              {' '}
              <Link href={`mailto:${branch.email}`} underline="hover" color="primary">
                {branch.email}
              </Link>
            </Typography>
          </CardContent>

          <Divider />

          <Box sx={{ width: '100%', height: { xs: 250, md: 350 } }}>
            <iframe
              title={branch.name}
              src={branch.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </Box>
        </Card>
      ))(branches)}

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 4, textAlign: 'center' }}
      >
        With strategically located offices and fully equipped warehouses across
        Tamil Nadu and South India, Colombus Freight Logistics ensures timely
        and safe delivery of goods, providing businesses with dependable road
        freight solutions.
      </Typography>
    </Stack>

  </Stack>
);

export default AboutUsPage;
