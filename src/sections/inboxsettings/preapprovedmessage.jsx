import { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import FileUpload from 'src/components/upload2/upload2';
import ChatBox from './components/chatbox/chatbox';
import Image from '../../assets/images/chatImage/imagechat.png';

export default function RegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const CURRENCIES = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'BTC', label: '฿' },
    { value: 'JPY', label: '¥' },
  ];

  const [currency, setCurrency] = useState('EUR');

  const handleChangeCurrency = useCallback((event) => {
    setCurrency(event.target.value);
  }, []);

  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };

  return (
    <Box sx={{ mt: '24px' }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
        <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
          <TextField
            sx={{ mb: '24px' }}
            id="select-currency-label-x"
            select
            fullWidth
            label="Select WhatsApp Template"
            // value={currency}
            onChange={handleChangeCurrency}
            helperText="Select one from your WhatsApp approved template messages"
          >
            {CURRENCIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Header File URL"
            helperText="Size < 5MB, Accepted formats : .png or .jpeg"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter header URL"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
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
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
              padding: '24px 0px 24px 0px',
              mr: 0,
              ml: 0,
            }}
          >
            OR
          </Typography>
          <FileUpload onFileUpload={handleFileUpload} />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter or select an user custom field."
            helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Body Field 1 (Eg: Ankit)"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <Iconify
                      icon="fluent:calendar-agenda-24-regular"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter or select an user custom field."
            helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Body Field 2 (Eg: c2343)"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <Iconify
                      icon="fluent:calendar-agenda-24-regular"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter or select an user custom field."
            helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Body Field 3 (Eg: 20%)"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <Iconify
                      icon="fluent:calendar-agenda-24-regular"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter or select an user custom field."
            helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Body Field 4 (Eg: Shoes)"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <Iconify
                      icon="fluent:calendar-agenda-24-regular"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mt: '24px' }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter or select an user custom field."
            helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Body Field 5 (Eg: $234)"
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <Iconify
                      icon="fluent:calendar-agenda-24-regular"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          width={isMobile ? '100%' : '40%'}
          sx={{ pl: isMobile ? 0 : '12px', mt: isMobile ? '24px' : 0 }}
        >
          <ChatBox
            text={
              <>
                {`Hi {{1}}! 🎧🛒`}
                <br />
                <br /> {/* Extra blank line */}
                Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌
                <br />
                <br /> {/* Extra blank line */}
                Order Details:
                <br />
                {`Product: {{2}}`}
                <br />
                {`Quantity: {{3}}`}
                <br />
                {`Order ID: {{4}}`}
                <br />
                {`Delivery Address: {{5}}`}
                <br />
                {`Estimated Delivery Date: {{6}}`}
              </>
            }
            showImage
            coverSrc={Image}
            showLinks
            showCoupon
            showCall
            showVisit
          />
        </Box>
      </Box>
      <Button sx={{ mt: '24px' }} variant="contained">
        Save
      </Button>
    </Box>
  );
}
