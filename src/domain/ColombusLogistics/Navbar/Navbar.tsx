import React, { useCallback, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@react-shanties/core';
import { useGetUserQuery } from '#api/colombusLogisticsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faImages,
  faUsers,
  faEnvelope,
  faTruck,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import AuthForm from '#pages/Layout/Login/AuthForm';
import logo from '#assets/logo.png';
import ProfileMenu from './ProfileMenu';

const navItems = [
  { label: 'Home', path: '/', icon: faHome },
  { label: 'Services', path: '/services', icon: faTruck },
  { label: 'Gallery', path: '/gallery', icon: faImages },
  { label: 'About Us', path: '/about', icon: faUsers },
  { label: 'Contact', path: '/contact', icon: faEnvelope },
  { label: 'Book Now', path: '/registration', icon: faCalendarCheck },
];

const roleRoutes: Record<string, string> = {
  CUSTOMER: '/',
  SUPER_ADMIN: '/admin',
  ASSISTANT: '/admin',
  ADMIN: '/admin',
  PICKUP: '/admin',
  LR: '/admin',
  DELIVERY: '/admin',
};

const Navbar = () => {
  const [isAuthFormOpen, , AuthFormActions] = useToggle(false);
  const [sidebarOpen, , sideBarActions] = useToggle(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const storedUser = localStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || null;

  const [currentUser, setCurrentUser] = useState(parsedUser);

  const { data: fetchedUser } = useGetUserQuery({ id: userId! });

  useEffect(() => {
    if (fetchedUser) {
      setCurrentUser(fetchedUser);
      localStorage.setItem('user', JSON.stringify(fetchedUser));
    }
  }, [fetchedUser]);

  const handleLoginSuccess = useCallback(
    (userData: any) => {
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      const path = roleRoutes[userData.role] || '/';
      navigate(path);
      AuthFormActions.setOff();
    },
    [AuthFormActions, navigate],
  );

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setCurrentUser(null);
    navigate('/');
  }, [navigate]);

  const goToPath = useCallback(
    (path?: string) => {
      navigate(path || '/');
      sideBarActions.setOff();
    },
    [navigate, sideBarActions],
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          color: '#000',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          borderBottom: '2px solid #e5e7eb',
          zIndex: 1300,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: { xs: 64, sm: 72, md: 80 },
            px: { xs: 2, sm: 3, md: 6 },
            width: '100%',
            margin: '0 auto',
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
              alt="Colombus Logistics"
              sx={{
                height: { xs: 32, sm: 40, md: 48 },
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 700,
                color: '#166534',
                fontSize: { sm: '1.1rem', md: '1.25rem' },
              }}
            >
              Colombus Logistics
            </Typography>
          </Stack>

          {!isMobile && (
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ ml: 4 }}
            >
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  onClick={() => goToPath(item.path)}
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: '#1a202c',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#166534' },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>
          )}

          <Stack direction="row" spacing={1.5} alignItems="center">
            {currentUser && currentUser.name ? (
              <ProfileMenu user={currentUser} onLogout={handleLogout} />
            ) : (
              <Button
                variant="contained"
                onClick={AuthFormActions.setOn}
                sx={{
                  backgroundColor: '#166534',
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  px: { xs: 2.5, sm: 4 },
                  py: { xs: 1, sm: 1.25 },
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#14532d' },
                }}
              >
                Login
              </Button>
            )}
            {isMobile && (
              <IconButton
                onClick={sideBarActions.setOn}
                sx={{
                  color: '#166534',
                }}
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Toolbar sx={{ minHeight: { xs: 64, sm: 72, md: 80 } }} />

      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={sideBarActions.setOff}
        PaperProps={{
          sx: {
            width: { xs: '85%', sm: 320 },
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#166534', mb: 2 }}
          >
            Colombus Logistics
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => goToPath(item.path)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  '&:hover': { backgroundColor: '#e6f4ea' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ width: 18, height: 18, color: '#166534' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#1a202c',
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {!currentUser && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                fullWidth
                onClick={AuthFormActions.setOn}
                sx={{
                  backgroundColor: '#166534',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.2,
                  borderRadius: '10px',
                  '&:hover': { backgroundColor: '#14532d' },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      <Dialog
        open={isAuthFormOpen}
        onClose={AuthFormActions.setOff}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          },
        }}
      >
        <AuthForm onSuccess={handleLoginSuccess} onClose={AuthFormActions.setOff} />
      </Dialog>
    </>
  );
};

export default Navbar;
