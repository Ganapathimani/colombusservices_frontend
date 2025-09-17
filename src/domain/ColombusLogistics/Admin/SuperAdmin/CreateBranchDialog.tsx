import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import toast from 'react-hot-toast';

type CreateBranchDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (branchName: string) => Promise<void> | void;
};

const CreateBranchDialog = ({
  open,
  onClose,
  onCreate,
}: CreateBranchDialogProps) => {
  const [branchName, setBranchName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!branchName.trim()) {
      toast.error('Branch name is required');
      return;
    }
    try {
      setIsSubmitting(true);
      await onCreate(branchName.trim());
      toast.success('Branch created successfully');
      setBranchName('');
      onClose();
    } catch (err) {
      toast.error('Failed to create branch');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create New Branch</DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <TextField
            label="Branch Name"
            variant="standard"
            fullWidth
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBranchDialog;
