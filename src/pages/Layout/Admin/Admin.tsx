import React, { useState, useCallback } from 'react';
import {
  Box, Drawer, IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AdminSidePanel from '#domain/ColombusLogistics/Admin/AdminSideBar';

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <Box display="flex" bgcolor="#FAFAFA">
      <IconButton
        onClick={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'absolute',
          left: 16,
          top: 80,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <AdminSidePanel
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </Drawer>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <AdminSidePanel
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </Box>
      <Box flex={1} bgcolor="#FFFFFF">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
