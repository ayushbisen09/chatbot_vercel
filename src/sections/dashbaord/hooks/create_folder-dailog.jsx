import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function CreateFolderDialog({ title, content, action, open, onClose, ...other }) {
  const [workflowName, setWorkflowName] = useState('');
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactList, setContactList] = useState('Pabbly_Connect_list');

  // Change initial state to 'Home'
  const [categorylist, setCategoryList] = useState('Home');
  const [categoryError, setCategoryError] = useState(false);

  const handleChangeCategoryList = useCallback((event, value) => {
    setCategoryList(value);
    if (value) {
      setCategoryError(false);
    }
  }, []);

  const handleAdd = () => {
    let hasError = false;

    if (!workflowName.trim()) {
      setError(true);
      hasError = true;
    }

    if (!categorylist) {
      setCategoryError(true);
      hasError = true;
    }

    if (!hasError) {
      setSnackbarOpen(true);
      setError(false);
      setCategoryError(false);
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleWorkflowNameChange = (event) => {
    setWorkflowName(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  // Reset workflow name when dialog is closed, but keep 'Home' as default category
  useEffect(() => {
    if (!open) {
      setWorkflowName('');
      setCategoryList('None'); // Reset to Home when dialog is closed
    }
  }, [open]);

  // Sample data for folder options
  const folder = [
    'None',
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  return (
    <>
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
          Create Folder
          <Tooltip title="Click here to close the dialog box" arrow placement='top'>
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Folder Name"
              value={workflowName}
              onChange={handleWorkflowNameChange}
              error={error}
              helperText={
                error ? (
                  'Enter folder name here.'
                ) : (
                  <span>
                    Enter the name of the folder here.{' '}
                    <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                    <Link
                      href="https://forum.pabbly.com/threads/folders.20987/"
                      style={{ color: '#078DEE' }}
                      underline="always"
                    >
                      Learn more
                    </Link>
                    </Tooltip>
                  </span>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter folder name here."
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
            
            <Autocomplete
              sx={{
                '& .MuiInputBase-input': { fontSize: '14px' },
                '& .MuiInputLabel-root': { fontSize: '14px' },
              }}
              options={folder}
              value={categorylist}
              onChange={handleChangeCategoryList}
              defaultValue="None"
              renderInput={(params) => (
                <Tooltip title="Click here to select parent folder" arrow placement='top'>
                <TextField
                  {...params}
                  label={
                    <Tooltip
                      title="Choose the parent folder where the new folder will be created."
                      arrow
                      placement="top"
                    >
                      <span>Select Parent Folder</span>
                    </Tooltip>
                  }
                  helperText={
                    categoryError ? (
                      'Please select a folder.'
                    ) : (
                      <>
                        Choose the parent folder where the new folder should be created.{' '}
                        <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                        <Link
                          href="https://forum.pabbly.com/threads/folders.20987/"
                          style={{ color: '#078DEE' }}
                          underline="always"
                        >
                          Learn more
                        </Link>
                        </Tooltip>
                      </>
                    )
                  }
                  error={categoryError}
                />
                 </Tooltip>
              )}
            />
           
          </Box>
        </DialogContent>

        <DialogActions>
          <Tooltip title="Click here to Create folder" arrow placement="top">
            <Button onClick={handleAdd} color="primary" variant="contained">
              Create Folder
            </Button>
          </Tooltip>
          {/* <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
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
          Success!
        </Alert>
      </Snackbar>
    </>
  );
}
