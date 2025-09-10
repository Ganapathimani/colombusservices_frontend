import React, { useCallback, useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Stack, Box, Dialog, Drawer,
  List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@react-shanties/core';
import { useUserGetQuery } from '#api/colombusLogisticsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faHome, faInfoCircle, faEnvelope, faTruck, faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import AuthForm from '#pages/Layout/Login/AuthForm';
import logo from '#assets/logo.png';
import ProfileMenu from './ProfileMenu';

const navItems = [
  { label: 'Home', path: '/', icon: faHome },
  { label: 'Services', path: '/services', icon: faTruck },
  { label: 'About Us', path: '/about', icon: faInfoCircle },
  { label: 'Contact', path: '/contact', icon: faEnvelope },
  { label: 'Book Now', path: '/registration', icon: faCalendarCheck },
];

const roleRoutes: Record<string, string> = {
  CUSTOMER: '/',
  ASSISTANT: '/admin/assistant',
  ADMIN: '/admin',
  PICKUP: '/admin/pickup',
  LR: '/admin/lr',
  DELIVERY: '/admin/delivery',
};

const Navbar = () => {
  const [isAuthFormOpen, , AuthFormActions] = useToggle(false);
  const [sidebarOpen, , sideBarActions] = useToggle(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  let token: string | null = null;
  let email: string | null = null;

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      token = user?.value?.token ?? null;
      email = user?.value?.email ?? null;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const { data: fetchedUser } = useUserGetQuery({ id: email! }, {
    skip: !token,
  });

  useEffect(() => {
    if (fetchedUser) {
      setCurrentUser(fetchedUser);
      localStorage.setItem('user', JSON.stringify(fetchedUser));
    }
  }, [fetchedUser]);

  const handleLoginSuccess = useCallback((userData: any) => {
    setCurrentUser(userData);
    const path = roleRoutes[userData.role] || '/';
    navigate(path);
    AuthFormActions.setOff();
  }, [AuthFormActions, navigate]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setCurrentUser(null);
  }, []);

  const goToPath = useCallback((path?: string) => {
    navigate(path ?? '/');
    sideBarActions.setOff();
  }, [navigate, sideBarActions]);

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
        <Toolbar sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '80px', px: { xs: 2, sm: 4, md: 6 },
        }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ cursor: 'pointer' }}
            onClick={() => goToPath('/')}
          >
            <Box
              component="img"
              src={logo}
              alt="Columbus Logistics Logo"
              sx={{
                height: { xs: 32, sm: 48 },
                width: 'auto',
                objectFit: 'contain',
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          </Stack>

          <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Box key={item.label} sx={{ cursor: 'pointer', py: 2, px: 1 }} onClick={() => goToPath(item.path)}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#2d3748',
                    position: 'relative',
                    '&:hover': { color: '#166534' },
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
                    '&:hover::after': { width: '100%' },
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            {currentUser ? (
              <ProfileMenu user={currentUser} onLogout={handleLogout} />
            ) : (
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
                  '&:hover': { backgroundColor: '#14532d' },
                }}
              >
                Login
              </Button>
            )}

            <IconButton sx={{ display: { md: 'none' } }} onClick={sideBarActions.setOn}>
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={sidebarOpen} onClose={sideBarActions.setOff} PaperProps={{ sx: { width: 280, backgroundColor: '#f9f9f9' } }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a472a', mb: 1 }}>Colombus Logistics</Typography>
          <Divider sx={{ mb: 1 }} />
          <List>
            {navItems.map((item) => (
              <ListItemButton key={item.label} onClick={() => goToPath(item.path)} sx={{ borderRadius: 1, mb: 1, '&:hover': { backgroundColor: '#e6f4ea' } }}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon} style={{ width: 20, height: 20, color: '#166534' }} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Dialog open={isAuthFormOpen} onClose={AuthFormActions.setOff} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
        <AuthForm onSuccess={handleLoginSuccess} onClose={AuthFormActions.setOff} />
      </Dialog>
    </>
  );
};

export default Navbar;
