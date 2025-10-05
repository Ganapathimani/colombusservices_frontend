import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  useListOrdersQuery,
  useDeleteOrderMutation,
} from '#api/colombusLogisticsApi';
import DataGridTable from '#components/DataGrid/DataGrid';
import ActionsColumn from '../_actionsColoumn';

const RateRequests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  const { data, isLoading } = useListOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const mappedRequests = useMemo(
    () => orders.map((o: any) => {
      const pickup = o?.pickups?.[0] ?? {};
      const delivery = o?.deliveries?.[0] ?? {};
      const vehicle = o?.vehicles?.[0] ?? {};

      return {
        id: o?.id ?? '—',
        date: pickup?.pickupDate
          ? new Date(pickup.pickupDate).toLocaleDateString('en-GB')
          : '—',
        route: `${pickup?.companyName ?? '—'} → ${delivery?.companyName ?? '—'}`,
        vehicle: vehicle?.vehicleType ?? '—',
        vehicleModel: vehicle?.model ?? '—',
        rate: o?.rate ?? 0,
        priority: (vehicle?.ftlType ?? 'Normal').toUpperCase(),
        status: (o?.status ?? 'PENDING').toUpperCase(),
        fullData: o,
      };
    }),
    [orders],
  );

  const filteredRequests = useMemo(
    () => mappedRequests.filter(
      (r) => r.rate === 0 && (filter === 'ALL' ? true : r.status === filter),
    ),
    [mappedRequests, filter],
  );

  const handleDelete = useCallback(async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
    } catch (err) {
      throw new Error('Delete failed');
    }
  }, [deleteOrder]);

  const handleNewRequest = useCallback(() => {
    navigate('/registration');
  }, [navigate]);

  const columns = useMemo(() => {
    const priorityColorMap: Record<string, 'error' | 'warning' | 'success'> = {
      HIGH: 'error',
      MEDIUM: 'warning',
      NORMAL: 'success',
    };

    const statusColorMap: Record<string, 'success' | 'error' | 'warning'> = {
      APPROVED: 'success',
      REJECTED: 'error',
      PENDING: 'warning',
    };

    return [
      {
        field: 'date', headerName: 'Date', flex: 1, minWidth: 120,
      },
      {
        field: 'route', headerName: 'Route', flex: 1.5, minWidth: 180,
      },
      {
        field: 'vehicle', headerName: 'Vehicle', flex: 1, minWidth: 130,
      },
      {
        field: 'vehicleModel', headerName: 'Model', flex: 1, minWidth: 130,
      },
      {
        field: 'rate',
        headerName: 'Amount',
        flex: 1,
        minWidth: 100,
        renderCell: (params: any) => `₹${params.row.rate.toLocaleString()}`,
      },
      {
        field: 'priority',
        headerName: 'Priority',
        flex: 1,
        minWidth: 120,
        renderCell: (params: any) => (
          <Chip
            label={params.value.toUpperCase()}
            color={priorityColorMap[params.value] || 'default'}
            size="small"
            sx={{
              fontWeight: 500, textTransform: 'lowercase', px: 1.5, py: 2.2, fontSize: '15px',
            }}
          />
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 120,
        renderCell: (params: any) => (
          <Chip
            label={params.value.toUpperCase()}
            color={statusColorMap[params.value] || 'default'}
            size="small"
            sx={{
              fontWeight: 500, textTransform: 'lowercase', px: 1.5, py: 2.2, fontSize: '15px',
            }}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 130,
        sortable: false,
        renderCell: (params: any) => (
          <ActionsColumn
            row={params.row.fullData}
            onDelete={handleDelete}
          />
        ),
      },
    ];
  }, [handleDelete]);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
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

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={filter}
              label="Status Filter"
              onChange={(e) => setFilter(e.target.value)}
              startAdornment={(
                <FontAwesomeIcon
                  icon={faFilter}
                  style={{ marginRight: 8, color: '#64748b' }}
                />
              )}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleNewRequest}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            sx={{
              borderRadius: 3,
              px: 2,
              py: 1.2,
              background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
            }}
          >
            New Request
          </Button>
        </Stack>
      </Stack>

      {isLoading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      <DataGridTable
        rows={filteredRequests}
        columns={columns}
        loading={isLoading}
        autoHeight
        rowHoverEffect
      />
    </Box>
  );
};

export default RateRequests;
