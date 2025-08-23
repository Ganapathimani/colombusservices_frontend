import React, { useRef, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@react-shanties/core';
import AuthForm from '#pages/Layout/Login/AuthForm';

const navItems = [
  { label: 'Home', subItems: [], path: '/' },
  {
    label: 'Services',
    subItems: [],
    path: '/services',
  },
  // We will add once the package were added
  // {
  //   label: 'Tracking',
  //   subItems: [],
  //   path: '/tracking',
  // },
  {
    label: 'About Us',
    subItems: [],
    path: '/about',
  },
  {
    label: 'Contact',
    subItems: [],
    path: '/contact',
  },
  {
    label: 'Book Now',
    subItems: [],
    path: '/registration',
  },
];

const Navbar = () => {
  const [isAuthFormOpen, , AuthFormActions] = useToggle(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const navRefs = useRef<Array<HTMLElement | null>>([]);

  const setNavRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      navRefs.current[index] = el;
    },
    [],
  );

  const goToPath = useCallback((path?: string) => {
    navigate(path ?? '/');
  }, [navigate]);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          p: 1,
          top: 0,
          backgroundColor: '#ffffff',
          color: '#000',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1100,
          borderBottom: '2px solid #bbb',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '80px',
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => goToPath('/')}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1a472a',
                fontSize: { xs: '1.1rem', sm: '1.5rem' },
                letterSpacing: '-0.5px',
                fontFamily: '"Inter", "Roboto", sans-serif',
                lineHeight: 1,
              }}
            >
              Columbus Logistics
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#4CAF50',
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '0.5px',
                marginTop: '-2px',
              }}
            >
              Connecting Indian Commerce
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {navItems.map((item, index) => (
              <Box
                key={item.label}
                ref={setNavRef(index)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  py: 2,
                  px: 1,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (!item.subItems.length) {
                    goToPath(item.path);
                  }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#2d3748',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: '#166534',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: '-8px',
                      left: '50%',
                      backgroundColor: '#166534',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Button
            variant="contained"
            onClick={AuthFormActions.setOn}
            sx={{
              backgroundColor: '#166534',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(22, 101, 52, 0.3)',
              transition: 'all 0.3s ease',
              fontFamily: '"Inter", "Roboto", sans-serif',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#14532d',
                boxShadow: '0 6px 16px rgba(22, 101, 52, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={isAuthFormOpen}
        onClose={AuthFormActions.setOff}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          },
        }}
      >
        <AuthForm />
      </Dialog>
    </>
  );
};

export default Navbar;
