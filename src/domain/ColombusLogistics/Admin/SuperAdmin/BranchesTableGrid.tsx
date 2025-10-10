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
} from '@mui/material';
import type { GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { TBranch } from '#domain/models/TBranch';
import {
  useListBranchesQuery,
  useDeleteBranchMutation,
  useCreateBranchMutation,
} from '#api/colombusLogisticsApi';
import toast from 'react-hot-toast';
import CreateBranchDialog from './CreateBranchDialog';

const BranchesTableGrid = () => {
  const { data, isLoading, refetch } = useListBranchesQuery() as {
    data: TBranch[] | undefined;
    isLoading: boolean;
    refetch: () => void;
  };

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuBranch, setMenuBranch] = useState<TBranch | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<TBranch | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const adminId = user?.id;

  const [createBranch] = useCreateBranchMutation();
  const [deleteBranch, { isLoading: deleting }] = useDeleteBranchMutation();

  const rows = useMemo(
    () => data?.map((branch) => ({
      id: branch.id,
      name: branch.name,
      location: branch.location || '-',
    })) || [],
    [data],
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, branch: TBranch) => {
    setAnchorEl(event.currentTarget);
    setMenuBranch(branch);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuBranch(null);
  };

  const handleDeleteClick = (branch: TBranch) => {
    setBranchToDelete(branch);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!branchToDelete) {
      return;
    }
    try {
      await deleteBranch(branchToDelete.id!).unwrap();
      refetch();
    } catch {
      throw new Error('Failed to delete branch');
    } finally {
      setDeleteDialogOpen(false);
      setBranchToDelete(null);
    }
  };

  const handleCreateBranch = useCallback(
    async (branch: { name: string; location: string }) => {
      if (!branch.name.trim()) {
        toast.error('Branch name is required');
        return;
      }
      if (!adminId) {
        toast.error('Admin ID missing. Cannot create branch.');
        return;
      }

      try {
        await createBranch({ name: branch.name, location: branch.location, adminId }).unwrap();
        setCreateDialogOpen(false);
        refetch();
      } catch {
        throw new Error('Failed to create branch');
      }
    },
    [createBranch, refetch, adminId],
  );

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Branch Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<TBranch>) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" sx={{ color: 'green', fontWeight: 600 }}>
            Branches
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 1 }}>
            Manage and track all company branches.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ bgcolor: '#328436', borderRadius: '8px', px: 3 }}
          startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: '15px' }} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Create Branch
        </Button>
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
        <MenuItem onClick={() => handleDeleteClick(menuBranch!)}>Delete</MenuItem>
      </Menu>

      <CreateBranchDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={handleCreateBranch}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Branch</DialogTitle>
        <DialogContent>
          Are you sure you want to delete branch
          {' '}
          <strong>{branchToDelete?.name}</strong>
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

export default BranchesTableGrid;
