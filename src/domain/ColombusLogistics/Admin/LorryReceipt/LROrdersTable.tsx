import React, { useState, useEffect } from 'react';
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
  MenuItem as MUIMenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faFileUpload,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import type { LROrder } from './_generateLRPdf';
import { generateLRPdf, generateOgplPdf } from './_generateLRPdf';

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
    id: '1',
    requestId: 'REQ-101',
    originCompany: 'E Land Fashion India P Ltd',
    destination: 'Chennai Madhavaram Branch',
    location: 'Chennai (Pammal)',
    status: 'Docs Pending',
  },
  {
    id: '2',
    requestId: 'REQ-102',
    originCompany: 'XYZ Logistics',
    destination: 'Coimbatore',
    location: 'Coimbatore',
    status: 'LR Generated',
  },
];

const LROrdersTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOrder, setDrawerOrder] = useState<OrderType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrder, setMenuOrder] = useState<OrderType | null>(null);
  const [manifestFilter, setManifestFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState(1); // Step 1: Input form, Step 2: Document uploads

  const [ewayBill, setEwayBill] = useState<File | null>(null);
  const [packageList, setPackageList] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<File[] | null>(null);
  const [finalLR, setFinalLR] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);

  const [formData, setFormData] = useState<Partial<LROrder>>({
    eWayBillNumber: 'XXXXXXXXXXXX',
    saidToContain: 'GARMENTS',
    packages: 252,
    weight: 3400,
    cbm: 20,
    basicCharges: 50,
    pickupCharges: 0,
    deliveryCharges: 0,
    lrCharges: 0,
    handlingCharges: 0,
    taxAmount: 0,
    totalAmount: 50,
    customerInvNo: '021,022',
    goodsValue: '',
    remarks: '',
  });

  useEffect(() => {
    if (drawerOrder) {
      setFormData((prev) => ({
        ...prev,
        requestId: drawerOrder.requestId,
        originCompany: drawerOrder.originCompany,
        consigneeName: 'TRIWAY CFS', // Adjust based on actual data; using image example
        consigneeAddress: '0 Mobile:0000000000, Email:',
        pickupLocation: 'Tiruppur Branch',
        deliveryLocation: drawerOrder.destination,
      }));
    }
  }, [drawerOrder]);

  useEffect(() => {
    // Calculate totalAmount
    const {
      basicCharges = 0,
      pickupCharges = 0,
      deliveryCharges = 0,
      lrCharges = 0,
      handlingCharges = 0,
      taxAmount = 0,
    } = formData;
    const total = Number(basicCharges) + Number(pickupCharges)
    + Number(deliveryCharges) + Number(lrCharges) + Number(handlingCharges) + Number(taxAmount);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.basicCharges, formData.pickupCharges, formData.deliveryCharges,
    formData.lrCharges, formData.handlingCharges, formData.taxAmount, formData]);

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
    setStep(1);
    handleMenuClose();
  };

  const handleFile = (setter: (f: File | null) => void) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      setter(null);
      return;
    }
    setter(files[0]);
  };

  const handleInvoices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files;
    if (!fl) {
      return;
    }
    setInvoices(Array.from(fl));
  };

  const generateLRNumber = () => {
    const lr = `LR-${Date.now()}`;
    navigator.clipboard?.writeText(lr).catch(() => {});
    return lr;
  };

  const handleGenerateLR = async () => {
    if (!drawerOrder) {
      return;
    }
    setGenerating(true);
    try {
      const lrNo = generateLRNumber();
      const payload: LROrder = {
        requestId: drawerOrder.requestId,
        originCompany: drawerOrder.originCompany,
        consigneeName: formData.consigneeName || '',
        consigneeAddress: formData.consigneeAddress || '',
        pickupLocation: formData.pickupLocation || '',
        deliveryLocation: formData.deliveryLocation || '',
        eWayBillNumber: formData.eWayBillNumber || '',
        saidToContain: formData.saidToContain || '',
        packages: formData.packages || 0,
        weight: formData.weight || 0,
        cbm: formData.cbm || 0,
        basicCharges: formData.basicCharges || 0,
        pickupCharges: formData.pickupCharges || 0,
        deliveryCharges: formData.deliveryCharges || 0,
        lrCharges: formData.lrCharges || 0,
        handlingCharges: formData.handlingCharges || 0,
        taxAmount: formData.taxAmount || 0,
        totalAmount: formData.totalAmount || 0,
        customerInvNo: formData.customerInvNo || '',
        goodsValue: formData.goodsValue || '',
        remarks: formData.remarks || '',
        date: new Date().toLocaleDateString(),
        lrNumber: lrNo,
      };
      const pdfObj = generateLRPdf(payload);
      pdfObj.download(`LR_${drawerOrder.requestId}_${lrNo}.pdf`);
    } catch (err) {
      console.error('Generate LR failed', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleForwardToAdmin = async () => {
    if (!drawerOrder) {
      return;
    }
    const form = new FormData();
    form.append('requestId', drawerOrder.requestId);
    form.append('originCompany', drawerOrder.originCompany);
    form.append('destination', drawerOrder.destination);
    if (ewayBill) {
      form.append('ewayBill', ewayBill);
    }
    if (packageList) {
      form.append('packageList', packageList);
    }
    if (invoices && invoices.length) {
      invoices.forEach((f, i) => form.append(`invoice_${i}`, f));
    }
    if (finalLR) {
      form.append('finalLR', finalLR);
    }

    try {
      const res = await fetch('/api/lr/forward', { method: 'POST', body: form });
      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  const filteredRows = manifestFilter
    ? mockOrders.filter((o) => o.location === manifestFilter)
    : mockOrders;
  const handleGenerateOgpl = () => {
    // Pick from ALL orders, not just filtered
    const selectedOrders = mockOrders.filter((o) => selectedIds.includes(o.id));

    if (selectedOrders.length === 0) {
      alert('Please select at least one order to generate OGPL');
      return;
    }

    const rows = selectedOrders.map((o) => ({
      lrNo: `LR-${o.requestId}`,
      lrDate: new Date().toLocaleDateString(),
      weight: '146.000',
      articleName: 'MATERIAL',
      qty: '1',
      value: '438.00',
      consignor: o.originCompany,
      consignee: o.destination,
      destination: o.destination,
    }));

    const pdf = generateOgplPdf(rows, {
      ogplNo: `OGPL-${Date.now()}`,
      date: new Date().toLocaleDateString(),
    });

    pdf.download(`OGPL_${new Date().toISOString()}.pdf`);
  };

  const columns: GridColDef[] = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<OrderType>) => (
        <Checkbox
          checked={selectedIds.includes(params.row.id)}
          onChange={(e) => {
            const { id } = params.row;
            if (e.target.checked) {
              setSelectedIds((prev) => [...prev, id]);
            } else {
              setSelectedIds((prev) => prev.filter((x) => x !== id));
            }
          }}
        />
      ),
    },
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

        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Filter by Manifest Location</InputLabel>
            <Select
              value={manifestFilter}
              onChange={(e) => setManifestFilter(e.target.value as string)}
              label="Filter by Manifest Location"
            >
              <MUIMenuItem value="">All</MUIMenuItem>
              <MUIMenuItem value="Chennai (Pammal)">Chennai (Pammal)</MUIMenuItem>
              <MUIMenuItem value="Chennai (Manali)">Chennai (Manali)</MUIMenuItem>
              <MUIMenuItem value="Coimbatore">Coimbatore</MUIMenuItem>
              <MUIMenuItem value="Bangalore">Bangalore</MUIMenuItem>
              <MUIMenuItem value="Tirupur">Tirupur</MUIMenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="success"
            disabled={selectedIds.length === 0}
            onClick={handleGenerateOgpl}
          >
            Generate OGPL (
            {selectedIds.length}
            )
          </Button>
        </Stack>
      </Stack>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoHeight
        pageSizeOptions={[10, 25, 50]}
        getRowId={(r) => r.id}
      />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleManage(menuOrder!)} sx={{ width: '80px', fontSize: '17px' }}>Edit</MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { md: 560, xs: 420 },
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {drawerOrder ? (
          <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h6" mb={2} fontWeight={600}>
              Manage Documents —
              {' '}
              {drawerOrder.requestId}
            </Typography>

            {step === 1 ? (
              <Stack spacing={2} flexGrow={1} overflow="auto" pr={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 1: Enter LR Details
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} flexGrow={1} overflow="auto" pr={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Step 2: Upload Documents
                </Typography>
                {/* E-Way Bill */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📑 E-Way Bill
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<FontAwesomeIcon icon={faFileUpload} />}
                  >
                    Upload E-Way Bill
                    <input type="file" accept=".pdf,image/*" hidden onChange={handleFile(setEwayBill)} />
                  </Button>
                  {ewayBill && (
                    <List dense>
                      <ListItem
                        secondaryAction={(
                          <IconButton edge="end" onClick={() => setEwayBill(null)}>
                            ✕
                          </IconButton>
                        )}
                      >
                        <ListItemText primary={ewayBill.name} secondary={`${(ewayBill.size / 1024).toFixed(1)} KB`} />
                      </ListItem>
                    </List>
                  )}
                </Box>

                <Divider />

                {/* Package List */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📦 Package List
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<FontAwesomeIcon icon={faFileUpload} />}
                  >
                    Upload Package List
                    <input type="file" accept=".pdf,.xlsx,.csv" hidden onChange={handleFile(setPackageList)} />
                  </Button>
                  {packageList && (
                    <List dense>
                      <ListItem
                        secondaryAction={(
                          <IconButton edge="end" onClick={() => setPackageList(null)}>
                            ✕
                          </IconButton>
                        )}
                      >
                        <ListItemText primary={packageList.name} />
                      </ListItem>
                    </List>
                  )}
                </Box>

                <Divider />

                {/* Invoices */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    🧾 Invoices
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<FontAwesomeIcon icon={faFileUpload} />}
                  >
                    Upload Invoices (multiple)
                    <input type="file" accept=".pdf,image/*" multiple hidden onChange={handleInvoices} />
                  </Button>
                  {invoices && invoices.length > 0 && (
                    <List dense>
                      {invoices.map((f) => (
                        <ListItem
                          key={f.name}
                          secondaryAction={(
                            <IconButton
                              edge="end"
                              onClick={() => setInvoices((prev) => prev?.filter(
                                (x) => x.name !== f.name,
                              ) || null)}
                            >
                              ✕
                            </IconButton>
                          )}
                        >
                          <ListItemText primary={f.name} secondary={`${(f.size / 1024).toFixed(1)} KB`} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    📝 Final LR Copy
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<FontAwesomeIcon icon={faFileUpload} />}
                  >
                    Upload Final LR Copy (signed)
                    <input type="file" accept=".pdf,image/*" hidden onChange={handleFile(setFinalLR)} />
                  </Button>
                  {finalLR && (
                    <List dense>
                      <ListItem
                        secondaryAction={(
                          <IconButton edge="end" onClick={() => setFinalLR(null)}>
                            ✕
                          </IconButton>
                        )}
                      >
                        <ListItemText primary={finalLR.name} />
                      </ListItem>
                    </List>
                  )}
                </Box>
              </Stack>
            )}

            {/* Footer Actions */}
            <Box mt={2} pt={2} borderTop="1px solid #eee">
              <Stack direction="row" spacing={2} mb={2}>
                {step === 1 ? (
                  <Button variant="contained" color="primary" fullWidth onClick={() => setStep(2)}>
                    Next: Upload Documents
                  </Button>
                ) : (
                  <>
                    <Button variant="outlined" color="secondary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleGenerateLR}
                      disabled={generating}
                    >
                      {generating ? 'Generating...' : 'Generate LR PDF (4 copies)'}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      startIcon={<FontAwesomeIcon icon={faLink} />}
                      onClick={() => window.open('https://ewaybillgst.gov.in', '_blank')}
                    >
                      E-Way Portal
                    </Button>
                  </>
                )}
              </Stack>

              {step === 2 && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success" fullWidth onClick={handleForwardToAdmin}>
                    Forward to Admin
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
        ) : (
          <LinearProgress />
        )}
      </Drawer>
    </Box>
  );
};

export default LROrdersTable;
