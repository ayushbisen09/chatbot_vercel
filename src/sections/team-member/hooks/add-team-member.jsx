import React, { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Divider,
  Tooltip,
  TextField,
  useMediaQuery,
  InputAdornment,
  Autocomplete,
  Chip,
  MenuItem,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { whatsappnumbers } from 'src/assets/data/whatsappnumbers';

// ----------------------------------------------------------------------


export function TeamMemberDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [selectedNumber, setSelectedNumber] = useState(null);

  const showToast = () => {
    toast.success('Team Member Added Successfully!');
  };

  const handleAdd = () => {
    // Implement your logic to add Team Member
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
        Add Team Member{' '}
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
          label="Enter Email"
          helperText={
            <span>
              Ensure that the email address you are entering has already a Pabbly account.{' '}
              <Link href="#" style={{ color: '#078DEE' }} underline="always">
                Learn more
              </Link>
            </span>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Ensure that the email address you are entering has already a Pabbly account."
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

        <Autocomplete
          disableClearable
          multiple
          freeSolo
          options={whatsappnumbers}
          getOptionLabel={(option) => option.label || option}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="soft"
                color="info"
                size="small"
                label={typeof option === 'string' ? option : option.label}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              helperText={
                <span>
                  Select WhatsApp number to be shared.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
              label="Select WhatsApp Number"
              {...params}
              variant="outlined"
              size="large"
              placeholder="Select WhatsApp Number"
              sx={{
                '& .MuiAutocomplete-inputRoot': {
                  minHeight: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <MenuItem {...props} value={option.value}>
              {option.label}
            </MenuItem>
          )}
          sx={{ width: '100%' }}
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
