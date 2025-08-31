import React from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const SupportSection = () => (
  <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={5}
      alignItems="stretch"
    >
      <Stack
        sx={{
          flex: 1,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          color="#14532D"
          gutterBottom
        >
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          sx={{ lineHeight: 1.7 }}
        >
          Colombus Freight Logistics has been connecting businesses across
          Tamil Nadu & South India since 2007. Reach out to us for transport
          services, branch-level support, or strategic partnerships.
        </Typography>

        <Typography variant="subtitle1" fontWeight={700} mb={2}>
          Head Office
        </Typography>
        <Stack spacing={1.2} mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FontAwesomeIcon icon={faLocationDot} color="#14532D" />
            <Typography variant="body2">
              141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FontAwesomeIcon icon={faPhone} color="#14532D" />
            <Typography variant="body2">94426 02332</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FontAwesomeIcon icon={faEnvelope} color="#14532D" />
            <Typography variant="body2">
              tirupur@colombusfreight.com
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Branches */}
        <Typography variant="subtitle1" fontWeight={700} mb={2}>
          Branch Offices
        </Typography>
        <Stack spacing={0.8}>
          <Typography variant="body2">📞 Chennai (Air): 9442645332 / 9952845332</Typography>
          <Typography variant="body2">📞 Chennai (Sea): 9952819332 / 7305025409</Typography>
          <Typography variant="body2">📞 Coimbatore: 9442647332 / 7305025406</Typography>
          <Typography variant="body2">📞 Tuticorin: 9442626332</Typography>
          <Typography variant="body2">📞 Bengaluru: 7339419991 / 7339419992</Typography>
          <Typography variant="body2">✉ customercare@colombusfreight.com</Typography>
        </Stack>
      </Stack>

      <Stack
        spacing={3}
        height="auto"
        sx={{
          flex: 1.1,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: 'white',
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          color="#14532D"
        >
          Send Us a Message
        </Typography>

        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="First Name" variant="outlined" />
            <TextField fullWidth label="Last Name" variant="outlined" />
          </Stack>

          <TextField fullWidth label="Email Address" type="email" />
          <TextField fullWidth label="Company Name" />

          <TextField select fullWidth label="Which best describes you?">
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="partner">Partner</MenuItem>
            <MenuItem value="investor">Investor</MenuItem>
          </TextField>

          <TextField fullWidth label="Message" multiline rows={4} />

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#14532D',
              '&:hover': { bgcolor: '#15803d' },
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              alignSelf: 'flex-start',
              px: 4,
              py: 1.2,
              boxShadow: '0px 4px 14px rgba(20,83,45,0.3)',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

export default SupportSection;
