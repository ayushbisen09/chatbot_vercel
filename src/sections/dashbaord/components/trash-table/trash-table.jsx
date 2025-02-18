import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { _orders } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { TrashTableRow } from './trash-table-row';
import { TrashTableToolbar } from './trash-table-toolbar';
import { TrashTableFiltersResult } from './trash-table-filter';

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Date', width: 137, tooltip: 'The date when the entry was created' },
  {
    id: 'orderNumber',
    label: 'WhatsApp Number',
    width: 200,
    tooltip: 'The number associated with the WhatsApp account',
  },
  {
    id: 'name',
    label: 'Webhook URL (For Receiving Messages)',
    width: 400,
    tooltip: 'The URL for receiving incoming messages',
  },
  {
    id: 'totalAmount',
    label: 'Action',
    width: 140,
    align: 'right',
    tooltip: 'Actions you can perform on this entry',
  },
  { id: '', width: 88 },
];

export default function TrashTable({
  selectedFolder,
  sx,
  icon,
  title,
  total,
  color = 'warning',
  ...other
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();
  const confirmDelete = useBoolean();
  const [tableData, setTableData] = useState(_orders);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData, // This is your original data
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state, // Make sure this is passed to applyFilter
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            width: '1086px',
          }}
        >
          <CardHeader
            title={
              <Box>
                <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>Trash</Box>
                <Box sx={{ typography: 'body2', fontSize: '14px', color: 'text.secondary' }}>
                  Deleted WhatsApp number can be restored or permanently deleted from the trash
                  folder.
                </Box>
              </Box>
            }
            action={total && <Label color={color}>{total}</Label>}
            sx={{
              p: 3,
            }}
          />
          <Divider />

          <TrashTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
            numSelected={table.selected.length}
          />

          {canReset && (
            <TrashTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction

              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip
                  title="This will delete the selected WhatsApp number."
                  arrow
                  placement="bottom"
                >
                  <IconButton color="primary" onClick={confirmDelete.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar sx={{ minHeight: 444 }}>
              {notFound ? (
                <Box>
                  <Divider />

                  <Box sx={{ textAlign: 'center', borderRadius: 1.5, p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Not found
                    </Typography>
                    <Typography variant="body2">
                      No results found for <strong>{`"${filters.state.name}"`}</strong>.
                      <br />
                      Try checking for typos or using complete words.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    showCheckbox
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dataFiltered.length}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked) =>
                      table.onSelectAllRows(
                        checked,
                        dataFiltered.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row, index) => (
                        <TrashTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                          dashboardTableIndex={table.page * table.rowsPerPage + index}
                        />
                      ))}

                    <TableEmptyRows
                      height={table.dense ? 56 : 56 + 20}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                    />

                    <TableNoData notFound={notFound} />
                  </TableBody>
                </Table>
              )}
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}

            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Box>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="WhatsApp number once deleted will be moved to trash folder."
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  // Create a stabilized array for sorting
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  // Sort the data based on the comparator
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  // Extract the sorted data
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by name (using orderNumber as per your requirement)
  if (name) {
    inputData = inputData.filter((row) =>
      row.orderNumber.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status if it's not 'all'
  if (status !== 'all') {
    inputData = inputData.filter((row) => row.status === status);
  }

  // Filter by date range if there's no date error
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((row) => fIsBetween(row.createdAt, startDate, endDate));
  }

  return inputData;
}
