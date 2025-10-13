import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV, faClock, faFilter, faCheckCircle, faTimesCircle,
  faTruck, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import OrderSidePanel from '#components/OrderSidePanel/OrderSidePanel';
import {
  useListOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetSuperAdminUserQuery,
} from '#api/colombusLogisticsApi';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';

type OrderType = {
  id: string;
  orderNumber: string;
  originCompanyName: string;
  originLocation: string;
  destinationLocation: string;
  status: string;
  branchId: string;
};

const AdminOrders = () => {
  const storedUser = localStorage.getItem('user');
  let userId: string;
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userId = user.id;
    } catch (err) {
      throw new Error('Error parsing user data from localStorage');
    }
  }
  const { data: userData, isLoading: userLoading } = useGetSuperAdminUserQuery({ id: userId! });

  const { data: ordersData, isLoading: ordersLoading } = useListOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<TLogisticsRegistrationForm | null>(null);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrder, setMenuOrder] = useState<OrderType | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<OrderType | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const branchOrders = useMemo(() => {
    if (!ordersData || !userData) {
      return [];
    }
    return ordersData.filter((order) => order.branchId === userData.branchId);
  }, [ordersData, userData]);

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

  const rows = useMemo(() => branchOrders.map((o: TLogisticsRegistrationForm) => {
    const pickup = o?.pickups?.[0] ?? {};
    const delivery = o?.deliveries?.[0] ?? {};
    const vehicle = o?.vehicles?.[0] ?? {};

    return {
      id: o?.id ?? '—',
      date: pickup?.pickupDate ?? null,
      origin: pickup?.companyName ?? '—',
      destination: delivery?.companyName ?? '—',
      vehicle: vehicle?.vehicleType ?? '—',
      vehicleModel: vehicle?.model ?? '—',
      rate: o?.rate ?? 0,
      priority: vehicle?.ftlType ?? 'Normal',
      notes: o?.notes ?? '',
      status: (o?.status ?? 'PENDING').toUpperCase(),
      fullData: o,
    };
  }), [branchOrders]);

  const filteredRows = useMemo(() => {
    let visibleRows = rows.filter((row) => row.status !== 'APPROVED');

    if (statusFilter !== 'all') {
      visibleRows = visibleRows.filter(
        (row) => row.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    return visibleRows;
  }, [rows, statusFilter]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrder(null);
  };

  const handleEdit = (order: OrderType) => {
    const fullOrder = branchOrders.find((o) => o.id === order.id) || null;
    setSelectedOrder(fullOrder as TLogisticsRegistrationForm);
    setIsEditOrderModalOpen(true);
    handleMenuClose();
  };

  const handleSidePanelClose = () => {
    setIsEditOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderSubmit = async (order: TLogisticsRegistrationForm) => {
    try {
      if (!order?.id) {
        throw new Error('Order ID missing');
      }
      await updateOrder({ orderId: order.id, data: { status: 'APPROVED' } }).unwrap();
      toast.success('Order status updated to APPROVED');
      handleSidePanelClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update order');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, order: OrderType) => {
    setAnchorEl(event.currentTarget);
    setMenuOrder(order);
  };

  const handleDeleteClick = (order: OrderType) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!orderToDelete) {
      return;
    }
    await deleteOrder(orderToDelete.id).unwrap();
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
    toast.success('Order deleted successfully');
  };

  const getStatusChip = useCallback((status: string) => {
    const config = getStatusConfig(status);
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          fontWeight: 600,
          bgcolor: config.bgColor,
          color: config.textColor,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: `1px solid ${config.textColor}20`,
          textTransform: 'lowercase',
        }}
      >
        {config.icon}
        <Typography sx={{ ml: 0.5, fontSize: 12 }}>{status.toLowerCase()}</Typography>
      </Box>
    );
  }, []);

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'pickup',
      headerName: 'PickUp',
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          height="100%"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 14, color: '#10b981' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, ml: 1 }}>
            {params.row.origin}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'delivery',
      headerName: 'Delivery',
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          height="100%"
        >
          <FontAwesomeIcon icon={faTruck} style={{ fontSize: 14, color: '#6b7280' }} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {params.row.destination}
          </Typography>
        </Box>
      ),
    },
    { field: 'vehicle', headerName: 'Vehicle', flex: 1 },
    { field: 'vehicleModel', headerName: 'Vehicle Model', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams<OrderType>) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      ),
    },
  ];

  if (userLoading || ordersLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'green', fontWeight: 600 }}>
          Admin
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 1 }}>
          Manage and track all logistics orders for your branch.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="status-filter-label">
            <FontAwesomeIcon icon={faFilter} style={{ marginRight: 6 }} />
            Status
          </InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEdit(menuOrder!)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDeleteClick(menuOrder!)}>Delete</MenuItem>
      </Menu>

      <OrderSidePanel
        open={isEditOrderModalOpen}
        onClose={handleSidePanelClose}
        defaultValues={selectedOrder!}
        onSubmit={handleOrderSubmit}
      />

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

export default AdminOrders;
