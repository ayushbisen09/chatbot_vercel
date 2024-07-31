import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { countries } from 'src/assets/data';

import { FormProvider } from 'react-hook-form';
import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page_header';
import { DashboardContent } from 'src/layouts/dashboard';

import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PreApprovedMessage from './preapprovedmessage';
import RegularMessage from './regularmessage';

export default function AddBroadcast() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //   Included Excluded Arrays

  const includedArray = [
    'Pabbly Connect List',
    'Pabbly Subscription Billing List',
    ' Pabbly Support',
  ];
  const excludedArray = ['Pabbly Email Marketing List', 'Pabbly Form Builder List'];

  //   Included Excluded Arrays

  // Radio Button Function for Message Type
  const [messageType, setMessageType] = useState('pre_approved_message');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };

  // Radio Button Function for Message Type

  // Radio Button Function Schedule Broadcast
  const [scheduleType, setScheduleType] = useState('yes_schedule');

  const handleScheduleChange = (event) => {
    setScheduleType(event.target.value);
  };
  // Radio Button Function Schedule Broadcast

  // Phone NUmber Field Function
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  // Phone NUmber Field Function

  //   Time Picker Function
  const [valuenew, setValue] = useState(dayjs(new Date()));

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Whatsapp Broadcast"
          Subheading="Launch a campaign now to initiate new conversations with users on WhatsApp."
          link_added="#"
        />
      </Box>
      <Card sx={{ mt: '40px' }}>
        <CardHeader title="Whatsapp Broadcast" sx={{ mb: 3 }} />
        <Divider />
        <FormProvider>
          <Form>
            {/*  Broadcast Name */}

            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  label="Broadcast Name"
                  helperText="Enter the name of the broadcast."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter the name of the broadcast."
                          arrow
                          placement="top"
                          sx={{
                            fontSize: '16px', // Adjust the font size as needed
                          }}
                        >
                          <Iconify
                            icon="material-symbols:info-outline"
                            style={{ width: 20, height: 20 }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              }
              sx={{ width: '100%', padding: '24px 24px 24px 24px', mr: 0, ml: 0 }}
            />

            {/* Select Contacts Button */}
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ m: '0px 24px 24px 24px', alignSelf: 'flex-start' }}
            >
              Select Contacts
            </Button>

            {/* Included List */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                padding: '0px 24px 8px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography fontSize={14}>Included: </Typography>
              <Typography color="grey" fontSize={14}>
                {includedArray.join(', ')}
              </Typography>
            </Box>
            {/* Excluded List */}

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography fontSize={14}>Excluded: </Typography>
              <Typography color="grey" fontSize={14}>
                {excludedArray.join(', ')}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

            {/* Message Type */}
            <Box
              sx={{
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
              <RadioGroup row value={messageType} onChange={handleRadioChange}>
                <FormControlLabel
                  value="pre_approved_message"
                  control={<Radio size="small" />}
                  label="Pre-approved template message"
                />
                <FormControlLabel
                  value="regular_message"
                  control={<Radio size="small" />}
                  label="Regular Message"
                />
              </RadioGroup>
              {messageType === 'pre_approved_message' && (
                <form>
                  <PreApprovedMessage />
                </form>
              )}

              {messageType === 'regular_message' && (
                <form>
                  <RegularMessage />
                </form>
              )}
            </Box>

            <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

            {/* Mobile NUmber Field */}
            <FormControlLabel
              control={
                <Box
                  width="100%"
                  sx={{ display: 'flex', flexWrap: { xs: 'wrap', lg: 'nowrap', md: 'nowrap' } }}
                  gap={2}
                >
                  <TextField
                    fullWidth
                    helperText="Enter the contact's mobile number."
                    placeholder="Enter mobile number"
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            value={selectedCountry.code}
                            onChange={handleCountryChange}
                            renderValue={(value) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  marginRight: 2,
                                  ml: '-14px',
                                }}
                              >
                                <ReactCountryFlag
                                  countryCode={value}
                                  svg
                                  style={{ marginRight: 8, width: '24px', height: '24px' }}
                                />
                                {updatedCountries.find((country) => country.code === value).phone}
                              </Box>
                            )}
                            sx={{
                              mr: 1,
                              minWidth: 100,
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-select': { paddingRight: '24px' },
                            }}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 300,
                                },
                              },
                            }}
                          >
                            {updatedCountries.map((country) => (
                              <MenuItem key={country.code} value={country.code}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <ReactCountryFlag
                                    countryCode={country.code}
                                    svg
                                    style={{ marginRight: 8, width: '24px', height: '24px' }}
                                  />
                                  {country.label} ({country.phone})
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    sx={{ height: '55px', width: { xs: '50%', md: '20%', lg: '20%' } }}
                    variant="contained"
                    color="inherit"
                  >
                    Send Test Message
                  </Button>
                </Box>
              }
              sx={{ width: '100%', padding: '0px 24px 32px 24px', mr: 0, ml: 0 }}
            />

            {/* Schedule Broadcast */}
            <Box
              sx={{
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Schedule Broadcast
              </Typography>
              <RadioGroup
                sx={{ mb: '0px' }}
                row
                value={scheduleType}
                onChange={handleScheduleChange}
              >
                <FormControlLabel
                  value="yes_schedule"
                  control={<Radio size="small" />}
                  label="Yes (Schedule for Later)"
                />
                <FormControlLabel
                  value="no_schedule"
                  control={<Radio size="small" />}
                  label="No (Send Instantly)"
                />
              </RadioGroup>
              {scheduleType === 'yes_schedule' && (
                <form>
                  <DateTimePicker
                  sx={{mt:'24px'}}
                    label="Sechdule by Date and TIme"
                    value={valuenew}
                    onChange={setValue}
                    slotProps={{ textField: { fullWidth: true ,helperText:'Select date and time for the scheduling the broadcast. The time will be based on your account time zone which is Asia/Kolkata.'} }}
                  />
                </form>
              )}

              {/* {scheduleType === 'no_schedule' && <form>No, Send Instantly</form>} */}
            </Box>

            <Box sx={{display:'flex',gap:2, width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}>
              <Button  variant="contained" size="large" color="inherit">
                Add Broadcast
              </Button>
              <Button variant="outlined" size="large" color="inherit">
                Cancel
              </Button>
            </Box>
          </Form>
        </FormProvider>
      </Card>
    </DashboardContent>
  );
}
