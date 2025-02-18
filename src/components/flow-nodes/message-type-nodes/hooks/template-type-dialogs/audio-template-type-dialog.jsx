import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  Divider,
  Tooltip,
  TextField,
  Typography,
  useMediaQuery,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import {
  optInSetAudioData,
  optInSetTemplateType,
} from 'src/redux/slices/optInMessageTemplateTypeSlice';
import {
  optOutSetAudioData,
  optOutSetTemplateType,
} from 'src/redux/slices/optOutMessageTemplateTypeSlice';
import {
  offHourSetAudioData,
  offHourSetTemplateType,
} from 'src/redux/slices/offHourMessageTemplateTypeSlice';
import {
  wellComeSetAudioData,
  wellComeSetTemplateType,
} from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

import AudioTemplateChatBox from 'src/sections/preview-template/audio-chatbox';

export function AudioTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [bodyFields, setBodyFields] = useState(Array(6).fill(''));
  const [audioUrl, setAudioUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleInputChange = (index, value) => {
    const updatedFields = [...bodyFields];
    updatedFields[index] = value;
    setBodyFields(updatedFields);
  };

  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  const handleFileUpload = useCallback((uploadedFile) => {
    if (uploadedFile && uploadedFile.type.startsWith('audio/')) {
      setFile(uploadedFile);
      setIsFileUploaded(true);
      setAudioUrl(URL.createObjectURL(uploadedFile));
      setFileName(uploadedFile.name);
    } else {
      alert('Please upload an audio file.');
    }
  }, []);

  const chosen = useSelector((state) => state.optInMessageTemplateType.chosen);
  const wellComeChosen = useSelector((state) => state.wellComeMessageTemplateType.wellComeChosen);

  const handleSave = () => {
    // Dispatch audio data to the Redux store
    if (chosen === 'optIn') {
      dispatch(optInSetTemplateType('audio'));
      dispatch(
        optInSetAudioData({
          audioUrl,
          bodyFields,
          fileName,
        })
      );
    } else {
      dispatch(optOutSetTemplateType('audio'));
      dispatch(
        optOutSetAudioData({
          audioUrl,
          bodyFields,
          fileName,
        })
      );
    }

    onClose(); // Close the dialog
  };
  const handleSend = () => {
    // Dispatch audio data to the Redux store

    if (wellComeChosen === 'wellCome') {
      dispatch(wellComeSetTemplateType('audio'));
      dispatch(
        wellComeSetAudioData({
          audioUrl,
          bodyFields,
          fileName,
        })
      );
    } else {
      dispatch(offHourSetTemplateType('audio'));
      dispatch(
        offHourSetAudioData({
          audioUrl,
          bodyFields,
          fileName,
        })
      );
    }

    onClose(); // Close the dialog
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      {...other}
      PaperProps={{
        style: {
          width: '1000px',
          maxWidth: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: '700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6">Audio Template Messages</Typography>
          <Iconify
            onClick={handleCancel}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </div>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="regular" sx={{ mt: 1 }}>
          Upload an audio file to preview in the template
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ pr: 2, pb: 2, width: '60%' }}>
            {bodyFields.map((fieldValue, index) => (
              <TextField
                key={index}
                sx={{ mt: '24px' }}
                placeholder={`Enter a custom field for body field ${index + 1}`}
                fullWidth
                size="medium"
                type="text"
                margin="dense"
                variant="outlined"
                label={`Body Field ${index + 1} (Eg: Ankit)`}
                helperText="This field is required. Leaving it empty may prevent message delivery."
                InputLabelProps={{ shrink: true }}
                value={fieldValue}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
            <Box sx={{ mt: 0.5 }}>
              <FileUpload onFileUpload={handleFileUpload} />
              <TextField
                sx={{ mt: 3 }}
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="File Name"
                helperText="Display name of audio file, visible on download."
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Enter the name of audio file, visible on download"
                        arrow
                        placement="top"
                        sx={{ fontSize: '16px' }}
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
            </Box>
          </Box>
          <Box sx={{ py: 2,pl:2,width: '40%' }}>
            <AudioTemplateChatBox
              audioSrc={audioUrl}
              text={
                <>
                  <span style={{ fontWeight: '600' }}>
                    {replacePlaceholders(` Hi {{1}}! 🎧🛒`, bodyFields)}
                  </span>
                  <br /> <br />
                  {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                  <br /> <br />
                  {` Order Details:`}
                  <br />
                  {replacePlaceholders(` Product: {{2}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Quantity: {{3}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Order ID: {{4}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Delivery Address: {{5}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Estimated Delivery Date: {{6}}`, bodyFields)}
                </>
              }
              showLinks
              showVisit
              showCall
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ mr: 1 }}
          onClick={() => {
            if (chosen === 'optIn') {
              handleSave();
            } else {
              handleSend();
            }
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
