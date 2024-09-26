import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
  TableCell,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  TableContainer,
  Chip,
  Tooltip,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

const TABLE_HEAD = [
  { id: 'webhoon_name', label: 'Webhook Name & Event', width: 358 },
  { id: 'text', label: 'Webhook URL', width: 742 },
  { id: 'type', label: '', width: 200 },
  { id: 'actions', label: '', width: 50 },
];

const SAMPLE_DATA = [
  {
    id: 1,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url:
      'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfmdffdfd',
    type: 'Image',
    status: 'Active',
  },
  {
    id: 2,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 3,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Active',
  },
  {
    id: 4,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 5,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 6,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
];

const truncateUrl = (url, maxLength = 78) =>
  url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;

export function ApiWebhookTable() {
  const [filters, setFilters] = useState({
    name: '',
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const confirm = useBoolean();
  const table = useTable();
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
    },
    [table]
  );

  const dataFiltered = SAMPLE_DATA.filter((item) =>
    item.webhook_name.toLowerCase().includes(filters.name.toLowerCase())
  );

  const handleEdit = () => {
    console.log('Edit', selectedRow);
    popover.onClose();
  };

  const handleDelete = () => {
    console.log('Delete', selectedRow);
    popover.onClose();
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title="Webhooks"
        sx={{
          mb: 2,
        }}
      />
      <Divider />

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Search by Webhook Name..."
          sx={{ width: '100%' }}
          InputProps={{
            startAdornment: (
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', mr: 1 }} />
            ),
          }}
        />
      </Box>

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
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
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={table.selected.includes(row.id)}
                        onChange={() => table.onSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Chip
                          variant="soft"
                          label={row.status}
                          color={row.status === 'Active' ? 'success' : 'error'}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2">{row.webhook_name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {row.event}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {' '}
                      <Tooltip title={row.webhook_url} arrow placement="top">
                        {' '}
                        {truncateUrl(row.webhook_url)}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary">
                        Test Webhook
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => {
                          setSelectedRow(row);
                          popover.onOpen(event);
                        }}
                      >
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              <TableEmptyRows
                height={table.dense ? 52 : 72}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={!dataFiltered.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem>
            <Iconify icon="teenyicons:toggle-solid" />
            Mark as Active
          </MenuItem>
       
    
           <Divider sx={{borderStyle:'dashed'}}/>
      
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </Card>
  );
}
