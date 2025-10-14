import React, { useCallback } from 'react';
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

import { useNavigate } from 'react-router-dom';
import vehicle1 from '#assets/vehicle4.jpg';

const truckData = [
  {
    image: vehicle1,
    title: 'Fast Delivery',
    subtitle: 'Speed You Can Trust, Every Mile of the Way.',
    description:
      'At Colombus Logistics, we know time is critical. Our Fast Delivery service is designed for urgent shipments that can’t wait. With priority scheduling, dedicated vehicles, and express routes, we make sure your goods arrive on time, every time.',
    features: [
      'Priority shipment handling',
      'Express transport lanes',
      'Real-time GPS tracking',
      'Guaranteed delivery timelines',
    ],
    bestFor: 'Urgent consignments, retail stock replenishment, event supplies, spare parts delivery',
    cta: 'Need it delivered fast? Get a Quote Now',
  },
  {
    image: vehicle1,
    title: '24×7 Delivery',
    subtitle: 'Around the Clock, Around the Country.',
    description:
      'We understand that your business doesn’t stop — and neither do we. Our 24×7 Delivery service operates round-the-clock, including weekends and public holidays. Whether day or night, we ensure your shipments move without delay.',
    features: [
      'Available 24/7 including weekends & holidays',
      'Flexible pickup scheduling',
      'Dedicated support team at all hours',
      'Reliable nationwide coverage',
    ],
    bestFor: 'E-commerce deliveries, medical supplies, urgent industrial shipments',
    cta: 'Ship anytime, anywhere. Book a 24×7 Delivery',
  },
  {
    image: vehicle1,
    title: 'Full Truckload (FTL) Services',
    subtitle: 'Dedicated Space for Your Cargo.',
    description:
      'Our FTL services offer exclusive truck capacity for your goods, ensuring faster transit and higher cargo safety. Perfect for large shipments that require the full attention of our logistics team.',
    features: [
      'Dedicated trucks from start to finish',
      'Direct route with no stops',
      'Secure and sealed cargo space',
      'Predictable delivery timelines',
    ],
    bestFor: 'Bulk goods, manufacturing materials, large retail consignments',
    cta: 'Move more, move safer. Request an FTL Quote',
  },
  {
    image: vehicle1,
    title: 'Part Truckload (PTL) / Consolidated Shipping',
    subtitle: 'Smart Sharing, Big Savings.',
    description:
      'Why pay for a full truck when you don’t need it? Our PTL services allow you to share cargo space with other shippers, reducing costs while maintaining reliable delivery schedules.',
    features: [
      'Pay only for the space you use',
      'Flexible shipment sizes',
      'Optimized shared routes',
      'Professional cargo handling',
    ],
    bestFor: 'Small-to-medium shipments, startups, cost-conscious businesses',
    cta: 'Save more on shipping. Book a PTL Service',
  },
  {
    image: vehicle1,
    title: 'Express Cargo Service',
    subtitle: 'When Every Second Counts.',
    description:
      'Our Express Cargo Service guarantees the shortest possible transit time for high-priority shipments. We allocate special resources and vehicles to ensure speed without compromising safety.',
    features: [
      'Guaranteed express delivery',
      'Priority dispatching',
      'Minimal handling points',
      'Dedicated express routes',
    ],
    bestFor: 'Event goods, medical equipment, emergency industrial supplies',
    cta: 'Need it there today? Send an Express Cargo',
  },
  {
    image: vehicle1,
    title: 'Last-Mile Delivery',
    subtitle: 'The Final Step to Your Customer.',
    description:
      'Our Last-Mile Delivery ensures your products reach your customers’ doorsteps quickly and safely, enhancing customer satisfaction and retention.',
    features: [
      'Doorstep delivery',
      'Optimized urban routes',
      'Flexible scheduling',
      'Instant POD (Proof of Delivery) updates',
    ],
    bestFor: 'E-commerce sellers, retail chains, food distributors',
    cta: 'Deliver smiles at the last mile. Schedule a Delivery',
  },
];

const infoCards = [
  { value: '500+', label: 'Vehicles in Fleet', color: 'common.white' },
  { value: '99.9%', label: 'On-Time Delivery', color: 'success.light' },
  { value: '24/7', label: 'Customer Support', color: 'common.white' },
];

const TruckCarousel = () => {
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
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
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
                        onClick={handleBookRoute}
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
          display: { xs: 'none', md: 'block' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 56,
          height: 56,
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
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
          display: { xs: 'none', md: 'block' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 56,
          height: 56,
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
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
