import React, { useState } from 'react';
import {
  IconButton, Menu, MenuItem,
  Drawer,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LogisticsRegistrationWizard from '../RegistrationForm/LogisticsRegistrationForm';

type ActionsColumnProps = {
  row: any;
  onDelete: (id: string) => void;
  onEdit: (updatedData: any) => void;
};

const ActionsColumn = ({ row, onDelete, onEdit }: ActionsColumnProps) => {
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
          <LogisticsRegistrationWizard
            defaultValues={row}
            title="Edit Rate Request"
            onClose={() => setOpenDrawer(false)}
            onSubmitSuccess={(updatedData) => {
              onEdit(updatedData);
              setOpenDrawer(false);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default ActionsColumn;
