import React from 'react';
import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Divider, Tooltip, TextField, useMediaQuery, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
export function WebhookDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const showToast = () => {
    toast.success('Opt-Out Webhook Added Successfully!');
  };

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    showToast(); // Example: Call showToast or any other necessary function
    dialog.onFalse(); // Close the dialog after adding
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Quick Replies{' '}
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextField
          autoFocus
          fullWidth
          type="text"
          margin="dense"
          variant="outlined"
          label="Enter Shortcut"
          helperText={
            <span>
              Enter shortcut for your quick reply.{' '}
              <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                Learn more
              </RouterLink>
            </span>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Enter webhook name here."
                  arrow
                  placement="top"
                  sx={{
                    fontSize: '16px', // Adjust the font size as needed
                  }}
                >
                  <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type="text"
          margin="dense"
          variant="outlined"
          label="Message Type"
          helperText={
            <span>
              Select one of the message types to proceed.{' '}
              <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                Learn more
              </RouterLink>
            </span>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Ensure that the webhook URL is correct."
                  arrow
                  placement="top"
                  sx={{
                    fontSize: '16px', // Adjust the font size as needed
                  }}
                >
                  <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="dense"
          variant="outlined"
          label="Enter Text"
          helperText="Use text formatting - *bold* & _italic_ Text can be upto 4096 characters long
Personalize messages with - $FirstName, $Name, $MobileNumber, $LastName & custom attributes.
Customize messages with dynamic parameters e.g. - Your verification code is {{1}}."
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
