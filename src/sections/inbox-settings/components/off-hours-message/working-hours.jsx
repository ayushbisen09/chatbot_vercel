import { useState } from 'react';

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Avatar, Button, Divider, Tooltip, CardHeader } from '@mui/material';

import { ConfigurationDrawer2 } from 'src/sections/inbox-settings/hook/drawer';

export default function OffHourMessages() {
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

  return (
    <Box>
      <CardHeader
        title={
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
            Off Hours Message
          </Typography>
        }
      />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip
          title="Click here to Configure automated reply for user's first query during off hours."
          arrow
          placement="top"
        >
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Configure automated reply for user's first query during off hours."
          />
        </Tooltip>
      </Box>
      <Box sx={{ px: 3, pb: 3 }}>
        <Card
          sx={{
            border: '1px solid #919EAB33',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Tooltip title="Preview" arrow placement="top">
            <CardHeader
              sx={{ mb: 2 }}
              avatar={<Avatar aria-label="profile picture">MC</Avatar>}
              title={
                <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                  Mireya Conner
                </Typography>
              }
              subheader={
                <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                  Online
                </Typography>
              }
            />
            <Divider />
            <Typography
              variant="caption"
              sx={{
                pr: 2,
                pt: 3,
                display: 'flex',
                color: '#919EAB',
                justifyContent: 'end',
              }}
            >
              4:02 PM
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#CCF4FE',
                borderRadius: '8px',
                m: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontSize: 14, fontWeight: '500' }}
              >
                Hey,
                <br />
                {
                  ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                }
              </Typography>
            </Box>
          </Tooltip>
        </Card>
        <Tooltip
          title="Click here to Configure automated reply for user's first query during off hours."
          arrow
          placement="top"
        >
          <Button sx={{ mt: 3 }} variant="contained" color="inherit" onClick={handleOpenDrawer2}>
            Configure
          </Button>
        </Tooltip>

        <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
      </Box>
    </Box>
  );
}
