import React from 'react';
import {
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import type { TEnquiry } from '#domain/models/TEnquiry';

type EditEnquiryPanelProps = {
  enquiry: TEnquiry;
  status: string;
  onStatusChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

const EditEnquiryPanel = ({
  enquiry,
  status,
  onStatusChange,
  onCancel,
  onSubmit,
}: EditEnquiryPanelProps) => (
  <Stack spacing={3}>
    <Typography variant="h6" fontWeight={600}>
      Edit Enquiry
    </Typography>
    <TextField label="Name" value={enquiry.name} fullWidth disabled />
    <TextField label="Company" value={enquiry.company} fullWidth disabled />
    <TextField label="Email" value={enquiry.email} fullWidth disabled />
    <TextField label="Phone" value={enquiry.phone} fullWidth disabled />
    <TextField label="Pickup ID" value={enquiry.pickupId || ''} fullWidth disabled />
    <TextField label="Message" value={enquiry.message} fullWidth multiline rows={4} disabled />
    <TextField label="Role" value={enquiry.role} fullWidth disabled />
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select value={status} onChange={(e) => onStatusChange(e.target.value)} label="Status">
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
    </FormControl>

    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button variant="outlined" onClick={onCancel} sx={{ color: 'text.primary', borderColor: 'grey.400' }}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onSubmit} sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}>
        Submit
      </Button>
    </Stack>
  </Stack>
);

export default EditEnquiryPanel;
