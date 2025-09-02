import React, { useState } from 'react';
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
} from '@mui/material';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { useListOrdersQuery, useDeleteOrderMutation } from '#api/colombusLogisticsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

type OrderType = {
  id: string;
  orderNumber: string;
  originCustomerName: string;
  originLocation: string;
  destinationLocation: string;
  status: string;
};

const OrdersDataGrid = () => {
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

  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

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

  const rows = data?.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    customer: order.originCustomerName,
    origin: order.originLocation,
    destination: order.destinationLocation,
    status: order.status,
  })) || [];

  return (
    <Box p={3} height="80vh">
      <Typography variant="h6" fontWeight={600} mb={2}>
        Orders Management
      </Typography>

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
        <MenuItem onClick={() => handleEdit(menuOrder!)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(menuOrder!)}>
          Delete
        </MenuItem>
      </Menu>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 450, p: 3 } }}>
        <Typography variant="h6" mb={2}>
          Edit Order
        </Typography>
        {selectedOrder && (
          <Typography>
            Editing Order:
            {' '}
            <strong>{selectedOrder.orderNumber}</strong>
          </Typography>
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

export default OrdersDataGrid;
