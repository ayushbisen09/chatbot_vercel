import dayjs from 'dayjs';
import { useState } from 'react';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Card, Button, Divider, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page_header';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [value, setValue] = useState(dayjs(new Date()));
  return (
    <>
      {/* <BlankView title="Notification Preferences" /> */}
      <DashboardContent maxWidth="xl">
        <PageHeader
          title="Configure SLAs"
          Subheading="Setup and manage service level agreement (SLA) to set expected response time for all customer chats."
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          {' '}
          {/* Add margin-top and padding for spacing */}
          <Card sx={{ p: 3 }}>
            {' '}
            {/* Add padding to the Card */}
            <CardHeader title="Configure SLAs" sx={{ px: 0, pt: 0, pb: 3 }} />
            <Divider sx={{ mx: -3 }} /> {/* Extend Divider to full width */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '60%' }}>
                <TimePicker
                  ampm={false}
                  label="Response Time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: 'You can set SLA setting to fix the response time.',
                    },
                  }}
                />
                <TimePicker
                  ampm={false}
                  label="Response Time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="inherit">
                  Save
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}
