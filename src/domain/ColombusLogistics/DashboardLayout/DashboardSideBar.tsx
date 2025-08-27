import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Stack,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTruck,
  faFileAlt,
  faHeadset,
  faBars,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Rate Requests', icon: faHome, to: '/dashboard/rate-requests' },
  { label: 'Pickup Confirmations', icon: faTruck, to: '/dashboard/pickup-confirmations' },
  { label: 'Cargo Tracking', icon: faFileAlt, to: '/dashboard/cargo-tracking' },
  { label: 'Documents', icon: faFileAlt, to: '/dashboard/documents' },
  { label: 'Profile', icon: faUser, to: '/dashboard/profile' },
  { label: 'Support', icon: faHeadset, to: '/dashboard/support' },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <Stack
      direction="column"
      sx={{
        width: 240,
        p: 2,
        borderRight: '1px solid #ddd',
        bgcolor: '#FAF9F6',
        minHeight: '100vh',
        color: '#222',
      }}
      spacing={2}
    >
      <Stack alignItems="center" spacing={0.5}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#2E7D32' }}>
          Client Dashboard
        </Typography>
      </Stack>

      <Divider sx={{ borderColor: '#ddd' }} />

      <List sx={{ width: '100%' }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            sx={{
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                fontWeight: 'bold',
              },
              '&:hover': {
                backgroundColor: '#F5F5F0',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: '#2E7D32' }}>
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                color: '#222',
                fontWeight: location.pathname === item.to ? 'bold' : 'normal',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
};

const DashboardSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {isMobile && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            position: 'fixed',
            top: 93,
            left: -10,
            width: '100%',
            color: '#000',
            px: 2,
            py: 1,
            zIndex: 1201,
          }}
        >
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </IconButton>
        </Stack>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {!isMobile && <SidebarContent />}
    </>
  );
};

export default DashboardSidebar;
