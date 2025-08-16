import React from 'react';
import {
  Stack,
  Typography,
  Avatar,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Stack
      component="section"
      id="about-us"
      spacing={6}
      sx={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        alignItems="center"
      >
        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          spacing={1.2}
          sx={{
            textAlign: 'center',
            p: 2,
          }}
        >
          <Avatar
            alt="Mr. Selva Kumar - Managing Director"
            src="/images/owner-selvakumar.jpg"
            sx={{
              width: { xs: 200, md: 240 },
              height: { xs: 200, md: 240 },
              border: '5px solid #fff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mt: 1.5,
            }}
          >
            Mr. Selva Kumar
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={500}
          >
            Managing Director
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            Colombus Freight Logistics
          </Typography>
        </Stack>

        <Stack flex={2}>
          <Typography
            variant="overline"
            fontWeight={700}
            color="green"
            letterSpacing={1}
          >
            About Us
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: theme.palette.success.main,
              mb: 2,
            }}
          >
            Logistics Solutions Since 2007
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            mb={3}
          >
            Colombus Freight Logistics is a well-established road freight transport company, located
            head office at Tirupur and corporate office at chennai. The business transports a
            variety of general cargo and goods among all over Tamil nadu & South Region of India.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            mb={3}
          >
            From humble beginnings with a single truck, Colombus Freight Logistics
            has grown into one of South India&apos;s most trusted transport companies.
            Headquartered in Tirupur with a corporate office in Chennai, we serve
            all of Tamil Nadu and the South Region of India, transporting goods
            ranging from garments to industrial machinery.
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
      >
        <Card
          elevation={2}
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 3,
            textAlign: 'center',
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
              icon={faBullseye}
              size="2x"
              style={{ color: '#388E3C', marginBottom: '1rem' }}
            />
            <Typography
              variant="h6"
              fontWeight={600}
              color="green"
              mb={1}
            >
              Mission
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              To provide the highest level of transportation services with safe and
              timely deliveries, fair pricing, and a safe workplace — maintaining
              integrity, fairness, and honesty.
            </Typography>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 3,
            textAlign: 'center',
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
              icon={faEye}
              size="2x"
              style={{ color: '#388E3C', marginBottom: '1rem' }}
            />
            <Typography
              variant="h6"
              fontWeight={600}
              color="green"
              mb={1}
            >
              Vision
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              To be recognized as the leader in South India&apos;s transport industry
              for long and short distance trucking and goods transportation.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default AboutUs;
