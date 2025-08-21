import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { map, size } from 'lodash/fp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faLocationDot, faPhone,
} from '@fortawesome/free-solid-svg-icons';

type Branch = {
  branch: string;
  address: string;
  phone: string[];
  email: string[];
};

const branches: Branch[] = [
  {
    branch: 'Head Office - Tirupur',
    address:
      '141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur, Tamil Nadu',
    phone: ['9442602332'],
    email: ['tirupur@colombusfreight.com', 'customercare@colombusfreight.com'],
  },
  {
    branch: 'Corporate Office - Chennai',
    address: 'Chennai (Manali, Pammal) - Warehouse & Port Movements',
    phone: ['9442645332', '9952845332'],
    email: ['chennai@colombusfreight.com'],
  },
  {
    branch: 'Coimbatore',
    address: 'Branch Office, Coimbatore, Tamil Nadu',
    phone: ['9442647332', '7305025406'],
    email: ['coimbatore@colombusfreight.com'],
  },
  {
    branch: 'Tuticorin',
    address: 'Branch Office, Tuticorin, Tamil Nadu',
    phone: ['7339419991', '7339419992'],
    email: [],
  },
];

const ContactPage = () => (
  <Stack
    spacing={4}
    sx={{
      maxWidth: 1500, margin: '0 auto', px: { xs: 3, md: 6 }, py: { xs: 4, md: 4 },
    }}
  >
    <Stack spacing={3}>
      <Typography variant="h4" textAlign="center" fontWeight="bold">
        Our Branches
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={4}
        spacing={0}
        justifyContent="center"
      >
        {map((branch: Branch) => (
          <Card
            key={branch.branch}
            sx={{
              width: {
                xs: '100%',
                sm: '50%',
                md: 400,
              },
              borderRadius: 4,
              p: 1,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 6px 28px rgba(0,0,0,0.15)',
                transform: 'translateY(-4px)',
              },
            }}
          >

            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <FontAwesomeIcon icon={faBuilding} color="#16a34a" />
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {branch.branch}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <FontAwesomeIcon icon={faLocationDot} size="sm" color="#6b7280" />
                <Typography variant="body2" color="text.secondary">
                  {branch.address}
                </Typography>
              </Stack>

              {size(branch.phone) > 0 && (
                <Stack mb={2}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <FontAwesomeIcon icon={faPhone} size="sm" color="#6b7280" />
                    <Typography variant="body2" fontWeight="medium" color="success.dark">
                      Phone:
                    </Typography>
                  </Stack>
                  <Stack pl={4}>
                    {map((ph: string) => (
                      <Typography key={ph} variant="body2" color="success.main">
                        {ph}
                      </Typography>
                    ))(branch.phone)}
                  </Stack>
                </Stack>
              )}

              {size(branch.email) > 0 && (
                <Stack>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <FontAwesomeIcon icon={faEnvelope} size="sm" color="#6b7280" />
                    <Typography variant="body2" fontWeight="medium" color="success.dark">
                      Email:
                    </Typography>
                  </Stack>
                  <Stack pl={3}>
                    {map((em: string) => (
                      <Typography key={em} variant="body2" color="success.main">
                        {em}
                      </Typography>
                    ))(branch.email)}
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>
        ))(branches)}
      </Stack>
    </Stack>

    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 6px 28px rgba(0,0,0,0.12)',
          p: 4,
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" fontSize="22px" fontWeight="bold">
            Contact Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For enquiries, please contact us at:
            <Typography component="span" fontWeight="bold" color="success.main"> 9442602332 </Typography>
          </Typography>

          <Divider flexItem />

          <Stack spacing={2} width="100%">
            <TextField required label="Full Name" variant="outlined" fullWidth />
            <TextField required label="Email Address" type="email" variant="outlined" fullWidth />
            <TextField required label="Phone Number" type="tel" variant="outlined" fullWidth />
            <TextField
              label="Subject (Enquiry / Complaint / Contact)"
              required
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Message"
              required
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                bgcolor: 'success.main',
                '&:hover': { bgcolor: 'success.dark' },
              }}
            >
              Send Message
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>

  </Stack>
);

export default ContactPage;
