import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Button,
  Switch,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  FormControlLabel,
} from '@mui/material';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';
import { OptInDrawer } from 'src/sections/optIn-management/hook/opt-in-drawer';

import FileType from '../../hook/messages-type/file';
import VideoType from '../../hook/messages-type/video';
import AudioType from '../../hook/messages-type/audio';
// ----------------------------------------------------------------------

export default function OptInSetting() {
  const { messageType, messageContent, chatBoxImage } = useSelector((state) => state.optInMessage);
  const templateFields = useSelector((state) => state.texttypetemplate.templateFields); // Access the saved template fields

  const [optInDrawer, setOptInDrawer] = useState(false);
  const [optInMessageType, setOptInMessageType] = useState('pre');
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  return (
    <Box>
      <Card>
        <CardHeader title="Opt-In Settings" sx={{ mb: 3 }} />
        <Divider />
        <Stack sx={{ padding: '32px 24px' }}>
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
            Opt-In Keywords:
          </Typography>
          <Tooltip title="Opt-In keywords" arrow placement="top">
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags}
              onChange={(event, newValue) => setTags(newValue)}
              inputValue={tagInput}
              onInputChange={(event, newInputValue) => setTagInput(newInputValue)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && tagInput.trim()) {
                  handleAddTag();
                  event.preventDefault();
                }
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    variant="soft"
                    color="info"
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="large"
                  helperText="Enter opt-in keywords"
                  placeholder="+ Add a tag"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <InputAdornment position="Start" />,
                  }}
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
            />
          </Tooltip>
        </Stack>
        <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
        <CardHeader
          title={
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
              Opt-In Response
            </Typography>
          }
        />
        <Box sx={{ px: 3, py: 2 }}>
          <Tooltip
            title="Click here to Enable/Disable Setup a response message for opt-in user keywords"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch />}
              label="Setup a response message for opt-in user keywords"
            />
          </Tooltip>
        </Box>

        <Box sx={{ px: 3 }}>
          <Box sx={{ width: '380px' }}>
            <Tooltip title="Opt-Out response preview" arrow placement="top">
              <Box sx={{ width: '380px' }}>
              {optInMessageType === 'regular' && <Card sx={{ border: '1px solid #919EAB33', width: '100%', maxWidth: '500px' }}>
                  <CardHeader
                    avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                    title="Mireya Conner"
                    subheader="Online"
                  />
                  <Divider />
                  <Typography
                    variant="caption"
                    sx={{ pr: 2, pt: 3, display: 'flex', justifyContent: 'end' }}
                  >
                    4:02 PM
                  </Typography>
                  <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: '8px', m: 2 }}>
                    {messageType === 'video' && (
                      <VideoType videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4" />
                    )}
                    {messageType === 'audio' && (
                      <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                    )}
                    {messageType === 'file' && <FileType />}

                    <Box sx={{ mb: 2 }}>
                      {chatBoxImage && (
                        <img
                          src={chatBoxImage}
                          alt="Chat Preview"
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ fontSize: 14, fontWeight: '500' }}
                    >
                      {messageContent}
                    </Typography>
                  </Box>
                </Card>} 
                {optInMessageType === 'pre' && templateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <PreviewTemplateChatBox
                      coverSrc="/assets/images/templateImage/template-image1.jpg"
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, templateFields)}
                          </span>
                          <br /> <br />
                          {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, templateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, templateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, templateFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, templateFields)}
                          <br />
                          {replacePlaceholders(`Estimated Delivery Date: {{6}}`, templateFields)}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}
              </Box>
            </Tooltip>
          </Box>
        </Box>
    

        <Box sx={{ px: 3, pb: 3 }}>
          <Tooltip title="Configure Opt-In response" arrow placement="top">
            <Button sx={{ mt: 3 }} variant="contained" onClick={() => setOptInDrawer(true)}>
              Configure
            </Button>
          </Tooltip>
        </Box>

        <OptInDrawer
          open={optInDrawer}
          onClose={() => setOptInDrawer(false)}
          setMessageType={setOptInMessageType}
          messageType={optInMessageType}
        />
      </Card>
    </Box>
  );
}
