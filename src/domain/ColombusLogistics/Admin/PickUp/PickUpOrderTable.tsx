import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faTruck,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {
  useListOrdersQuery,
  useUpdateOrderMutation,
  useGetStaffUserQuery,
} from '#api/colombusLogisticsApi';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import PickupTeamSidePanel from './PickUpSidePanel';

const PickupOrdersTable = () => {
  const storedUser = localStorage.getItem('user');
  let userId: string;
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userId = user.id;
    } catch {
      throw new Error('Error parsing user data from localStorage');
    }
  }

  const { data: userData, isLoading: userLoading } = useGetStaffUserQuery({ id: userId! });
  const { data: ordersData, isLoading: ordersLoading } = useListOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<TLogisticsRegistrationForm | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrder, setMenuOrder] = useState<TLogisticsRegistrationForm | null>(null);
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

  const rows = useMemo(
    () => branchOrders.map((o: TLogisticsRegistrationForm) => {
      const pickup = o?.pickups?.[0] ?? {};
      const delivery = o?.deliveries?.[0] ?? {};
      const vehicle = o?.vehicles?.[0] ?? {};

      return {
        id: o.id,
        date: pickup?.pickupDate ?? null,
        origin: pickup?.companyName ?? '—',
        destination: delivery?.companyName ?? '—',
        vehicle: vehicle?.vehicleType ?? '—',
        vehicleModel: vehicle?.model ?? '—',
        priority: vehicle?.ftlType ?? 'Normal',
        notes: o?.notes ?? '',
        status: (o?.status ?? 'PENDING').toUpperCase(),
        fullData: o,
      };
    }),
    [branchOrders],
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: TLogisticsRegistrationForm,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuOrder(order);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrder(null);
  };

  const handleEdit = (order: TLogisticsRegistrationForm) => {
    const fullOrder = branchOrders.find((o) => o.id === order.id) || null;
    setSelectedOrder(fullOrder);
    setIsEditPanelOpen(true);
    handleMenuClose();
  };

  const handleSidePanelClose = () => {
    setIsEditPanelOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderSubmit = async (updated: Partial<TLogisticsRegistrationForm>) => {
    try {
      if (!selectedOrder?.id) {
        throw new Error('No order selected');
      }
      await updateOrder({ orderId: selectedOrder.id, data: updated }).unwrap();
      toast.success('Pickup Order updated successfully');
      handleSidePanelClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update Pickup Order');
    }
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
    { field: 'date', headerName: 'Pickup Date', flex: 1 },
    {
      field: 'origin',
      headerName: 'Pickup From',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 14, color: '#10b981' }} />
          <Typography sx={{ ml: 1, fontWeight: 600 }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'destination',
      headerName: 'Delivery To',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faTruck} style={{ fontSize: 14, color: '#6b7280' }} />
          <Typography sx={{ ml: 1, color: 'text.secondary' }}>{params.value}</Typography>
        </Box>
      ),
    },
    { field: 'vehicle', headerName: 'Vehicle No', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<TLogisticsRegistrationForm>) => (
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
          Pickup Orders
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Manage and track pickup orders for your branch.
        </Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEdit(menuOrder!)}>Edit</MenuItem>
      </Menu>

      <PickupTeamSidePanel
        open={isEditPanelOpen}
        onClose={handleSidePanelClose}
        defaultValues={selectedOrder!}
        onSubmit={handleOrderSubmit}
      />
    </Box>
  );
};

export default PickupOrdersTable;
