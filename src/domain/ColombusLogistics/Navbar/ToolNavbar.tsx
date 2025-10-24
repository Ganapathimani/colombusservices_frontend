import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '#assets/logo.png';

const ToolNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    handleClose();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('user');
      setCurrentUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (!currentUser && location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  }, [currentUser, location.pathname, navigate]);

  const avatarLetter = currentUser?.name?.[0]?.toUpperCase();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        color: '#166534',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 4 },
          minHeight: 64,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(currentUser ? '/admin' : '/')}
        >
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{
              height: 36,
              width: 'auto',
              mr: 1.5,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: '#166534',
            }}
          >
            Colombus Logistics
          </Typography>
        </Box>

        {currentUser && (
          <Box>
            <IconButton onClick={handleMenu}>
              <Avatar
                sx={{
                  bgcolor: '#166534',
                  width: 36,
                  height: 36,
                  fontSize: '1rem',
                }}
              >
                {avatarLetter}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ToolNavbar;
