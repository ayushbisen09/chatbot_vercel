import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useRef, useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Alert,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

export function AttachFileDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('text');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileUploadRef = useRef(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleAdd = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setFileType(event.target.value);
    setIsFileUploaded(false);
    setPreviewUrl('');
    setSelectedFile(null);
    // Reset the FileUpload component
    if (fileUploadRef.current) {
      fileUploadRef.current.resetFile();
    }
  }, []);

  const CONTACTLISTS = [
    { value: 'text', label: 'Text File' },
    { value: 'audio', label: 'Audio File' },
    { value: 'image', label: 'Image File' },
    { value: 'Video', label: 'Video File' },
    { value: 'Doc', label: 'Document File (pdf, word, doc)' },
  ];

  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    if (isFileUploaded && newUrl !== previewUrl) {
      setTempUrl(newUrl);
      setShowConfirmDialog(true);
    } else {
      setPreviewUrl(newUrl);
    }
  };

  const handleConfirmRemove = () => {
    setIsFileUploaded(false);     // Reset the file uploaded state
    setSelectedFile(null);        // Clear the selected file
    setPreviewUrl('');            // Clear the preview URL (this will reset the URL field to its initial state)
    setTempUrl('');               // Clear the temporary URL
    setShowConfirmDialog(false);  // Close the confirm dialog
    if (fileUploadRef.current) {
      fileUploadRef.current.resetFile();  // Reset the file upload component
    }
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
    setTempUrl('');
  };

  const getAcceptedFileTypes = () => {
    switch (fileType) {
      case 'text':
        return '.txt';
      case 'image':
        return 'image/*';
      case 'Video':
        return 'video/*';
      case 'Doc':
        return '.pdf,.doc,.docx,.csv';
      case 'audio':
        return '.mp3, .mp4';
      default:
        return '';
    }
  };

  const handleSendMessage = () => {
    if (isFileUploaded) {
      console.log('Message sent with file:', selectedFile);
    }
  };

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
          Attach File{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Tooltip title="Select file type from here." arrow placement="top">
            <TextField
              sx={{ width: '100%', mt: 1 }}
              variant="outlined"
              select
              fullWidth
              label="Select File Type (Required)"
              value={fileType}
              onChange={handleChangeContactList}
              helperText="Choose file type."
              InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
              inputProps={{ id: `outlined-select-currency-label` }}
            >
              {CONTACTLISTS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>

          <TextField
            sx={{ width: '100%' }}
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter url or choose file."
            value={previewUrl}
            onChange={handleUrlChange}
            helperText={
              <span>
                Choose file or enter the file URL..{' '}
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
              </span>
            }
          />

          <Typography sx={{ fontWeight: '600', width: '100%', mr: 0, ml: 0, mb: 3, mt: 3 }}>
            OR
          </Typography>

          <Tooltip title="Click here to upload file." arrow placement="top">
            <FormControlLabel
              control={
                <FileUpload
                  ref={fileUploadRef}
                  onFileUpload={handleFileUpload}
                  accept={getAcceptedFileTypes()}
                  selectedFile={selectedFile}
                />
              }
              sx={{ width: '100%', mr: 0, ml: 0 }}
            />
          </Tooltip>

          {isFileUploaded && previewUrl && (
            <Box sx={{ mt: 2, borderRadius: 2 }}>
              {fileType === 'image' && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />}
              {fileType === 'audio' && (
                <audio src={previewUrl} controls style={{ width: '320px' }}>
                  <track kind="captions" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {fileType === 'Video' && (
                <video controls style={{ maxWidth: '100%' }}>
                  <source src={previewUrl} type="video/mp4" />
                  <track kind="captions" srcLang="en" label="English captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {['text', 'Doc'].includes(fileType) && (
                <iframe src={previewUrl} title="File Preview" width="100%" height="400px" />
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="akar-icons:attach" style={{ width: 18, height: 18 }} />}
            disabled={!isFileUploaded}
            sx={{ mb: 0.5 }}
          >
            Attach
          </Button>
        </DialogActions>
      </Dialog>

      {/* Using ConfirmDialog for file removal confirmation */}
      <ConfirmDialog
        open={showConfirmDialog}
        onClose={handleCancelRemove}
        title="Remove"
        content="Are you sure you want to remove this file?"
        action={
          <Button variant="contained" color="error" onClick={handleConfirmRemove}>
            Remove
          </Button>
        }
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
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
          File Uploaded Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
