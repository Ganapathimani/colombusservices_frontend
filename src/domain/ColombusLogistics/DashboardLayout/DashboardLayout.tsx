import React from 'react';
import {
  Box, Typography, AppBar, Toolbar, IconButton,
} from '@mui/material';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSideBar';

const DashboardLayout = () => (
  <Box sx={{ display: 'flex', minHeight: '80vh' }}>
    <DashboardSidebar />

    <Box sx={{ flexGrow: 1, bgcolor: '#F5F5F5' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          color: '#2E7D32',
          top: '82px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#000"
            sx={{ ml: { xs: 7, md: 0 } }}
          >
            Dashboard Overview
          </Typography>
          <Box>
            <IconButton>
              <FontAwesomeIcon icon={faBell} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  </Box>
);

export default DashboardLayout;
