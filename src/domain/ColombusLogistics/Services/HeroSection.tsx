import React, { useCallback } from 'react';
import {
  Box, Typography, Button, Stack, useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import vehicle1 from '../../../assets/vehicle4.jpg';

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBookRoute = useCallback(() => {
    navigate('/registration');
  }, [navigate]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 650, md: 650 },
        background: 'linear-gradient(135deg, #1f2937, #374151, #1f2937)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <Box
          component="img"
          src={vehicle1}
          alt="Hero Truck"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 70%)',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto',
          px: { xs: 3, sm: 6, lg: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Stack
          spacing={3}
          sx={{
            color: 'common.white',
            animation: 'fadeInUp 1s ease-out forwards',
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(40px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              maxWidth: '900px',
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem' },
              background: 'linear-gradient(to right, #fff, #e5e7eb, #d1d5db)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Delivering Speed, Safety & Trust
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: 'grey.300', maxWidth: 600 }}
          >
            Reliable logistics solutions that move your business forward — on time, every time.
          </Typography>

          <Button
            variant="contained"
            color="success"
            onClick={handleBookRoute}
            sx={{
              px: 6,
              py: 1.8,
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 8px 15px rgba(22,101,52,0.3)',
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
              },
              transition: 'all 0.3s ease',
              width: 'fit-content',
            }}
          >
            Book Your Shipment
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;
