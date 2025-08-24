import {
  Box, Button, Typography, Container,
} from '@mui/material';
import React from 'react';

const CTASection = () => (
  <Box
    sx={{
      py: { xs: 10 },
      textAlign: 'center',
      background: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '-100px',
        left: '-150px',
        width: 300,
        height: 300,
        transform: 'rotate(-25deg)',
        background: 'linear-gradient(135deg, rgba(22,101,52,0.15), rgba(22,163,74,0.1))',
        filter: 'blur(40px)',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: '-120px',
        right: '-160px',
        width: 320,
        height: 320,
        transform: 'rotate(30deg)',
        background: 'linear-gradient(135deg, rgba(22,101,52,0.15), rgba(22,163,74,0.1))',
        filter: 'blur(45px)',
      }}
    />

    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: '2.4rem', md: '3.2rem' },
          lineHeight: 1.2,
          letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #166534, #16a34a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Your Goods, Our Priority
      </Typography>

      <Box
        sx={{
          width: 80,
          height: 4,
          bgcolor: 'success.main',
          borderRadius: 2,
          mx: 'auto',
          mb: 4,
        }}
      />

      <Typography
        variant="h6"
        sx={{
          mb: 5,
          color: 'text.secondary',
          maxWidth: 680,
          mx: 'auto',
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          lineHeight: 1.7,
        }}
      >
        Experience seamless, fast, and secure logistics solutions —
        moving your business forward with trust and reliability.
      </Typography>

      <Button
        variant="contained"
        sx={{
          background: 'linear-gradient(90deg, #166534, #16a34a)',
          color: '#fff',
          fontWeight: 'bold',
          px: 4,
          py: 1.4,
          borderRadius: 50,
          fontSize: '1.15rem',
          textTransform: 'none',
          boxShadow: '0 8px 22px rgba(22,101,52,0.25)',
          transition: 'all 0.35s ease',
          '&:hover': {
            background: 'linear-gradient(90deg, #15803d, #16a34a)',
            boxShadow: '0 10px 28px rgba(22,101,52,0.35)',
          },
        }}
        href="/registration"
      >
        Get a Quote
      </Button>
    </Container>
  </Box>
);

export default CTASection;
