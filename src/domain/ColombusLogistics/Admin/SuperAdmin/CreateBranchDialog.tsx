import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import toast from 'react-hot-toast';

type CreateBranchDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (branch: { name: string; location: string }) => Promise<void> | void;
};

const CreateBranchDialog = ({
  open,
  onClose,
  onCreate,
}: CreateBranchDialogProps) => {
  const [branchName, setBranchName] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!branchName.trim() || !location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      setIsSubmitting(true);
      await onCreate({ name: branchName.trim(), location: location.trim() });
      toast.success('Branch created successfully');
      setBranchName('');
      setLocation('');
      onClose();
    } catch (err) {
      toast.error('Failed to create branch');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.2rem', pb: 0 }}>
        Create New Branch
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={2}>
          <TextField
            label="Branch Name"
            variant="outlined"
            fullWidth
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{ borderRadius: 2, px: 3 }}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBranchDialog;
