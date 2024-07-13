import 'react-modal-video/css/modal-video.min.css';

import ModalVideo from 'react-modal-video';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Tab,
  Link,
  List,
  Tabs,
  Table,
  Button,
  Tooltip,
  ListItem,
  TableBody,
  CardMedia,
  IconButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Scrollbar } from 'src/components/scrollbar';
import PageHeader from 'src/components/page-header/page_header';
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

import { OrderTableRow } from './order-table-row';
import { OrderTableToolbar } from './order-table-toolbar';
import { OrderTableFiltersResult } from './order-table-filters-result';

// ----------------------------------------------------------------------

const metadata = { title: `Page one | Dashboard - ${CONFIG.site.name}` };
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'orderNumber', label: 'Whatapp Number', width: 288 },
  { id: 'name', label: 'Webhook URL (For Receiving Messages) ', width: 592 },
  { id: 'createdAt', label: 'Date', width: 137 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'totalAmount', label: 'Action', width: 140, align: 'right' },
  { id: '', width: 88 },
];

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const [isOpen, setOpen] = useState(false);
  const videoId = 'CoIfgN0tfhE'; // Replace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Pabbly Broadcast Card.png`;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_orders);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
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

      toast.success('WhatsApp Number Removed Successfully!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

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
  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Dashboard"
        Subheading="Connecting Brands and Customers through WhatsApp Engagement and Marketing."
      />

      {/* Cards Section */}

      <Box
        sx={{
          mt: '40px',
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {/* WhatsApp Number Added */}
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            py: 3,
            pl: 3,
            pr: 2.5,
            ...sx,
          }}
          {...other}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ typography: 'h3' }}>45</Box>
            <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
              WhatsApp Number Added
            </Typography>
          </Box>

          <SvgColor
            src={`${CONFIG.site.basePath}/assets/icons/courses//whatsapp-icon.svg`}
            sx={{
              top: 24,
              right: 20,
              width: 36,
              height: 36,
              position: 'absolute',
              background: `#28A645`,
            }}
          />

          <Box
            icon={`${CONFIG.site.basePath}/assets/icons/courses/whatsapp-icon.svg`}
            sx={{
              top: -44,
              width: 160,
              zIndex: -1,
              height: 160,
              right: -104,
              opacity: 0.12,
              borderRadius: 3,
              position: 'absolute',
              transform: 'rotate(40deg)',
              background: 'linear-gradient(120deg, #22C55E 0%, #FFFFFF 100%)',
            }}
          />
        </Card>
        {/* WhatsApp Message Quota (Outgoing) */}
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            py: 3,
            pl: 3,
            pr: 2.5,
            ...sx,
          }}
          {...other}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ typography: 'h3' }}>45</Box>
            <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
              WhatsApp Message Quota (Outgoing)
            </Typography>
          </Box>

          <SvgColor
            src={`${CONFIG.site.basePath}/assets/icons/courses/2card.png`}
            sx={{
              top: 24,
              right: 20,
              width: 36,
              height: 36,
              position: 'absolute',
              background: `#FFA92E`,
            }}
          />

          <Box
            icon={`${CONFIG.site.basePath}/assets/icons/courses/2card.png`}
            sx={{
              top: -44,
              width: 160,
              zIndex: -1,
              height: 160,
              right: -104,
              opacity: 0.12,
              borderRadius: 3,
              position: 'absolute',
              transform: 'rotate(40deg)',
              background: `linear-gradient(120deg, ${theme.vars.palette[color].main} 0%, ${varAlpha(theme.vars.palette[color].mainChannel, 0)} 100%)`,
            }}
          />
        </Card>
        {/* Messaage Quota Used */}
        <Card
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
            py: 3,
            pl: 3,
            pr: 2.5,
            ...sx,
          }}
          {...other}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ typography: 'h3' }}>45</Box>
            <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
              Message Quota Used
            </Typography>
          </Box>

          <SvgColor
            src={`${CONFIG.site.basePath}/assets/icons/courses/3card.svg`}
            sx={{
              top: 24,
              right: 20,
              width: 36,
              height: 36,
              position: 'absolute',
              background: `#7D6ADB`,
            }}
          />

          <Box
            icon={`${CONFIG.site.basePath}/assets/icons/courses/3card.svg`}
            sx={{
              top: -44,
              width: 160,
              zIndex: -1,
              height: 160,
              right: -104,
              opacity: 0.12,
              borderRadius: 3,
              position: 'absolute',
              transform: 'rotate(40deg)',
              background: 'linear-gradient(120deg, #8E33FF 0%, #FFFFFF 100%)',
            }}
          />
        </Card>
      </Box>

      {/* Cards Section */}

      {/* Big Card Section */}

      <Grid xs={12} md={8}>
        <Box
          sx={{
            boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

            backgroundColor: 'common.white',
            mt: '24px',
            pt: 5,
            pb: 5,
            pr: 3,
            gap: 5,
            borderRadius: 2,
            display: 'flex',
            height: { md: 1 },
            position: 'relative',
            pl: { xs: 3, md: 5 },
            alignItems: { xs: 'left', md: 'left' },
            justifyContent: { xs: 'left', md: 'left' },
            color: 'common.white',
            textAlign: { xs: 'left', md: 'left' },
            flexDirection: { xs: 'column', md: 'row' },

            ...sx,
          }}
          {...other}
        >
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'flex-start' },
            }}
          >
            <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
              Points To Remember
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'grey.600',

                ...(true && { mb: 3 }), // Example conditional margin bottom
              }}
            >
              <List sx={{ color: 'grey.600' }}>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Choose a WhatsApp Business API provider that suits your needs and requirements."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Familiarize yourself with the requirements for using the WhatsApp Business API."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Apply for access to the WhatsApp Business API through your chosen provider."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Review and agree to the terms and conditions set by WhatsApp and your chosen provider."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Verify your business and phone number with WhatsApp."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Work with your chosen provider to complete the setup process. "
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary="Iterate on your messaging strategies to improve engagement and achieve your business goals."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{
                      component: 'div',
                      sx: {
                        fontSize: '14px',
                        fontWeight: '500',
                        '&::before': { content: '"•"', paddingRight: '0.5rem' },
                      },
                    }}
                    primary={
                      <>
                        Stay informed about updates and changes to policies that may affect your use
                        of the API.{' '}
                        <Link href="#" underline="always">
                          Learn more
                        </Link>
                      </>
                    }
                  />
                </ListItem>
                {/* Add more list items as needed */}
              </List>
            </Typography>
            <Button
              onClick={dialog.onTrue}
              sx={{ mt: isMobile ? 2 : 0 }}
              size="large"
              variant="outlined"
              color="primary"
            >
              Add WhatsApp Number
            </Button>
          </Box>

          {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
          <Box
            sx={{
              marginRight: '16px', // Default margin-right for all screen sizes
              ...(isMobile && {
                marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
              }),
            }}
          >
            <Card>
              <CardMedia
                component="img"
                src={coverSrc}
                title="Cover Image"
                style={{
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'contain',
                }}
                onClick={() => setOpen(true)}
              />
            </Card>
            <ModalVideo
              channel="youtube"
              autoplay="true"
              isOpen={isOpen}
              videoId={videoId}
              onClose={() => setOpen(false)}
            />
          </Box>
        </Box>
      </Grid>

      {/* Big Card Section */}

      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

          mt: '24px',
        }}
      >
        <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme1) =>
              `inset 0 -2px 0 0 ${varAlpha(theme1.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'inactive' && 'error') ||
                    'default'
                  }
                >
                  {['active', 'inactive'].includes(tab.value)
                    ? tableData.filter((user) => user.status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <OrderTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
        />

        {canReset && (
          <OrderTableFiltersResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                    <OrderTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
