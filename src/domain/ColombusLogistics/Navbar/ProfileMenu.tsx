import React, { useState, useCallback } from 'react';
import {
  Box, IconButton, Menu, MenuItem, Divider, Typography, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CBLTAvatar from '#components/Avatar/CbltAvatar';

type ProfileMenuProps = {
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
};

const ProfileMenu = ({ user, onLogout }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const storedUser = localStorage.getItem('user');
  let isAdmin = false;

  if (storedUser) {
    try {
      const userRole = JSON.parse(storedUser);
      isAdmin = userRole?.value?.role === 'ADMIN';
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const handleSignOut = useCallback(() => {
    onLogout();
    handleMenuClose();
    navigate('/');
  }, [navigate, onLogout]);

  const handleViewProfile = useCallback(() => {
    handleMenuClose();
    navigate('/dashboard');
  }, [navigate]);

  const handleGoToAdmin = useCallback(() => {
    handleMenuClose();
    navigate('/admin');
  }, [navigate]);

  return (
    <>
      <Stack justifyContent="flex-end" alignItems="center">
        <IconButton onClick={handleMenuOpen}>
          <CBLTAvatar size={45} name={user.name || 'Guest'} />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ dense: true, sx: { py: 0.5 } }}
        sx={{
          '.MuiPaper-root': {
            width: '240px',
            borderRadius: '4px',
            border: '1px solid #F5F5F5',
          },
        }}
      >
        <Box p={1}>
          <Typography fontWeight="bold" color="black" fontSize={{ xs: 14, sm: 16 }} sx={{ pl: 1 }}>
            Welcome,
            {' '}
            {user.name}
            !
          </Typography>
        </Box>
        <Divider />

        <MenuItem onClick={handleViewProfile}>
          <Typography variant="body2" fontSize={{ xs: 14, sm: 16 }}>Profile</Typography>
        </MenuItem>

        {isAdmin && (
          <MenuItem onClick={handleGoToAdmin}>
            <Typography variant="body2" fontSize={{ xs: 14, sm: 16 }}>Go to Admin</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={handleSignOut}>
          <Typography variant="body2" fontSize={{ xs: 14, sm: 16 }}>Log Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
