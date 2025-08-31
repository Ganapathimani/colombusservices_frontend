import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  Box,
  Grid,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCircleCheck,
  faClock,
  faList,
} from '@fortawesome/free-solid-svg-icons';

const PickupConfirmations = () => {
  const pickups = [
    {
      id: 1,
      pickupDate: '2025-08-30',
      origin: 'Kvp',
      destination: 'Cbe',
      vehicleType: 'Flatbed Truck',
      vehicleModel: '17 feet',
      status: 'Confirmed',
    },
    {
      id: 2,
      pickupDate: '2025-08-29',
      origin: 'Chennai',
      destination: 'Bangalore',
      vehicleType: 'Container Truck',
      vehicleModel: '20 feet',
      status: 'In Progress',
    },
  ];

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <Chip
            icon={<FontAwesomeIcon icon={faCircleCheck} />}
            label="Confirmed"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #43a047, #2e7d32)',
              color: 'white',
              px: 1,
            }}
          />
        );
      case 'In Progress':
        return (
          <Chip
            icon={<FontAwesomeIcon icon={faClock} />}
            label="In Progress"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #ffb300, #fb8c00)',
              color: 'white',
              px: 1,
            }}
          />
        );
      default:
        return <Chip label={status} />;
    }
  };

  const totalPickups = pickups.length;
  const confirmedCount = pickups.filter((p) => p.status === 'Confirmed').length;
  const inProgressCount = pickups.filter(
    (p) => p.status === 'In Progress',
  ).length;

  return (
    <Box p={3} sx={{ bgcolor: '#f9fafb' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          background: 'linear-gradient(135deg, #43a047, #2e7d32)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Pickup Confirmations Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              '&:hover': { transform: 'translateY(-3px)', transition: '0.3s' },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faList} size="lg" color="#2e7d32" />
              <Typography variant="h5" fontWeight="bold" color="#2e7d32">
                {totalPickups}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Pickups
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              '&:hover': { transform: 'translateY(-3px)', transition: '0.3s' },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faCircleCheck} size="lg" color="#2e7d32" />
              <Typography variant="h5" fontWeight="bold" color="#2e7d32">
                {confirmedCount}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Confirmed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              '&:hover': { transform: 'translateY(-3px)', transition: '0.3s' },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faClock} size="lg" color="#fb8c00" />
              <Typography variant="h5" fontWeight="bold" color="#fb8c00">
                {inProgressCount}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Card
        elevation={3}
        sx={{ borderRadius: 3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
      >
        <CardHeader
          title="Pickup Confirmations"
          avatar={<FontAwesomeIcon icon={faTruck} color="#2e7d32" />}
          titleTypographyProps={{
            sx: { color: '#2e7d32', fontWeight: 'bold', fontSize: '1.25rem' },
          }}
        />
        <Divider />
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Origin</b>
                  </TableCell>
                  <TableCell>
                    <b>Destination</b>
                  </TableCell>
                  <TableCell>
                    <b>Vehicle</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pickups.map((pickup) => (
                  <TableRow
                    key={pickup.id}
                    hover
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                      '&:hover': {
                        backgroundColor: '#f1f8f4',
                        transition: '0.3s',
                      },
                    }}
                  >
                    <TableCell>{pickup.pickupDate}</TableCell>
                    <TableCell>{pickup.origin}</TableCell>
                    <TableCell>{pickup.destination}</TableCell>
                    <TableCell>
                      <FontAwesomeIcon icon={faTruck} color="gray" />
                      {' '}
                      {pickup.vehicleType}
                      {' '}
                      (
                      {pickup.vehicleModel}
                      )
                    </TableCell>
                    <TableCell align="center">
                      {getStatusChip(pickup.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PickupConfirmations;
