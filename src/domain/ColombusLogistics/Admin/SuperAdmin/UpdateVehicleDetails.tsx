import React, { useState, useMemo, useCallback } from 'react';
import {
  Card, CardContent, CardHeader, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, TableContainer, Chip, Box,
  Button, MenuItem, Select, FormControl, InputLabel,
  LinearProgress, Stack,
  Dialog,
  Menu,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faFilter, faTruck,
  faCheckCircle, faTimesCircle, faClock, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'lodash/fp';
import { useDeleteOrderMutation, useListOrdersQuery } from '#api/colombusLogisticsApi';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@react-shanties/core';
import AddVechileDetailsModal from '#pages/Layout/Orders/AddVehicleDetailsModal';
import { GridMoreVertIcon } from '@mui/x-data-grid';

type OrderType = {
  id: string;
  orderNumber: string;
  originCompanyName: string;
  originLocation: string;
  destinationLocation: string;
  status: string;
};

const UpdateVehicleDetails = () => {
  const [filter, setFilter] = useState('ALL');
  const [isVehicleDetailsModalOpen, ,vehicleDetailsModalOpen] = useToggle(false);
  const [currentEditOrder, setCurrentEditOrder] = useState<OrderType | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderType | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useListOrdersQuery();
  const navigate = useNavigate();

  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleNewRequest = useCallback(() => {
    navigate('/registration');
  }, [navigate]);

  const storedUser = localStorage.getItem('user');
  let userRole = 'CUSTOMER';
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userRole = user?.role;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const mappedRequests = useMemo(
    () => map((o: any) => ({
      id: o?.id ?? '—',
      date: o?.pickupDate ?? null,
      orderNumber: o?.orderNumber ?? '—',
      origin: o?.originCompanyName ?? '—',
      destination: o?.destinationCompanyName ?? '—',
      vehicle: o?.vehicleType ?? '—',
      rate: o?.rate ?? 0,
      priority: o?.ftlType ?? 'Normal',
      notes: o?.notes ?? '',
      vehicleModel: o?.vehicleModel ?? '—',
      status: (o?.status ?? 'PENDING').toUpperCase(),
    }))(orders),
    [orders],
  );

  const filteredRequests = useMemo(
    () => mappedRequests.filter(
      (req) => (filter === 'ALL' ? (req.status === 'PICKED_UP' || req.status === 'CONFIRMED') : req.status === filter),
    ),
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

  const handleEditOrderModal = (item: any) => {
    vehicleDetailsModalOpen.setOn();
    setCurrentEditOrder(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (order: any) => {
    handleEditOrderModal(order);
    handleMenuClose();
  };

  const handleDeleteClick = (order: any) => {
    handleMenuClose();
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, order: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentEditOrder(order);
  };

  const handleDeleteConfirm = async () => {
    console.log('orderToDelete', orderToDelete);
    if (!orderToDelete) {
      return;
    }
    await deleteOrder(orderToDelete.id).unwrap();
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
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
          Pick up Team
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update vehicle and driver details to the order
        </Typography>
      </Box>
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
            <MenuItem value="CONFIRMED">Confirmed</MenuItem>
            <MenuItem value="PICKED_UP">Picked up</MenuItem>
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
                  <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  {
                    userRole !== 'CUSTOMER'
                    && <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                  }
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
                    {
                    userRole !== 'CUSTOMER'
                    && (
                    <TableCell sx={{ fontWeight: 600 }}>
                      <IconButton onClick={(e) => handleMenuOpen(e, req)}>
                        <GridMoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleEdit(req)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDeleteClick(req)}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                    )
                  }
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
      <Dialog open={isVehicleDetailsModalOpen} onClose={vehicleDetailsModalOpen.setOff} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' } }}>
        <AddVechileDetailsModal
          currentEditOrder={currentEditOrder}
          onClose={vehicleDetailsModalOpen.setOff}
        />
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          Are you sure you want to delete order
          {' '}
          <strong>{orderToDelete?.orderNumber}</strong>
          ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateVehicleDetails;
