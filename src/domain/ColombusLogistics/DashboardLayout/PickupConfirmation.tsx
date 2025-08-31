import React, { useMemo } from 'react';
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
  Divider,
  LinearProgress,
  Stack,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCircleCheck,
  faClock,
  faList,
  faRupeeSign,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash/fp';
import { useListOrdersQuery } from '#api/colombusLogisticsApi';

const PickupConfirmations = () => {
  const { data, isLoading } = useListOrdersQuery();

  const pickups = useMemo(
    () => map((o: any) => ({
      id: o?.id ?? '—',
      pickupDate: o?.pickupDate ?? null,
      origin: o?.originCustomerName ?? '—',
      destination: o?.destinationCustomerName ?? '—',
      vehicleType: o?.vehicleType ?? '—',
      vehicleModel: o?.vehicleModel ?? '—',
      status: (o?.status ?? 'Pending').toUpperCase(),
      amount: o?.rate ?? 0,
    }))(Array.isArray(data) ? data : []).filter((p) => p.status !== 'PENDING'),
    [data],
  );

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
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
      case 'IN PROGRESS':
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
  const confirmedCount = pickups.filter((p) => p.status === 'CONFIRMED').length;
  const inProgressCount = pickups.filter((p) => p.status === 'IN PROGRESS').length;

  const handleDownload = (id: string) => {
    alert(`Downloading Receipt & LR for Order ID: ${id}`);
  };

  return (
    <Box p={3} sx={{ bgcolor: '#f9fafb' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #43a047, #2e7d32)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Pickup Confirmations Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor, confirm, and manage all pickup requests with real-time status tracking.
        </Typography>
      </Box>

      {isLoading && <LinearProgress sx={{ mb: 3, borderRadius: 1 }} />}

      <Stack
        direction="row"
        spacing={3}
        mb={3}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Card
          sx={{
            flex: 1,
            minWidth: 220,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <FontAwesomeIcon icon={faList} size="2x" color="#2e7d32" />
            <Typography variant="h5" fontWeight={700} mt={1} color="text.primary">
              {totalPickups}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Pickups
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            minWidth: 220,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <FontAwesomeIcon icon={faCircleCheck} size="2x" color="#2e7d32" />
            <Typography variant="h5" fontWeight={700} mt={1} color="text.primary">
              {confirmedCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Confirmed
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            minWidth: 220,
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <FontAwesomeIcon icon={faClock} size="2x" color="#fb8c00" />
            <Typography variant="h5" fontWeight={700} mt={1} color="text.primary">
              {inProgressCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Card elevation={3} sx={{ borderRadius: 3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
        <CardHeader
          title={(
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
              Pickup Confirmation Requests (
              {pickups.length}
              )
            </Typography>
            )}
          sx={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        />
        <Divider />
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Origin</b></TableCell>
                  <TableCell><b>Destination</b></TableCell>
                  <TableCell><b>Vehicle</b></TableCell>
                  <TableCell align="center"><b>Amount</b></TableCell>
                  <TableCell align="center"><b>Status</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pickups.map((pickup) => (
                  <TableRow
                    key={pickup.id}
                    hover
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                      '&:hover': { backgroundColor: '#f1f8f4', transition: '0.3s' },
                    }}
                  >
                    <TableCell>
                      {pickup.pickupDate
                        ? new Date(pickup.pickupDate).toLocaleDateString('en-GB')
                        : '—'}
                    </TableCell>
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
                      <FontAwesomeIcon
                        icon={faRupeeSign}
                        style={{ fontSize: 14, marginRight: 4 }}
                      />
                      {pickup.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">{getStatusChip(pickup.status)}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          borderColor: '#2e7d32',
                          color: '#2e7d32',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: '#2e7d32',
                            color: 'white',
                          },
                        }}
                        onClick={() => handleDownload(pickup.id)}
                        startIcon={<FontAwesomeIcon icon={faDownload} />}
                      >
                        Download
                      </Button>
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
