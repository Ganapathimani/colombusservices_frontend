import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

// Fake data for demo
const initialOrders = [
  {
    id: 1,
    orderNumber: 'ORD-1001',
    customer: 'Bagavathi Shipping',
    status: 'Pending',
    isMarketVehicle: false,
    voucher: null,
  },
  {
    id: 2,
    orderNumber: 'ORD-1002',
    customer: 'Techno Shipping',
    status: 'Dispatched',
    isMarketVehicle: false,
    voucher: null,
  },
];

const MarketVehicleTableGrid = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [voucherDrawerOpen, setVoucherDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>({
    voucherNo: '',
    date: '',
    transportName: '',
    vehicleNumber: '',
    vehicleType: '',
    lrNumbers: '',
    from: '',
    to: '',
    billingName: '',
    vehicleRent: '',
    cashAdvance: '',
    dieselAdvance: '',
    others: '',
    receivedBalance: '',
    bankPayment: '',
  });

  // Handle Form Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Save voucher details into order
  const handleSaveVoucher = () => {
    const updatedOrders = orders.map((order) => (order.id === selectedOrder.id
      ? {
        ...order,
        isMarketVehicle: true,
        voucher: { ...formValues, lrNumbers: formValues.lrNumbers.split(',').map((lr: string) => lr.trim()) },
      }
      : order));
    setOrders(updatedOrders);
    setVoucherDrawerOpen(false);
  };

  // Download PDF using pdfmake
  const handleDownloadVoucher = (order: any) => {
    if (!order.voucher) {
      return;
    }

    const v = order.voucher;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'COLOMBUS FREIGHT LOGISTICS PVT LTD',
                  alignment: 'center',
                  bold: true,
                  fontSize: 14,
                  fillColor: '#90EE90',
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        {
          text: '( Xpress Parcel Service )',
          alignment: 'center',
          fontSize: 12,
          margin: [0, 5, 0, 5],
        },
        {
          text: 'VEHICLE RENT - VOUCHER',
          alignment: 'center',
          bold: true,
          fontSize: 12,
          margin: [0, 5, 0, 10],
        },
        {
          columns: [
            {
              width: 'auto', text: 'S.NO', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.voucherNo, fontSize: 10, margin: [5, 0, 0, 0],
            },
            {
              width: 'auto', text: 'DATE', bold: true, fontSize: 10, margin: [20, 0, 0, 0],
            },
            {
              width: '*', text: v.date, fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'TRANSPORT NAME / CONTACT NO.', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.transportName, fontSize: 10, margin: [5, 0, 0, 0],
            },
            {
              width: 'auto', text: 'VEHICLE TYPE', bold: true, fontSize: 10, margin: [20, 0, 0, 0],
            },
            {
              width: '*', text: v.vehicleType, fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'VEHICLE NUMBER', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.vehicleNumber, fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'LR NUMBER', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.lrNumbers.join(', '), fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'FROM', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.from, fontSize: 10, margin: [5, 0, 0, 0],
            },
            {
              width: 'auto', text: 'TO', bold: true, fontSize: 10, margin: [20, 0, 0, 0],
            },
            {
              width: '*', text: v.to, fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'BILLING NAME', bold: true, fontSize: 10,
            },
            {
              width: '*', text: v.billingName, fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 10],
        },
        {
          table: {
            widths: ['*', 150],
            body: [
              [
                { text: 'VEHICLE RENT', bold: true, fontSize: 10 },
                {
                  text: `${v.vehicleRent ? v.vehicleRent : ''} /-`, alignment: 'right', fontSize: 10, fillColor: '#B0F2BC',
                },
              ],
              [
                { text: 'LESS : CASH ADVANCE AT : -', bold: true, fontSize: 10 },
                { text: v.cashAdvance || '-', alignment: 'right', fontSize: 10 },
              ],
              [
                { text: 'LESS : DIESEL ADVANCE AT : -', bold: true, fontSize: 10 },
                { text: v.dieselAdvance || '-', alignment: 'right', fontSize: 10 },
              ],
              [
                { text: 'LESS : OTHERS : -', bold: true, fontSize: 10 },
                { text: v.others || '-', alignment: 'right', fontSize: 10 },
              ],
              [
                { text: 'LESS : RECEIVED BALANCE : -', bold: true, fontSize: 10 },
                { text: `${v.receivedBalance ? v.receivedBalance : ''} /-`, alignment: 'right', fontSize: 10 },
              ],
              [
                { text: 'BANK PAYMENT : -', bold: true, fontSize: 10 },
                { text: `${v.bankPayment ? v.bankPayment : ''} /-`, alignment: 'right', fontSize: 10 },
              ],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 5, 0, 10],
        },
        {
          text: 'BANK DETAILS',
          alignment: 'center',
          bold: true,
          fontSize: 11,
          margin: [0, 10, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'NAME / CONTACT NO.', bold: true, fontSize: 10,
            },
            {
              width: '*', text: 'K. Krishnaveni', fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'BANK / BRANCH', bold: true, fontSize: 10,
            },
            {
              width: '*', text: 'IOB', fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'ACCOUNT NUMBER', bold: true, fontSize: 10,
            },
            {
              width: '*', text: '271602000000201', fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          columns: [
            {
              width: 'auto', text: 'IFSC CODE', bold: true, fontSize: 10,
            },
            {
              width: '*', text: 'IOBA0002716', fontSize: 10, margin: [5, 0, 0, 0],
            },
          ],
          margin: [0, 5, 0, 5],
        },
        {
          text: 'PAYMENT DETAILS - HDFC / AXIS - REF NO.: ',
          fontSize: 10,
          margin: [0, 10, 0, 20],
        },
        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  canvas: [{
                    type: 'line', x1: 0, y1: 0, x2: 120, y2: 0, lineWidth: 1,
                  }],
                },
                {
                  text: 'PREPARED BY', alignment: 'center', fontSize: 8, bold: true, margin: [0, 5, 0, 0],
                },
              ],
            },
            {
              width: '*',
              stack: [
                {
                  canvas: [{
                    type: 'line', x1: 0, y1: 0, x2: 120, y2: 0, lineWidth: 1,
                  }],
                },
                {
                  text: 'APPROVED BY', alignment: 'center', fontSize: 8, bold: true, margin: [0, 5, 0, 0],
                },
              ],
            },
            {
              width: '*',
              stack: [
                {
                  canvas: [{
                    type: 'line', x1: 0, y1: 0, x2: 120, y2: 0, lineWidth: 1,
                  }],
                },
                {
                  text: 'PAID / RECEIVED BY', alignment: 'center', fontSize: 8, bold: true, margin: [0, 5, 0, 0],
                },
              ],
            },
            {
              width: '*',
              stack: [
                {
                  canvas: [{
                    type: 'line', x1: 0, y1: 0, x2: 120, y2: 0, lineWidth: 1,
                  }],
                },
                {
                  text: 'AUTHORISED BY', alignment: 'center', fontSize: 8, bold: true, margin: [0, 5, 0, 0],
                },
              ],
            },
          ],
        },
      ],
      defaultStyle: {
        lineHeight: 1.2,
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: 'Order No', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const order = params.row;
        return (
          <Box>
            {!order.isMarketVehicle ? (
              <MenuItem
                onClick={() => {
                  setSelectedOrder(order);
                  setVoucherDrawerOpen(true);
                }}
              >
                Create Market Voucher
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleDownloadVoucher(order)}>
                Download Voucher
              </MenuItem>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Market Vehicle Orders
      </Typography>

      <DataGrid
        rows={orders}
        columns={columns}
        autoHeight
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      {/* Drawer for Voucher Form */}
      <Drawer
        anchor="right"
        open={voucherDrawerOpen}
        onClose={() => setVoucherDrawerOpen(false)}
        PaperProps={{ sx: { width: { md: 600, xs: 400 } } }}
      >
        <Box p={3}>
          <Typography variant="h6" mb={2}>
            Create Market Vehicle Voucher
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Voucher No"
              name="voucherNo"
              value={formValues.voucherNo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Date"
              name="date"
              value={formValues.date}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Transport Name / Contact No"
              name="transportName"
              value={formValues.transportName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Vehicle Number"
              name="vehicleNumber"
              value={formValues.vehicleNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Vehicle Type"
              name="vehicleType"
              value={formValues.vehicleType}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="LR Numbers (comma separated)"
              name="lrNumbers"
              value={formValues.lrNumbers}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="From"
              name="from"
              value={formValues.from}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="To"
              name="to"
              value={formValues.to}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Billing Name"
              name="billingName"
              value={formValues.billingName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Vehicle Rent"
              name="vehicleRent"
              type="number"
              value={formValues.vehicleRent}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Cash Advance"
              name="cashAdvance"
              type="number"
              value={formValues.cashAdvance}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Diesel Advance"
              name="dieselAdvance"
              type="number"
              value={formValues.dieselAdvance}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Others"
              name="others"
              type="number"
              value={formValues.others}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Received Balance"
              name="receivedBalance"
              type="number"
              value={formValues.receivedBalance}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Bank Payment"
              name="bankPayment"
              type="number"
              value={formValues.bankPayment}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setVoucherDrawerOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveVoucher}>
              Save Voucher
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MarketVehicleTableGrid;
