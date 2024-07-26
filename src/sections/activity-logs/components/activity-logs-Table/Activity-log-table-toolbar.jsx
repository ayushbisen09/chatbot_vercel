import { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

export function ActivityLogTableToolbar({ filters, onResetPage, dateError }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const confirm = useBoolean();

  const popover = usePopover();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const activitylog_status = ['Created', 'Updated']; // Add your actual column names here
  const columns = ['Created', 'Updated']; // Add your actual column names here

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <DatePicker
          label="Start date"
          value={filters.state.startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 200 } }}
        />
        <DatePicker
          label="End date"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'End date must be later than start date' : null,
            },
          }}
          sx={{
            maxWidth: { md: 200 },
            [`& .${formHelperTextClasses.root}`]: {
              position: { md: 'absolute' },
              bottom: { md: -40 },
            },
          }}
        />
        <Stack direction="row" alignItems="center" flexGrow={1} sx={{ width: 1 }}>
          <TextField
            sx={{ mr: '5px' }}
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search by actor or event source..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="large"
            variant=""
            startIcon={<Iconify icon="mdi:filter" />}
            onClick={handleFilterClick}
          >
            Filters
          </Button>
        </Stack>
      </Stack>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      />
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            p: 2,
            width: {
              xs: '300px', // 100% width on extra-small screens
              sm: '100%', // 100% width on small screens
              md: 800, // 800px width on medium screens and above
            },
            display: 'flex',
            flexDirection: {
              xs: 'column', // column direction on extra-small screens
              sm: 'column', // column direction on small screens
              md: 'row', // row direction on medium screens and above
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            {/* <InputLabel>Whatsapp number Status</InputLabel> */}
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Activity Log Status"
            >
              {activitylog_status.map((activitylog_statuss) => (
                <MenuItem key={activitylog_statuss} value={activitylog_statuss}>
                  {activitylog_statuss}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Operator"
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Status"
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}
