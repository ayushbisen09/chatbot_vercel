// import { Helmet } from 'react-helmet-async';

// import { Typography } from '@mui/material';

// import { CONFIG } from 'src/config-global';

// // import { BlankView } from 'src/sections/blank/view';

// // ----------------------------------------------------------------------

// const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

// export default function Page() {
//   return (
//     <>
//       <Helmet>
//         <title> {metadata.title}</title>
//       </Helmet>

//       {/* <BlankView title="Inbox" /> */}
//       <Typography>
//         Configure SLAs
//       </Typography>
//     </>
//   );
// }
// import { BlankView } from 'src/sections/blank/view';

import dayjs from 'dayjs';
import { useState } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box, Card, Button, Divider, CardHeader } from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [value, setValue] = useState(dayjs(new Date()));
  return (
    <>
      {/* <BlankView title="Notification Preferences" /> */}
      <DashboardContent maxWidth="xl">
        <Typography sx={{ mt: 0, mb: 2 }} variant="h4">
          Configure SLAs
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Setup and manage service level agreement (SLA) to set expected response time for all
          customer chats.{' '}
          <Link href="https://your-link-here.com" target="_blank" rel="noopener" underline="always">
            Learn More
          </Link>
        </Typography>
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
                <DesktopTimePicker
                  label="Response Time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  slotProps={{ textField: { fullWidth: true, helperText: "You can set SLA setting to fix the response time." } }}
                />
                <DesktopTimePicker
                  label="Response Time"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  slotProps={{ textField: { fullWidth: true} }}
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
