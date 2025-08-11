import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '#domain/ColombusLogistics/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <Grid>
    <Navbar />
    <Outlet />
  </Grid>
);

export default Layout;
