import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Alert,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload2/upload2';

import ChatBox from './components/chat-box/chat-box';
import Image from '../../assets/images/chatImage/imagechat.png';

export default function PreApprovedMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
    <>
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
            {/* <Card
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
          </Card> */}
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
        <Button sx={{ mt: '24px' }} variant="contained" onClick={handleAdd}>
          Save
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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
          Opt-Out Configure Message Saved Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
