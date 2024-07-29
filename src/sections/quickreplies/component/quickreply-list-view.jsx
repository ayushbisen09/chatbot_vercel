import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

const TABLE_HEAD = [
  { id: 'shortcut', label: 'Shortcut', width: 558 },
  { id: 'text', label: 'Text', width: 542 },
  { id: 'type', label: 'Type', width: 400 },
  { id: 'actions', label: '', width: 50 },
];

// Updated sample data to match the image
const SAMPLE_DATA = [
  {
    id: 1,
    shortcut: '/Hello',
    createdBy: 'Ankit Mandli',
    text: 'Hello User this is canned message.',
    type: 'Image',
  },
  {
    id: 2,
    shortcut: '/Hi',
    createdBy: 'Ankit Mandli',
    text: 'Hi, thanks for contacting us.',
    type: 'Text',
  },
  {
    id: 3,
    shortcut: '/Hi',
    createdBy: 'Ankit Mandli',
    text: 'Hi, thanks for contacting us.',
    type: 'Image',
  },
  {
    id: 4,
    shortcut: '/Hi',
    createdBy: 'Ankit Mandli',
    text: 'Hi, thanks for contacting us.',
    type: 'Image',
  },
  {
    id: 5,
    shortcut: '/Hi',
    createdBy: 'Ankit Mandli',
    text: 'Hi, thanks for contacting us.',
    type: 'Image',
  },
  {
    id: 6,
    shortcut: '/Hi',
    createdBy: 'Ankit Mandli',
    text: 'Hi, thanks for contacting us.',
    type: 'Image',
  },
];

export function QuickReplyListView() {
  const [filters, setFilters] = useState({
    name: '',
  });

  const table = useTable();

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
    item.shortcut.toLowerCase().includes(filters.name.toLowerCase())
  );

  return (
    <Card>
      <CardHeader
        title="Quick Replies"
        sx={{
          mb: 2,
        }}
      />
      <Divider />

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Search by shortcut..."
          sx={{ width: '91%' }}
          InputProps={{
            startAdornment: (
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', mr: 1 }} />
            ),
          }}
        />
        <Button
          variant="outlined"
          sx={{
            border: 'none',
            color: 'inherit',
          }}
          startIcon={<Iconify icon="solar:filter-bold" />}
        >
          Filters
        </Button>
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
                        <Typography variant="body2">{row.shortcut}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Created by: {row.createdBy}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.text}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <IconButton>
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
    </Card>
  );
}
