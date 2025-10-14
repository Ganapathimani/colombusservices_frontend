import React from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import clientLogo1 from '#assets/colombus client logos/CEVA_Logo_HR.jpg';
import clientLogo2 from '#assets/colombus client logos/aikilogo.jpg';
import clientLogo3 from '#assets/colombus client logos/bollorelogo.png';
import clientLogo4 from '#assets/colombus client logos/broekmanlogo.jpg';
import clientLogo5 from '#assets/colombus client logos/chrobinsonlogo.png';
import clientLogo6 from '#assets/colombus client logos/flomiclogo.png';
import clientLogo7 from '#assets/colombus client logos/kerryindevlogo.png';
import clientLogo9 from '#assets/colombus client logos/scmlogo.png';
import clientLogo10 from '#assets/colombus client logos/zfwindpowerlogo.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { map } from 'lodash/fp';

const clientLogos: string[] = [
  clientLogo1,
  clientLogo2,
  clientLogo3,
  clientLogo4,
  clientLogo5,
  clientLogo6,
  clientLogo7,
  clientLogo9,
  clientLogo10,
];

const ClientLogoCarousel = () => (
  <Stack
    spacing={4}
    alignItems="center"
    justifyContent="center"
    sx={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '4rem 1rem',
      position: 'relative',
    }}
  >
    <IconButton
      className="swiper-button-prev-custom"
      sx={{
        position: 'absolute',
        top: '45%',
        left: -70,
        transform: 'translateY(-50%)',
        backgroundColor: '#2e7d32',
        color: '#fff',
        width: 56,
        height: 56,
        borderRadius: '50%',
        '&:hover': { backgroundColor: '#1b5e20' },
        zIndex: 20,
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} size="lg" />
    </IconButton>

    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={3}
      spaceBetween={40}
      navigation={{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }}
      pagination={{
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active-green',
      }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      speed={1200}
      breakpoints={{
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
      style={{
        paddingBottom: '60px',
        maxWidth: '1000px',
      }}
    >
      {map((logo: string, index: number) => (
        <SwiperSlide key={logo}>
          <Box
            component="img"
            src={logo}
            alt={`Client Logo ${index + 1}`}
            sx={{
              height: 100,
              width: '100%',
              objectFit: 'contain',
              borderRadius: 2,
              background: '#fff',
              p: 2,
              boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              },
            }}
          />
        </SwiperSlide>
      ))(clientLogos)}
    </Swiper>

    <IconButton
      className="swiper-button-next-custom"
      sx={{
        position: 'absolute',
        top: '35%',
        right: -70,
        transform: 'translateY(-50%)',
        backgroundColor: '#2e7d32',
        color: '#fff',
        width: 56,
        height: 56,
        borderRadius: '50%',
        '&:hover': { backgroundColor: '#1b5e20' },
        zIndex: 20,
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
      }}
    >
      <FontAwesomeIcon icon={faChevronRight} size="lg" />
    </IconButton>

    <style>
      {`
        .swiper-pagination {
          bottom: 10px !important;
        }
        .swiper-pagination-bullet {
          background: #c8e6c9;
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-green {
          background: #2e7d32 !important;
          transform: scale(1.2);
        }
      `}
    </style>
  </Stack>
);

export default ClientLogoCarousel;
