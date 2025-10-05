import React, { useMemo } from 'react';
import type {
  GridColDef,
  GridRowsProp,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import {
  Stack, useMediaQuery, useTheme, Box,
} from '@mui/material';

type DataTableGridProps<T extends GridValidRowModel> = {
  rows: GridRowsProp<T>;
  columns: GridColDef<T>[];
  loading?: boolean;
  autoHeight?: boolean;
  hideFooter?: boolean;
  rowHoverEffect?: boolean;
};

const DataGridTable = <T extends GridValidRowModel>({
  rows,
  columns,
  loading = false,
  autoHeight = true,
  hideFooter = false,
  rowHoverEffect = true,
}: DataTableGridProps<T>) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const memoizedRows = useMemo(() => rows, [rows]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        overflowX: 'auto', // ✅ enables horizontal scroll if needed
      }}
    >
      <Box
        sx={{
          width: '100%',
          minWidth: isSmallScreen ? 600 : '100%', // ✅ ensures content fits on small screens
          '& .MuiDataGrid-root': {
            border: 'none',
          },
        }}
      >
        <DataGrid
          rows={memoizedRows}
          columns={memoizedColumns}
          loading={loading}
          autoHeight={autoHeight}
          hideFooter={hideFooter}
          disableRowSelectionOnClick
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            '& .MuiDataGrid-row': {
              borderBottom: 1,
              borderColor: 'divider',
              ...(rowHoverEffect && {
                '&:hover': {
                  bgcolor: '#E8F5E9', // light green hover
                  transition: 'background-color 0.2s ease-in-out',
                },
              }),
            },
            '& .MuiDataGrid-cell': {
              fontSize: isSmallScreen ? '0.8rem' : '0.875rem',
              color: 'text.primary',
              whiteSpace: 'nowrap', // prevent breaking text
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#C8E6C9', // green header
              borderBottom: 1,
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: isSmallScreen ? '0.85rem' : '0.9rem',
              color: '#000',
              fontWeight: 600,
            },
            '& .MuiDataGrid-overlay': {
              bgcolor: 'background.paper',
              opacity: 0.9,
            },
            '& .MuiDataGrid-virtualScroller': {
              minHeight: 100,
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default DataGridTable;
