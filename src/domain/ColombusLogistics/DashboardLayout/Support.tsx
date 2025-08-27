import React from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  Paper,
} from '@mui/material';

const SupportSection = () => (
  <Box sx={{ px: { xs: 2, md: 6 } }}>
    <Box sx={{ maxWidth: '1200px' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            bgcolor: 'grey.100',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" color="green" fontWeight={700} mb={2}>
            Get in Touch with Colombus Freight Logistics
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Colombus Freight Logistics has been connecting businesses across
            Tamil Nadu & South India since 2007. Reach out to us for transport
            services, branch-level support, or business partnerships.
          </Typography>

          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Why Choose Us
          </Typography>
          <Typography>✔ Reliable Delivery Network</Typography>
          <Typography>✔ Comprehensive Transport Support</Typography>
          <Typography>✔ Real-Time GPS Tracking</Typography>
          <Typography>✔ Customizable Notifications</Typography>
          <Typography>✔ Seamless Integration with Clients</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Head Office
          </Typography>
          <Typography>
            📍 141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur
          </Typography>
          <Typography>📞 94426 02332</Typography>
          <Typography>✉ tirupur@colombusfreight.com</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Branch Offices
          </Typography>
          <Typography>📞 Chennai (Air) : 9442645332 / 9952845332</Typography>
          <Typography>📞 Chennai (Sea) : 9952819332 / 7305025409</Typography>
          <Typography>📞 Coimbatore : 9442647332 / 7305025406</Typography>
          <Typography>📞 Tuticorin : 9442626332</Typography>
          <Typography>📞 Bengaluru : 7339419991 / 7339419992</Typography>
          <Typography>✉ customercare@colombusfreight.com</Typography>
        </Paper>

        <Box
          sx={{
            flex: 1.5,
            p: 4,
            bgcolor: 'grey.50',
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField fullWidth label="First Name" />
              <TextField fullWidth label="Last Name" />
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
              sx={{
                bgcolor: '#14532D',
                '&:hover': { bgcolor: '#15803d' },
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                alignSelf: 'flex-end',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>

  </Box>
);

export default SupportSection;
