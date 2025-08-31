import React, { useState, useMemo, useCallback } from 'react';
import {
  Card, CardContent, CardHeader, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, TableContainer, Chip, Box,
  Button, MenuItem, Select, FormControl, InputLabel, Avatar,
  LinearProgress, Stack,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp, faPlus, faFilter, faTruck,
  faCheckCircle, faTimesCircle, faClock, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash/fp';
import { useListOrdersQuery } from '#api/colombusLogisticsApi';
import { useNavigate } from 'react-router-dom';

const RateRequests = () => {
  const [filter, setFilter] = useState('ALL');
  const { data, isLoading } = useListOrdersQuery();
  const navigate = useNavigate();

  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const handleNewRequest = useCallback(() => {
    navigate('/registration');
  }, [navigate]);

  const mappedRequests = useMemo(
    () => map((o: any) => ({
      id: o?.id ?? '—',
      date: o?.pickupDate ?? null,
      orderNumber: o?.orderNumber ?? '—',
      origin: o?.originCustomerName ?? '—',
      destination: o?.destinationCustomerName ?? '—',
      vehicle: o?.vehicleType ?? '—',
      amount: o?.rate ?? 0,
      priority: o?.ftlType ?? 'Normal',
      notes: o?.notes ?? '',
      vehicleModel: o?.vehicleModel ?? '—',
      status: (o?.status ?? 'PENDING').toUpperCase(),
    }))(orders),
    [orders],
  );

  const counts = useMemo(
    () => ({
      Total: mappedRequests.length,
      Pending: mappedRequests.filter((r) => r.status === 'PENDING').length,
      Approved: mappedRequests.filter((r) => r.status === 'APPROVED').length,
      Rejected: mappedRequests.filter((r) => r.status === 'REJECTED').length,
    }),
    [mappedRequests],
  );

  const filteredRequests = useMemo(
    () => (filter === 'ALL'
      ? mappedRequests
      : mappedRequests.filter((req) => req.status === filter)),
    [mappedRequests, filter],
  );

  const getStatusConfig = (status: string) => {
    const configs: any = {
      APPROVED: {
        icon: <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 14 }} />,
        bgColor: '#e8f5e9',
        textColor: '#2e7d32',
      },
      PENDING: {
        icon: <FontAwesomeIcon icon={faClock} style={{ fontSize: 14 }} />,
        bgColor: '#fff3e0',
        textColor: '#f57c00',
      },
      REJECTED: {
        icon: <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: 14 }} />,
        bgColor: '#ffebee',
        textColor: '#d32f2f',
      },
    };
    return configs[status] || configs.PENDING;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case 'HIGH':
        return '#ff1744';
      case 'MEDIUM':
        return '#ff9800';
      case 'LOW':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  const stats = [
    {
      label: 'Total Requests',
      value: counts.Total,
      color: '#3b82f6',
      icon: faArrowTrendUp,
    },
    {
      label: 'Pending',
      value: counts.Pending,
      color: '#f59e0b',
      icon: faClock,
    },
    {
      label: 'Approved',
      value: counts.Approved,
      color: '#10b981',
      icon: faCheckCircle,
    },
    {
      label: 'Rejected',
      value: counts.Rejected,
      color: '#ef4444',
      icon: faTimesCircle,
    },
  ];

  const getStatusChip = (status: string) => {
    const config = getStatusConfig(status);
    return (
      <Chip
        icon={config.icon}
        label={status}
        sx={{
          fontWeight: 600,
          backgroundColor: config.bgColor,
          color: config.textColor,
          textTransform: 'lowercase',
          border: `1px solid ${config.textColor}20`,
          '& .MuiChip-icon': { color: config.textColor },
        }}
        size="small"
      />
    );
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Rate Requests Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track all your transportation rate requests
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={4}>
        {map((stat: any) => (
          <Card
            key={stat.label}
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              '&:hover': { boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                    width: 56,
                    height: 56,
                  }}
                >
                  <FontAwesomeIcon icon={stat.icon} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        ))(stats)}
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            label="Status Filter"
            onChange={(e) => setFilter(e.target.value)}
            startAdornment={<FontAwesomeIcon icon={faFilter} style={{ marginRight: 8, color: '#64748b' }} />}
          >
            <MenuItem value="ALL">All Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="small"
          onClick={handleNewRequest}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          sx={{
            borderRadius: 3,
            px: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
              boxShadow: '0 8px 20px rgba(56, 142, 60, 0.3)',
            },
          }}
        >
          New Rate Request
        </Button>
      </Stack>

      {isLoading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <CardHeader
          title={(
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
              Rate Requests (
              {filteredRequests.length}
              )
            </Typography>
          )}
          sx={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Route</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Vehicle</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Vehicle Model</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.map((req) => (
                  <TableRow
                    key={req.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9fafb' },
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <TableCell>
                      {req.date ? new Date(req.date).toLocaleDateString('en-GB') : '—'}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 14, color: '#10b981' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{req.origin}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <FontAwesomeIcon icon={faTruck} style={{ fontSize: 14, color: '#6b7280' }} />
                          <Typography variant="body2" color="text.secondary">{req.destination}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{req.vehicle}</TableCell>
                    <TableCell>{req.vehicleModel}</TableCell>
                    <TableCell>
                      ₹
                      {req.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: getPriorityColor(req.priority),
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: getPriorityColor(req.priority), textTransform: 'lowercase', fontSize: '17px' }}
                        >
                          {req.priority}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{getStatusChip(req.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredRequests.length === 0 && !isLoading && (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>No requests found</Typography>
              <Typography variant="body2">
                {filter === 'ALL'
                  ? 'No rate requests available'
                  : `No ${filter.toLowerCase()} requests`}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RateRequests;
