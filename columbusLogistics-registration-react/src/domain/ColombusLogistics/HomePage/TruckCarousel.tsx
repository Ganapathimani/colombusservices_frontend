import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay, Navigation, Pagination, EffectFade,
} from 'swiper/modules';
import {
  Box, Typography, Button, Stack, useTheme,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { map } from 'lodash/fp';

import vehicle1 from '../../../assets/vehicle1.jpg';
import vehicle2 from '../../../assets/vehicle2.jpg';
import vehicle3 from '../../../assets/vehicle3.jpg';

const truckData = [
  {
    image: vehicle1,
    title: 'Heavy-Duty Freight Transport',
    subtitle: 'Reliable Long-Distance Logistics Across South India',
    description:
      'Our fleet of heavy-duty trucks offers secure and timely delivery of a wide range of cargo including garments, machinery, and industrial goods across Tamil Nadu and the southern region. Equipped with GPS tracking and managed by experienced drivers, we ensure your goods reach their destination safely and efficiently.',
    features: [
      'Up to 25 Ton Load Capacity',
      'Real-Time GPS Tracking for Transparency',
      'Climate-Controlled Transport for Sensitive Goods',
    ],
  },
  {
    image: vehicle2,
    title: 'Express Delivery Service',
    subtitle: 'Fast, Dependable Solutions for Time-Critical Shipments',
    description:
      'Designed for urgent and time-sensitive cargo, our express delivery service guarantees quick turnaround times and reliable handling. Whether same-day delivery or real-time status updates, our team ensures your shipments are prioritized and handled with utmost care.',
    features: [
      'Guaranteed Same-Day Delivery',
      'Live Shipment Updates',
      'Secure and Safe Transit Protocols',
    ],
  },
  {
    image: vehicle3,
    title: 'Local Distribution Network',
    subtitle: 'Comprehensive Citywide Coverage with Last-Mile Expertise',
    description:
      'Our local distribution services offer efficient last-mile delivery solutions within major cities. We specialize in door-to-door shipments with flexible scheduling and 24/7 support, ensuring that your customers receive their orders promptly and in perfect condition.',
    features: [
      'Door-to-Door Delivery Across Urban Areas',
      'Round-the-Clock Customer Support',
      'Flexible and Customized Scheduling',
    ],
  },
];

const infoCards = [
  { value: '500+', label: 'Vehicles in Fleet', color: 'common.white' },
  { value: '99.9%', label: 'On-Time Delivery', color: 'success.light' },
  { value: '24/7', label: 'Customer Support', color: 'common.white' },
];

const TruckCarousel = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 400, md: 650 },
        background: 'linear-gradient(135deg, #1f2937, #374151, #1f2937)', // gray-900 to gray-800 to gray-900
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        className="swiper-container"
        speed={1000}
        style={{ height: '100%' }}
      >
        {map((truck) => (
          <SwiperSlide key={truck.title}>
            <Box sx={{
              position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center',
            }}
            >
              <Box sx={{ position: 'absolute', inset: 0 }}>
                <Box
                  component="img"
                  src={truck.image}
                  alt={truck.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
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
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                    gap: { xs: 4, lg: 8 },
                    minHeight: { xs: 400, md: 500 },
                    alignItems: 'center',
                  }}
                >
                  <Stack
                    spacing={4}
                    sx={{
                      color: 'common.white',
                      animation: 'slideInLeft 1s ease-out forwards',
                      '@keyframes slideInLeft': {
                        from: { opacity: 0, transform: 'translateX(-60px)' },
                        to: { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      sx={{
                        px: 2,
                        py: 0.5,
                        bgcolor: 'rgba(22, 101, 52, 0.2)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(22, 101, 52, 0.3)',
                        borderRadius: '9999px',
                        width: 'fit-content',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'success.main',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.3 },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: 'success.light', fontWeight: 600, letterSpacing: 1 }}
                      >
                        PREMIUM SERVICE
                      </Typography>
                    </Stack>
                    <Box>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 'bold',
                          lineHeight: 1.1,
                          fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem' },
                          background: 'linear-gradient(to right, #fff, #e5e7eb, #d1d5db)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {truck.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: 'success.light', fontWeight: 500, mt: 1 }}
                      >
                        {truck.subtitle}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'grey.300', maxWidth: 480 }}>
                      {truck.description}
                    </Typography>
                    <Stack spacing={1}>
                      {map((feature) => (
                        <Stack
                          key={feature}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              bgcolor: 'success.main',
                              borderRadius: '50%',
                              flexShrink: 0,
                            }}
                          />
                          <Typography sx={{ color: 'common.white', fontWeight: 500 }}>
                            {feature}
                          </Typography>
                        </Stack>
                      ), truck.features)}
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          px: 5,
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 3,
                          textTransform: 'none',
                          boxShadow: '0 8px 15px rgba(22,101,52,0.3)',
                          '&:hover': {
                            backgroundColor: theme.palette.success.dark,
                            boxShadow: '0 12px 24px rgba(22,101,52,0.5)',
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Book Now
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack
                    spacing={3}
                    sx={{
                      display: { xs: 'none', lg: 'flex' },
                      animation: 'slideInRight 1s ease-out 0.3s both',
                      '@keyframes slideInRight': {
                        from: { opacity: 0, transform: 'translateX(60px)' },
                        to: { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    {map(({ value, label, color }) => (
                      <Stack
                        key={label}
                        spacing={0.5}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: 3,
                          p: 3,
                          border: '1px solid rgba(255,255,255,0.2)',
                          minWidth: 160,
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
                          {value}
                        </Typography>
                        <Typography sx={{ color: 'grey.300' }}>{label}</Typography>
                      </Stack>
                    ), infoCards)}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ), truckData)}
      </Swiper>

      <Box
        component="button"
        className="custom-swiper-button-prev"
        sx={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 56,
          height: 56,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.4)',
          },
        }}
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: 'auto', display: 'block' }}
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </Box>
      <Box
        component="button"
        className="custom-swiper-button-next"
        sx={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 56,
          height: 56,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.4)',
          },
        }}
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: 'auto', display: 'block' }}
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </Box>
    </Box>
  );
};

export default TruckCarousel;
