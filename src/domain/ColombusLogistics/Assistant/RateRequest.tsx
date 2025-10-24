import React, { useState, useMemo, useCallback } from 'react';
import {
  Card, CardContent, CardHeader, Typography, Box,
  Button, Stack, LinearProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faTruck,
  faCheckCircle, faTimesCircle, faClock, faMapMarkerAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useListOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } from '#api/colombusLogisticsApi';
import type { TLogisticsRegistrationForm } from '#domain/models/TLogisticsRegistrationForm';
import { useToggle } from '@react-shanties/core';
import type { GridColDef } from '@mui/x-data-grid';
import OrderSidePanel from '#components/OrderSidePanel/OrderSidePanel';
import DataGridTable from '#components/DataGrid/DataGrid';

const RateRequest = () => {
  const [isEditOrderModalOpen, , editOrderModalOpen] = useToggle(false);
  const [
    currentEditOrder,
    setCurrentEditOrder,
  ] = useState<TLogisticsRegistrationForm | undefined>(undefined);

  const [orderUpsert] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const { data, isLoading } = useListOrdersQuery();

  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const handleNewRequest = useCallback(() => {
    setCurrentEditOrder(undefined);
    editOrderModalOpen.setOn();
  }, [editOrderModalOpen]);

  const storedUser = localStorage.getItem('user');
  let userRole = 'CUSTOMER';
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userRole = user?.role;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const mappedRequests = useMemo(
    () => orders.map((o: TLogisticsRegistrationForm) => {
      const pickup = o?.pickups?.[0] ?? {};
      const delivery = o?.deliveries?.[0] ?? {};
      const vehicle = o?.vehicles?.[0] ?? {};

      return {
        id: o?.id ?? '—',
        date: pickup?.pickupDate ?? null,
        origin: pickup?.companyName ?? '—',
        destination: delivery?.companyName ?? '—',
        vehicle: vehicle?.vehicleType ?? '—',
        vehicleModel: vehicle?.model ?? '—',
        rate: o?.rate ?? 0,
        priority: vehicle?.ftlType ?? 'Normal',
        notes: o?.notes ?? '',
        status: (o?.status ?? 'PENDING').toUpperCase(),
        fullData: o,
      };
    }),
    [orders],
  );

  const getStatusConfig = (status: string) => {
    const configs: any = {
      APPROVED: {
        icon: <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 14 }} />,
        bgColor: '#e8f5e9',
        textColor: '#2e7d32',
      },
      PENDING: {
        icon: <FontAwesomeIcon icon={faClock} style={{ fontSize: 14 }} />,
        bgColor: '#fff3e0',
        textColor: '#f57c00',
      },
      REJECTED: {
        icon: <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: 14 }} />,
        bgColor: '#ffebee',
        textColor: '#d32f2f',
      },
    };
    return configs[status] || configs.PENDING;
  };

  const handleOrderSubmit = useCallback(
    async (formData: TLogisticsRegistrationForm) => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          throw new Error('User not found');
        }

        const parsedUser = JSON.parse(user);
        const role = parsedUser?.role?.toUpperCase() || 'CUSTOMER';

        const payload: any = {
          ...formData,
          packages: formData.packages?.map(({ hasDimensions, ...rest }) => rest) || [],
        };

        if (userRole === 'CUSTOMER') {
          payload.customerId = parsedUser.id;
          payload.createdById = parsedUser.id;
          payload.assistantId = undefined;
          payload.status = 'PENDING';
        } else if (role === 'ASSISTANT') {
          payload.assistantId = parsedUser.id;
          payload.createdById = parsedUser.id;
          payload.status = 'REVIEW';
        } else if (userRole === 'ADMIN' || userRole === 'BRANCH_ADMIN') {
          payload.status = 'APPROVED';
        }

        if (formData.id) {
          await updateOrder({ orderId: formData.id, data: payload }).unwrap();
          toast.success('Order updated successfully');
        } else {
          await orderUpsert(payload).unwrap();
          toast.success('Order created successfully');
        }

        setCurrentEditOrder(undefined);
        editOrderModalOpen.setOff();
      } catch (err: any) {
        toast.error(err.message || 'User Not Found, Create a User');
      }
    },
    [userRole, editOrderModalOpen, updateOrder, orderUpsert],
  );

  const getStatusChip = useCallback((status: string) => {
    const config = getStatusConfig(status);
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          fontWeight: 600,
          bgcolor: config.bgColor,
          color: config.textColor,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: `1px solid ${config.textColor}20`,
          textTransform: 'lowercase',
        }}
      >
        {config.icon}
        <Typography sx={{ ml: 0.5, fontSize: 12 }}>{status.toLowerCase()}</Typography>
      </Box>
    );
  }, []);

  const handleEditOrderModal = useCallback((item: any) => {
    if (item.fullData) {
      setCurrentEditOrder(item.fullData);
      editOrderModalOpen.setOn();
    }
  }, [editOrderModalOpen]);

  const columns: GridColDef[] = useMemo(() => {
    const priorityColorMap: Record<string, 'error' | 'warning' | 'success'> = {
      HIGH: 'error',
      MEDIUM: 'warning',
      NORMAL: 'success',
    };
    const baseColumns: GridColDef[] = [
      { field: 'date', headerName: 'Date', flex: 1 },
      {
        field: 'pickup',
        headerName: 'PickUp',
        flex: 1,
        renderCell: (params) => (
          <Box height="100%" display="flex" alignItems="center" gap={1}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 14, color: '#10b981' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.row.origin}</Typography>
          </Box>
        ),
      },
      {
        field: 'delivery',
        headerName: 'Delivery',
        flex: 1,
        renderCell: (params) => (
          <Box height="100%" display="flex" alignItems="center" gap={1}>
            <FontAwesomeIcon icon={faTruck} style={{ fontSize: 14, color: '#6b7280' }} />
            <Typography variant="body2" color="text.secondary">{params.row.destination}</Typography>
          </Box>
        ),
      },
      { field: 'vehicle', headerName: 'Vehicle', flex: 1 },
      { field: 'vehicleModel', headerName: 'Vehicle Model', flex: 1 },
      {
        field: 'priority',
        headerName: 'Priority',
        flex: 1,
        renderCell: (params) => (
          <Box
            sx={{
              fontWeight: 500,
              textTransform: 'lowercase',
              color: priorityColorMap[params.value] || 'text.primary',
            }}
          >
            {params.value}
          </Box>
        ),
      },
      {
        field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => getStatusChip(params.value),
      },
    ];

    if (userRole !== 'CUSTOMER') {
      baseColumns.push({
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleEditOrderModal(params.row)}>
            <FontAwesomeIcon icon={faEdit} style={{ fontSize: 14 }} />
          </Box>
        ),
      });
    }

    return baseColumns;
  }, [getStatusChip, handleEditOrderModal, userRole]);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mb={3}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Assistant Team
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discuss the order details with manager and confirm the order
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={handleNewRequest}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          sx={{
            borderRadius: 3,
            px: 2,
            py: 1.5,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
              boxShadow: '0 8px 20px rgba(56, 142, 60, 0.3)',
            },
          }}
        >
          New Rate Request
        </Button>
      </Stack>

      {isLoading && <Box sx={{ mb: 2 }}><LinearProgress /></Box>}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <CardHeader
          title={<Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c', fontSize: '16px' }}>Rate Requests</Typography>}
          sx={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
        />
        <CardContent sx={{ p: 2 }}>
          <DataGridTable
            rows={mappedRequests}
            columns={columns}
            loading={isLoading}
            autoHeight
            hideFooter
          />

          {mappedRequests.length === 0 && !isLoading && (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>No requests found</Typography>
              <Typography variant="body2">No rate requests available</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <OrderSidePanel
        open={isEditOrderModalOpen}
        onClose={() => editOrderModalOpen.setOff()}
        defaultValues={currentEditOrder}
        onSubmit={handleOrderSubmit}
      />
    </Box>
  );
};

export default RateRequest;
