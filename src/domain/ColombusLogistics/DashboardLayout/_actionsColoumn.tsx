import React, { useState } from 'react';
import {
  IconButton, Menu, MenuItem,
  Drawer,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import OrderSidePanel from '#components/OrderSidePanel/OrderSidePanel';

type ActionsColumnProps = {
  row: any;
  onDelete: (id: string) => void;
};

const ActionsColumn = ({ row, onDelete }: ActionsColumnProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteClick = () => {
    handleMenuClose();
    setOpenDeleteDialog(true);
  };

  const handleEditClick = () => {
    handleMenuClose();
    setOpenDrawer(true);
  };

  const handleConfirmDelete = () => {
    onDelete(row.id);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div style={{ width: 600, padding: 24 }}>
          <OrderSidePanel
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            defaultValues={row}
          />
        </div>
      </Drawer>
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this rate request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionsColumn;
