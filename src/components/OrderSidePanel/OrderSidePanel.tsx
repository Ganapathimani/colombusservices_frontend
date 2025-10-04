import React from 'react';
import {
  Drawer, Box, IconButton, Typography, Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import LogisticsRegistrationWizard from '#domain/ColombusLogistics/RegistrationForm/LogisticsRegistrationForm';

type OrderSidePanelProps = {
  open: boolean;
  onClose: () => void;
  defaultValues?: TLogisticsRegistrationForm;
  title?: string;
  onSubmitSuccess?: (updatedData: TLogisticsRegistrationForm) => void;
};

const OrderSidePanel = ({
  open,
  onClose,
  defaultValues,
  title,
  onSubmitSuccess,
}: OrderSidePanelProps) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: { xs: '100%', sm: 650 },
        maxWidth: '100%',
        p: 0,
        borderRadius: '12px 0 0 12px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      },
    }}
  >
    {/* Header */}
    <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Typography variant="h6" fontWeight={600}>
        {title || (defaultValues ? 'Edit Order' : 'Create Order')}
      </Typography>
      <IconButton onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
    </Box>

    <Divider />

    <Box sx={{ p: 3, flexGrow: 1 }}>
      <LogisticsRegistrationWizard
        defaultValues={defaultValues}
        title={title || (defaultValues ? 'Edit Order' : 'Create Order')}
        onClose={onClose}
        onSubmitSuccess={onSubmitSuccess}
      />
    </Box>
  </Drawer>
);

export default OrderSidePanel;
