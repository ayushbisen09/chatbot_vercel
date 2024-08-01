import { toast } from 'sonner';

import TextField from '@mui/material/TextField';
import { Box, Card, Button, Divider, Tooltip, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/api-&-webhook/components/bigcard/big-card';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText('●●●●●●●●●●●●●●●●●●')
      .then(() => {
        // Show a toast or some feedback that the text was copied
        showToast('API Token copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const showToast = () => {
    toast.success('Your API Token Copied Successfully!');
  };

  return (
    <>
      {/* <BlankView title="Notification Preferences" /> */}
      <DashboardContent maxWidth="xl">
        <PageHeader
          title="API & Webhooks"
          Subheading="API & Webhooks is the secret key used for authentication while making a request to our APIs."
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          {' '}
          {/* Add margin-top and padding for spacing */}
          <Card sx={{ p: 3 }}>
            {' '}
            {/* Add padding to the Card */}
            <CardHeader title="API" sx={{ px: 0, pt: 0, pb: 3 }} />
            <Divider sx={{ mx: -3 }} /> {/* Extend Divider to full width */}
            <Box sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                // fullWidth
                label="Here's your Pabbly Broadcasting API Token"
                value="●●●●●●●●●●●●●●●●●●"
                helperText={
                  <span>
                    Enter the above API token for the Pabbly Broadcasting Manager app. When a new
                    API token will be generated, the previous API token will no longer be valid.
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title="Copy API Token"
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
                      }}
                    >
                      <Box component="span" sx={{ cursor: 'pointer' }}>
                        <Iconify
                          icon="solar:copy-bold"
                          onClick={copyToClipboard}
                          style={{ width: 20, height: 20, color: '#637381' }}
                        />
                      </Box>
                    </Tooltip>
                  ),
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary">
                  Generate API Token
                </Button>
              </Box>
            </Box>
          </Card>
          {/* card section started */}
          <BigCard />
        </Box>
      </DashboardContent>
    </>
  );
}
