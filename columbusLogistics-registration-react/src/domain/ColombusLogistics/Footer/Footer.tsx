import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Fab, Zoom, Link } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faArrowUpLong
} from '@fortawesome/free-solid-svg-icons';

import vehicle1 from '../../../assets/vehicle1.jpg'
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Grid
      component="footer"
      sx={{
        backgroundColor: "#fff",
        color: "green",
        textAlign: "center",
        fontWeight: 600,
        py: 2,
        mt: "auto",
      }}>
      <Grid container spacing={2}>
        <Grid size={{ md: 4, xs: 12 }}>
          <Box
            component="img"
            src={vehicle1}
            alt="Description of image"
            sx={{ width: 280, height: 'auto' }}
          />
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <Typography variant="h5" mb={1} fontWeight={600}>Quick Links</Typography>
          <Typography mb={1} fontWeight={500}>
            <Link href='/about' underline="none" sx={{ color: 'green' }}>About Us</Link>
          </Typography>
          <Typography mb={1} fontWeight={500}>
            <Link href='/services' underline="none" sx={{ color: 'green' }}>Services</Link>
          </Typography>
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Contact Us
          </Typography>
          <Box>
            <Typography mb={1}>NO. 141/C, Columbus Building,</Typography>
            <Typography mb={1}>Iswarya Garden, Ammanpalayam</Typography>
            <Typography mb={1}>Tirupur - 641652</Typography>
            <Typography mb={1}> <FontAwesomeIcon icon={faEnvelope} size="lg" /> info@example.com</Typography>
            <Typography mb={1}><FontAwesomeIcon icon={faPhone} size="lg" />  +91 98765 43210</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mb={2} mt={2}>
        <Typography>
          © {new Date().getFullYear()}<strong> Columbus Logistics</strong>. All rights reserved.
        </Typography>
      </Box>
      <Zoom in={isVisible}>
        <Fab
          color="success"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <FontAwesomeIcon icon={faArrowUpLong} size="lg" />
        </Fab>
      </Zoom>
    </Grid >
  );
};

export default Footer;
