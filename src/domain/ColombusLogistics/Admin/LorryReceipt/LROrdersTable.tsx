import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV, faFileUpload, faLink, faCopy,
} from '@fortawesome/free-solid-svg-icons';

type OrderType = {
  id: string;
  requestId: string;
  originCompany: string;
  destination: string;
  location: string;
  status: string;
};

const mockOrders: OrderType[] = [
  {
    id: '1', requestId: 'REQ-101', originCompany: 'ABC Pvt Ltd', destination: 'Chennai', location: 'Chennai Airport', status: 'Docs Pending',
  },
  {
    id: '2', requestId: 'REQ-102', originCompany: 'XYZ Logistics', destination: 'Bangalore', location: 'Bangalore', status: 'LR Generated',
  },
];

const LROrdersTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOrder, setDrawerOrder] = useState<OrderType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrder, setMenuOrder] = useState<OrderType | null>(null);
  const [manifestFilter, setManifestFilter] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, order: OrderType) => {
    setAnchorEl(event.currentTarget);
    setMenuOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrder(null);
  };

  const handleManage = (order: OrderType) => {
    setDrawerOrder(order);
    setDrawerOpen(true);
    handleMenuClose();
  };

  const columns: GridColDef[] = [
    { field: 'requestId', headerName: 'Request ID', flex: 1 },
    { field: 'originCompany', headerName: 'Company', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
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
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          LR Team Dashboard
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Manifest Location</InputLabel>
          <Select
            value={manifestFilter}
            onChange={(e) => setManifestFilter(e.target.value)}
            label="Filter by Manifest Location"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Chennai (Pammal)">Chennai (Pammal)</MenuItem>
            <MenuItem value="Chennai (Manali)">Chennai (Manali)</MenuItem>
            <MenuItem value="Coimbatore">Coimbatore</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
            <MenuItem value="Tirupur">Tirupur</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <DataGrid
        rows={
          manifestFilter
            ? mockOrders.filter((o) => o.location === manifestFilter)
            : mockOrders
        }
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleManage(menuOrder!)}>Manage Documents & LR</MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { md: 500, xs: 400 }, p: 3 } }}
      >
        {drawerOrder ? (
          <Box>
            <Typography variant="h6" mb={2}>
              Create Lorry Receipt
            </Typography>

            <Stack spacing={2}>
              <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                Upload E-Way Bill
                <input hidden type="file" />
              </Button>
              <Button
                variant="text"
                color="primary"
                startIcon={<FontAwesomeIcon icon={faLink} />}
                onClick={() => window.open('https://ewaybillgst.gov.in', '_blank')}
              >
                Open E-Way Bill Portal
              </Button>

              {/* Package Upload */}
              <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                Upload Package List
                <input hidden type="file" />
              </Button>

              {/* Invoice Upload */}
              <Button variant="outlined" component="label" startIcon={<FontAwesomeIcon icon={faFileUpload} />}>
                Upload Invoice
                <input hidden type="file" multiple />
              </Button>

              {/* LR Generation */}
              <Stack spacing={1} mt={3}>
                <Typography fontWeight={600}>Lorry Receipt</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigator.clipboard.writeText(`LR-${Date.now()}`)}
                  startIcon={<FontAwesomeIcon icon={faCopy} />}
                >
                  Generate & Copy LR Number
                </Button>
                <Button variant="outlined" component="label">
                  Upload Final LR Copy
                  <input hidden type="file" />
                </Button>
              </Stack>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 4 }}
                fullWidth
              >
                Forward to Admin
              </Button>
            </Stack>
          </Box>
        ) : (
          <LinearProgress />
        )}
      </Drawer>
    </Box>
  );
};

export default LROrdersTable;
