import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Divider, CardHeader, FormHelperText, Avatar, Button } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page_header';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ChatBox from 'src/components/chatbox/chatbox';
import Images from '../../assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [value, setValue] = useState(dayjs(new Date()));
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const [timeValues, setTimeValues] = useState({
    Mon: { start: dayjs(), end: dayjs() },
    Tue: { start: dayjs(), end: dayjs() },
    Wed: { start: dayjs(), end: dayjs() },
    Thu: { start: dayjs(), end: dayjs() },
    Fri: { start: dayjs(), end: dayjs() },
    Sat: { start: dayjs(), end: dayjs() },
    Sun: { start: dayjs(), end: dayjs() },
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

  const handleTimeChange = (day, type, newValue) => {
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
            {/* <ChatBox
              showImage
              showLinks
              showCall
              coverSrc={Images}
              text={
                <>
                  {`Hi {{1}}! 🎧🛒`}
                  <br />
                  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌
                  <br />
                  {`Order Details:
Product: {{2}}
Quantity: {{3}}
Order ID: {{4}}
Delivery Address: {{5}}
Estimated Delivery Date: {{6}}`}
                </>
              }
            /> */}
            <Button sx={{ mt: 3 }} variant="contained" color="inherit">
              Configure
            </Button>
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
            <Button sx={{ mt: 3 }} variant="contained" color="inherit">
              Configure
            </Button>
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
                  <TimePicker
                    sx={{ width: '25%' }}
                    ampm={false}
                    value={timeValues[day].start}
                    onChange={(newValue) => handleTimeChange(day, 'start', newValue)}
                    slotProps={{ textField: { size: 'large' } }}
                  />
                  <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                    To
                  </Typography>
                  <TimePicker
                    sx={{ width: '25%' }}
                    ampm={false}
                    value={timeValues[day].end}
                    onChange={(newValue) => handleTimeChange(day, 'end', newValue)}
                    slotProps={{ textField: { size: 'large' } }}
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
