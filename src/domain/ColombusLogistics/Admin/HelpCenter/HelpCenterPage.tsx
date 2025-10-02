import React, { useState, useCallback } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Drawer,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import type { TEnquiry } from '#domain/models/TEnquiry';
import { useListEnquiryQuery, useUpdateEnquiryMutation } from '#api/colombusLogisticsApi';
import EditEnquiryPanel from './EditEnquirySidePanel';

const HelpCenterPage = () => {
  const { data: enquiries = [], isLoading } = useListEnquiryQuery();
  const [updateEnquiry] = useUpdateEnquiryMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuEnquiry, setMenuEnquiry] = useState<TEnquiry | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<TEnquiry | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string>('');

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, enquiry: TEnquiry) => {
      setAnchorEl(event.currentTarget);
      setMenuEnquiry(enquiry);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setMenuEnquiry(null);
  }, []);

  const handleEditClick = useCallback(() => {
    if (menuEnquiry) {
      setEditingEnquiry(menuEnquiry);
      setUpdatedStatus(menuEnquiry.status || '');
      setDrawerOpen(true);
    }
    handleMenuClose();
  }, [menuEnquiry, handleMenuClose]);

  const handleCancel = useCallback(() => {
    setDrawerOpen(false);
    setEditingEnquiry(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (editingEnquiry) {
      try {
        await updateEnquiry({
          id: editingEnquiry.id!,
          data: { status: updatedStatus },
        }).unwrap();

        setDrawerOpen(false);
        setEditingEnquiry(null);
      } catch (err) {
        throw new Error('Failed to update enquiry status');
      }
    }
  }, [editingEnquiry, updatedStatus, updateEnquiry]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'pickupId', headerName: 'Pickup ID', flex: 1 },
    { field: 'message', headerName: 'Message', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams<TEnquiry>) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Help Center
      </Typography>

      <DataGrid
        rows={enquiries}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        getRowId={(row) => row.email}
        loading={isLoading}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCancel}
        PaperProps={{ sx: { width: 450, p: 3 } }}
      >
        {editingEnquiry && (
          <EditEnquiryPanel
            enquiry={editingEnquiry}
            status={updatedStatus}
            onStatusChange={setUpdatedStatus}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default HelpCenterPage;
