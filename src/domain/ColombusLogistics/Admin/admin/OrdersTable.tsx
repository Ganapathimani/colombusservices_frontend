import React, { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
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
  LinearProgress,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import {
  useListOrdersQuery,
  useDeleteOrderMutation,
  useGetOrderQuery,
} from '#api/colombusLogisticsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import LogisticsRegistrationWizard from '#domain/ColombusLogistics/RegistrationForm/LogisticsRegistrationForm';
import type {
  TLogisticsRegistrationForm,
  TCargoDetail,
  TDimension,
} from '#domain/models/TLogisticsRegistrationForm';

type OrderType = {
  id: string;
  orderNumber: string;
  originCompanyName: string;
  originLocation: string;
  destinationLocation: string;
  status: string;
};

const OrdersTableGrid = () => {
  const { data, isLoading } = useListOrdersQuery() as {
    data: OrderType[] | undefined;
    isLoading: boolean;
  };

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<OrderType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrder, setMenuOrder] = useState<OrderType | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const {
    data: orderData,
    isFetching: fetchingOrder,
  } = useGetOrderQuery(selectedOrder?.id as string, {
    skip: !selectedOrder,
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const rows = useMemo(() => (
    data?.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.originCompanyName,
      origin: order.originLocation,
      destination: order.destinationLocation,
      status: order.status,
    })) || []
  ), [data]);

  const filteredRows = useMemo(() => {
    if (statusFilter === 'all') {
      return rows;
    }
    return rows.filter((row) => row.status.toLowerCase() === statusFilter.toLowerCase());
  }, [rows, statusFilter]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const mapOrderToForm = (order: any): TLogisticsRegistrationForm => ({
    id: order.id,
    vehicleType: order.vehicleType,
    vehicleModel: order.vehicleModel,
    rate: Number(order.rate) || 0,
    rateQuotedBy: order.rateQuotedBy || '',
    notes: order.notes || '',
    ftlType: order.ftlType,
    loadingType: order.loadingType,
    cargoDetails: (order.packages || []).map(
      (pkg: any): TCargoDetail => ({
        package: pkg.packages,
        netWeight: pkg.netWeight,
        crossWeight: pkg.crossWeight,
        materialType: pkg.materialType,
        photo: null,
        hasDimensions: pkg.hasDimensions,
        dimensions: (pkg.dimensions || []).map(
          (dim: any): TDimension => ({
            handlingUnit: dim.handlingUnit,
            length: dim.length,
            width: dim.width,
            height: dim.height,
            cubicFeet: dim.cubicFeet,
          }),
        ),
      }),
    ),
    originCompanyName: order.originCompanyName,
    originAddress: order.originAddress,
    originLocation: order.originLocation,
    originPincode: order.originPincode,
    originEmailId: order.originEmailId,
    originContactNumber: order.originContactNumber,
    pickupDate: order.pickupDate ? new Date(order.pickupDate) : null,
    destinationCompanyName: order.destinationCompanyName,
    destinationAddress: order.destinationAddress,
    destinationEmailId: order.destinationEmailId,
    destinationLocation: order.destinationLocation,
    destinationPincode: order.destinationPincode,
    destinationContactNumber: order.destinationContactNumber,
    customerName: order?.customerName,
    customerEmail: order?.customerEmail,
    customerMobile: order?.customerMobile,
    customerCompanyName: order?.customerCompanyName,
    status: '',
    vehicleNumber: '',
    driverMobile: '',
    driverName: '',
    pickupTeamNotes: '',
    documents: {
      ewayBillUrl: '',
      ewayBillLink: '',
      packageListUrl: '',
      // invoiceUrls: '',
      lrNumber: '',
      lrUrl: '',
      // manifestLocation: '',
    },
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, order: OrderType) => {
    setAnchorEl(event.currentTarget);
    setMenuOrder(order);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrder(null);
  };
  const handleEdit = (order: OrderType) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
    handleMenuClose();
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
  };

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: 'Order Number', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
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

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'green', fontWeight: 600 }}>
          Admin
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 1 }}>
          Manage and track all logistics orders, including vehicle and driver assignments.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
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
            <MenuItem value="Completed">Confirmed</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#328436',
            borderRadius: '8px',
            px: 3,
          }}
          startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: '15px' }} />}
          onClick={() => {
            setSelectedOrder(null);
            setDrawerOpen(true);
          }}
        >
          Create Order
        </Button>
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

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { md: 650, xs: 400 } } }}
      >
        {fetchingOrder ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <LinearProgress />
          </Box>
        ) : (
          <LogisticsRegistrationWizard
            defaultValues={selectedOrder ? mapOrderToForm(orderData) : undefined}
            onClose={() => setDrawerOpen(false)}
            title={selectedOrder ? 'Edit Order' : 'Create Order'}
          />
        )}
      </Drawer>

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

export default OrdersTableGrid;
