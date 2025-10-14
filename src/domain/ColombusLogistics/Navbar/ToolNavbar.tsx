import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '#assets/logo.png';

const ToolNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate('/');
  };

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
        {/* Logo and Company Name */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/admin')}
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
              {localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user') || '{}')?.name?.[0]?.toUpperCase() || 'U'
                : 'U'}
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
      </Toolbar>
    </AppBar>
  );
};

export default ToolNavbar;
