import { useState } from 'react';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Avatar, Button, Divider, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import {
  ConfigurationDrawer1,
  ConfigurationDrawer2,
} from 'src/sections/inbox-settings/hook/drawer';

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const handleOpenDrawer1 = () => {
    setOpenDrawer1(true);
  };

  const handleCloseDrawer1 = () => {
    setOpenDrawer1(false);
  };

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

  const [timeValues, setTimeValues] = useState({
    Mon: { start: '09:00', end: '17:00' },
    Tue: { start: '09:00', end: '17:00' },
    Wed: { start: '09:00', end: '17:00' },
    Thu: { start: '09:00', end: '17:00' },
    Fri: { start: '09:00', end: '17:00' },
    Sat: { start: '09:00', end: '17:00' },
    Sun: { start: '09:00', end: '17:00' },
  });
  const [daysClosed, setDaysClosed] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: true,
  });

  const handleToggle = (day) => {
    setDaysClosed((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (day, type, event) => {
    const newValue = event.target.value;
    setTimeValues((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: newValue },
    }));
  };

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Inbox Settings"
        Subheading="You can customize Auto Resolving capability for users intervened for more than 24 Hours."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Auto Resolve Chats" sx={{ mb: 3 }} />
          <Divider />
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Disable auto resolve intervened chats."
            sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
          />
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Messages Settings" sx={{ mb: 3 }} />
          <Divider />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Welcome Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during working hours."
            />
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
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
            </Card>
            <Button sx={{ mt: 3 }} variant="contained" color="inherit" onClick={handleOpenDrawer1}>
              Configure
            </Button>
            <ConfigurationDrawer1 open={openDrawer1} onClose={handleCloseDrawer1} />
          </Box>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Off Hours Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during off hours."
            />
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
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
            </Card>
            <Button sx={{ mt: 3 }} variant="contained" color="inherit" onClick={handleOpenDrawer2}>
              Configure
            </Button>
            <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
          </Box>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader
            subheader="Configure day-wise working hours for automated replies."
            title="Working Hours"
            sx={{ mb: 3 }}
          />
          <Divider sx={{ mb: '12px' }} />
          {Object.keys(daysClosed).map((day) => (
            <Box
              key={day}
              sx={{
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', width: '40px' }}>
                {day}
              </Typography>
              <FormControlLabel
                control={<Switch checked={!daysClosed[day]} onChange={() => handleToggle(day)} />}
                label=""
              />
              {daysClosed[day] ? (
                <Typography
                  variant="h7"
                  sx={{ fontSize: '14px', fontWeight: '600', ml: 2, minHeight: '55px' }}
                  alignContent="center"
                >
                  Closed
                </Typography>
              ) : (
                <>
                  <TextField
                    type="time"
                    value={timeValues[day].start}
                    onChange={(event) => handleTimeChange(day, 'start', event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: '25%' }}
                  />
                  <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                    To
                  </Typography>
                  <TextField
                    type="time"
                    value={timeValues[day].end}
                    onChange={(event) => handleTimeChange(day, 'end', event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: '25%' }}
                  />
                </>
              )}
            </Box>
          ))}
          <Box sx={{ padding: '0px 24px 24px 24px' }}>
            <Button variant="contained" color="inherit">
              Save
            </Button>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
