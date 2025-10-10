import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ToolNavbar from '#domain/ColombusLogistics/Navbar/ToolNavbar';

const ToolLayout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      p: 2,
    }}
  >
    <ToolNavbar />
    <Toolbar />
    <Outlet />
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#333', color: '#fff' },
      }}
    />
  </Box>
);

export default ToolLayout;
