import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  Divider,
  CardHeader,
  FormControl,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  TextField,
  FormHelperText,
  Button,
  
  IconButton,
} from '@mui/material';
import { CloseIcon } from 'yet-another-react-lightbox';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page_header';
import { Iconify } from 'src/components/iconify';
import { timezone } from 'src/assets/data/timezone'; // Changed 'timezone' to 'timezone'
import { toast } from 'sonner';


// ----------------------------------------------------------------------

export default function Page() {
  const [timeZone, setTimeZone] = useState('(GMT-05:00) Eastern Time (US & Canada)');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTimeZones = timezone.filter(
    (
      tz // Changed 'timeZone' to 'timezones'
    ) => tz.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

 

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
const handleSave  = () => {
  showToast();
}
  
  const showToast = () => {
    toast.success('Time Zone Updated Successfully!');
  };

  return (
    <>
      <DashboardContent maxWidth="xl">
        <PageHeader
          title="Time Zone"
          Subheading="Select your account's time zone from here. By selecting your account time zone from the settings menu, you can ensure that all of your works and task executions are displayed at the correct time for your location."
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader title="Time Zone" sx={{ mb: 3 }} />
            <Divider />
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Select Time Zone
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="time-zone-select-label">Time Zone</InputLabel>

                <Select
                  labelId="time-zone-select-label"
                  id="time-zone-select"
                  value={timeZone}
                  label="Time Zone"
                  onChange={handleTimeZoneChange}
                  IconComponent={() => (
                    <Iconify width={24} icon="iconamoon:arrow-down-2-bold" sx={{ mr: 1 }} />
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        width: 250,
                        height: 450,
                      },
                    },
                    MenuListProps: {
                      style: { padding: 0 },
                      maxheight: 250,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      // position: 'Sticky',
                      top: 0,
                      // bgcolor: 'background.paper',
                      zIndex: 5,
                    }}
                  >
                    <TextField
                      fullWidth
                      size="large"
                      placeholder="Search time zone..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      inputRef={searchInputRef}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" width={24} height={24} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {filteredTimeZones.map((tz) => (
                    <MenuItem key={tz} value={tz}>
                      {tz}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select the time zone that matches your current location
                </FormHelperText>
              </FormControl>
              <Box>
                <Button variant="contained" color="inherit" onClick={handleSave}>
                  Save
                </Button>
              </Box>
              {/* Removed empty Button component */}
            </Box>
          </Card>
        </Box>
        
      </DashboardContent>
    </>
  );
}
