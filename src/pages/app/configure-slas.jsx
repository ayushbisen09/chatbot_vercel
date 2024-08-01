import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Card,
  Alert,
  Button,
  Divider,
  Snackbar,
  TextField,
  CardHeader,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = useState(dayjs(new Date()));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Configure SLAs"
        Subheading="Setup and manage service level agreement (SLA) to set expected response time for all customer chats."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card sx={{ p: 3 }}>
          <CardHeader title="Configure SLAs" sx={{ px: 0, pt: 0, pb: 3 }} />
          <Divider sx={{ mx: -3 }} />
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '60%' }}>
              <TextField
                label="Response Time"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon="tabler:clock" style={{ width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
                helperText="You can set SLA setting to fix the response time."
                InputLabelProps={{ shrink: true }} // Ensure the label stays visible
              />
              <TextField
                label="Response Time"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon="tabler:clock" style={{ width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="inherit" onClick={handleAdd}>
                Save
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Configure SLAs Added Successfully!
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}
