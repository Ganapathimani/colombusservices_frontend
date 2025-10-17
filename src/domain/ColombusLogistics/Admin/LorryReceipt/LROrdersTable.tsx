import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useListOrdersQuery, useUpdateOrderMutation, useGetStaffUserQuery } from '#api/colombusLogisticsApi';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import LRTeamSidePanel from './LRSidePanel';
import { generateOgplPdf } from './_generateLRPdf';

const LROrdersTable = () => {
  const storedUser = localStorage.getItem('user');
  let userId: string = '';
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userId = user.id;
    } catch {
      throw new Error('Error parsing user data from localStorage');
    }
  }

  const { data: userData, isLoading: userLoading } = useGetStaffUserQuery({ id: userId });
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const branchOrders = useMemo(() => {
    if (!ordersData || !userData) {
      return [];
    }
    return ordersData.filter((order) => order.branchId === userData.branchId && order.status === 'REVIEW');
  }, [ordersData, userData]);

  const rows = useMemo(() => branchOrders.map((o: TLogisticsRegistrationForm) => {
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
  }), [branchOrders]);

  const handleMenuOpen = useCallback((
    event: React.MouseEvent<HTMLButtonElement>,
    order: TLogisticsRegistrationForm,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuOrder(order);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setMenuOrder(null);
  }, []);

  const handleEdit = useCallback((order: TLogisticsRegistrationForm) => {
    const fullOrder = branchOrders.find((o) => o.id === order.id) || null;
    setSelectedOrder(fullOrder);
    setIsEditPanelOpen(true);
    handleMenuClose();
  }, [branchOrders, handleMenuClose]);

  const handleSidePanelClose = useCallback(() => {
    setIsEditPanelOpen(false);
    setSelectedOrder(null);
  }, []);

  const handleOrderSubmit = useCallback(async (updated: Partial<TLogisticsRegistrationForm>) => {
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
  }, [handleSidePanelClose, selectedOrder?.id, updateOrder]);

  const handleGenerateOgpl = () => {
    const selectedOrders = branchOrders.filter((o) => selectedIds.includes(o.id!));
    if (!selectedOrders.length) {
      toast.error('Select at least one order to generate OGPL');
      return;
    }

    const row = selectedOrders.map((o) => {
      const pickup = o.pickups?.[0] ?? {};
      const delivery = o.deliveries?.[0] ?? {};
      return {
        lrNo: `LR-${o.id}`,
        lrDate: new Date().toLocaleDateString(),
        weight: o.packages?.[0]?.grossWeight ?? '0',
        articleName: 'MATERIAL',
        qty: o.packages?.[0]?.packageCount ?? 1,
        value: o.packages?.[0]?.totalCubicFeet ?? 0,
        consignor: pickup?.companyName ?? '—',
        consignee: delivery?.companyName ?? '—',
        destination: delivery?.companyName ?? '—',
      };
    });

    const pdf = generateOgplPdf(row, {
      ogplNo: `OGPL-${Date.now()}`,
      date: new Date().toLocaleDateString(),
    });

    pdf.download(`OGPL_${new Date().toISOString()}.pdf`);
  };

  const columns: GridColDef[] = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Checkbox
          checked={selectedIds.includes(params.row.id)}
          onChange={(e) => {
            const { id } = params.row;
            if (e.target.checked) {
              setSelectedIds((prev) => [...prev, id]);
            } else {
              setSelectedIds((prev) => prev.filter((x) => x !== id));
            }
          }}
        />
      ),
    },
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
    { field: 'destination', headerName: 'Delivery To', flex: 1 },
    { field: 'vehicle', headerName: 'Vehicle No', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>LR Team Dashboard</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            disabled={selectedIds.length === 0}
            onClick={handleGenerateOgpl}
          >
            Generate OGPL (
            {selectedIds.length}
            )
          </Button>
        </Stack>
      </Stack>

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

      {selectedOrder && (
        <LRTeamSidePanel
          open={isEditPanelOpen}
          onClose={handleSidePanelClose}
          defaultValues={selectedOrder}
          onSubmit={handleOrderSubmit}
        />
      )}
    </Box>
  );
};

export default LROrdersTable;
