import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Fab, Zoom, Link,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faArrowUpLong,
} from '@fortawesome/free-solid-svg-icons';
import logo from '#assets/logo.png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Grid
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1e3a1e 0%, #2e7d32 100%)',
        color: 'white',
        textAlign: 'center',
        fontWeight: 600,
        py: 2,
        mt: 'auto',
      }}
    >

      <Grid container spacing={2}>
        <Grid size={{ md: 4, xs: 12 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="Colombus Logistics Logo"
              sx={{ width: 140, height: 'auto', mb: 2 }}
            />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Colombus Logistics
            </Typography>
            <Typography variant="body1" color="grey.400">
              Delivering Trust, On Time.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <Typography variant="h5" mb={1} fontWeight={600}>Quick Links</Typography>
          <Typography mb={1} fontWeight={500}>
            <Link href="/about" underline="none" sx={{ color: 'white' }}>About Us</Link>
          </Typography>
          <Typography mb={1} fontWeight={500}>
            <Link href="/services" underline="none" sx={{ color: 'white' }}>Services</Link>
          </Typography>
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Contact Us
          </Typography>
          <Box>
            <Typography mb={1}>NO. 141/C, Colombus Building,</Typography>
            <Typography mb={1}>Iswarya Garden, Ammanpalayam</Typography>
            <Typography mb={1}>Tirupur - 641652</Typography>
            <Typography mb={1}>
              {' '}
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              {' '}
              info@example.com
            </Typography>
            <Typography mb={1}>
              <FontAwesomeIcon icon={faPhone} size="lg" />
              {' '}
              +91 98765 43210
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mb={2} mt={2}>
        <Typography>
          ©
          {' '}
          {new Date().getFullYear()}
          <strong> Colombus Logistics</strong>
          . All rights reserved.
        </Typography>
      </Box>
      <Zoom in={isVisible}>
        <Fab
          size="medium"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1200,
            background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
            color: 'white',
            boxShadow: '0px 6px 12px rgba(0,0,0,0.25)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #1B5E20 0%, #145214 100%)',
              boxShadow: '0px 12px 24px rgba(0,0,0,0.35)',
            },
          }}
        >

          <FontAwesomeIcon
            icon={faArrowUpLong}
            size="lg"
            style={{
              transition: 'transform 0.4s ease',
            }}
            className="scroll-icon"
          />
        </Fab>
      </Zoom>

      <style>
        {`
          .scroll-icon:hover {
            transform: rotate(-360deg);
          }
        `}
      </style>
    </Grid>
  );
};

export default Footer;
