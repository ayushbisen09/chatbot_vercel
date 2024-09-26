import { useState } from 'react';
import { useSelector } from 'react-redux';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Avatar, Button, Divider, Tooltip, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import FileType from 'src/sections/optIn-management/hook/messages-type/file';
import AudioType from 'src/sections/optIn-management/hook/messages-type/audio';
import VideoType from 'src/sections/optIn-management/hook/messages-type/video';
import { OptInDrawer } from 'src/sections/optIn-management/hook/opt-in-drawer';
import { OptOutDrawer } from 'src/sections/optIn-management/hook/opt-out-drawer';
// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const savedOptOutTemplate = useSelector((state) => state.template.selectedTemplateOptOut);
  const savedOptInTemplate = useSelector((state) => state.template.selectedTemplateOptIn);
  // const savedRegularMessage = useSelector((state) => state.regularMessage);
  const savedRegularMessage = useSelector((state) => state.regularMessage);

  const [optOutDrawer, setOpenOptOutDrawer] = useState(false);
  const [optInDrawer, setOpenOptInDrawer] = useState(false);
  const [optInMessageType, setOptInMessageType] = useState('regular');
  const [optOutMessageType, setOptOutMessageType] = useState('regular');
  

  const handleOpenOptOutDrawer = () => {
    setOpenOptOutDrawer(true);
  };

  const handleCloseOptOutDrawer = () => {
    setOpenOptOutDrawer(false);
  };

  const handleOpenOptInDrawer = () => {
    setOpenOptInDrawer(true);
  };

  const handleCloseOptInDrawer = () => {
    setOpenOptInDrawer(false);
  };

  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const renderTemplateOptOutContent = () => {
    switch (savedOptOutTemplate?.type) {
      case 'video':
        return (
          <VideoType
            videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4"
            captionsSrc="../../assets/captions/sample.vtt"
          />
        );
      case 'audio':
        return <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />;
      case 'file':
        return <FileType />;
      default:
        return null;
    }
  };

  const renderTemplateOptInContent = () => {
    switch (savedOptInTemplate?.type) {
      case 'video':
        return (
          <VideoType
            videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4"
            captionsSrc="../../assets/captions/sample.vtt"
          />
        );
      case 'audio':
        return <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />;
      case 'file':
        return <FileType />;
      default:
        return null;
    }
  };

  const renderSavedRegularMessage = () => {
    switch (savedRegularMessage.regularMessageType) {
      case 'video':
        return <VideoType videoSrc={savedRegularMessage.videoSrc} />; // Adjust as per your source
      case 'audio':
        return <AudioType audioSrc={savedRegularMessage.audioSrc} />;
      case 'file':
        return <FileType fileSrc={savedRegularMessage.fileSrc} />;
      default:
        return <Typography>{savedRegularMessage.regularMessageContent}</Typography>; // Default text
    }
  };
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [chatBoxImage, setChatBoxImage] = useState(''); // State for the image based on the selected type

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Opt-In Management"
        Subheading="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign."
        showButton={false}
      />
      {/* Opt-Out Section */}

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="API Campaign Opt-out" sx={{ mb: 3 }} />
          <Divider />
          <Tooltip
            title="Click here to Enable/Disable this if you don't wish to send api campaign to opted-out contacts"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Enable this if you don't wish to send api campaign to opted-out contacts"
              sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
            />
          </Tooltip>
        </Card>
      </Box>

      {/* Repeated Content for Opt-Out */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Opt-Out Settings" sx={{ mb: 3 }} />
          <Divider />
          <Stack sx={{ padding: '32px 24px 32px 24px' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
              Opt-Out Keywords:
            </Typography>
            <Tooltip title="Opt-Out keywords" arrow placement="top">
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                inputValue={tagInput}
                onInputChange={(event, newInputValue) => {
                  setTagInput(newInputValue);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && tagInput.trim()) {
                    setTags([...tags, tagInput.trim()]);
                    setTagInput('');
                    event.preventDefault();
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
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
                    onClick={handleAddTag}
                    {...params}
                    variant="outlined"
                    size="large"
                    helperText="Enter opt-out keywords"
                    placeholder="+ Add a keyword"
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
                Opt-Out Response
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <Tooltip
              title="Click here to Enable/Disable Setup a response message for opt-out user keywords"
              arrow
              placement="top"
            >
              <FormControlLabel
                control={<Switch id="toggle-taxes" />}
                label="Setup a response message for opt-out user keywords"
              />
            </Tooltip>
          </Box>

          {optOutMessageType === 'pre' ? (
            <Box sx={{ px: 3, pb: 3 }}>
              <Box sx={{ mt: 4 }}>
                <Tooltip title="Opt-Out response preview" arrow placement="top">
                  <Card
                    sx={{
                      border: '1px solid #919EAB33',
                      width: '100%',
                      maxWidth: '380px',
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
                      {renderTemplateOptOutContent()}

                      {savedOptOutTemplate?.chatBoxImage && (
                        <img
                          src={savedOptOutTemplate?.chatBoxImage}
                          alt="Chat Preview"
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ fontSize: 14, fontWeight: '500' }}
                        >
                          {savedOptOutTemplate?.message}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                pl: 3,
                width: '380px',
              }}
            >
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '380px',
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
                  {/* Display the saved regular message type conditionally */}
                  {savedRegularMessage.regularMessageType === 'video' && (
                    <VideoType videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4" />
                  )}

                  {savedRegularMessage.regularMessageType === 'audio' && (
                    <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                  )}

                  {savedRegularMessage.regularMessageType === 'file' && <FileType />}

                  {/* Display image if available */}
                  <Box sx={{ mb: 2 }}>
                    {chatBoxImage && (
                      <img
                        src={chatBoxImage}
                        alt="Chat Preview"
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    )}
                  </Box>

                  {/* Display the regular message content */}
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0 : 0 }}
                  >
                    {savedRegularMessage.regularMessageContent}
                  </Typography>
                </Box>
              </Card>
            </Box>
          )}
          <Box sx={{ px: 3, pb: 3 }}>
            <Tooltip title=" Configure Opt-Out response " arrow placement="top">
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="inherit"
                onClick={handleOpenOptOutDrawer}
              >
                Configure
              </Button>
            </Tooltip>
          </Box>

          <OptOutDrawer
            open={optOutDrawer}
            onClose={handleCloseOptOutDrawer}
            setMessageType={setOptOutMessageType}
            messageType={optOutMessageType}
          />
        </Card>
      </Box>

{/* ========================================================================================================= */}


      {/* Opt-In Section */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Opt-In Settings" sx={{ mb: 3 }} />
          <Divider />
          <Stack sx={{ padding: '32px 24px 32px 24px' }}>
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
                onInputChange={(event, newInputValue) => {
                  setTagInput(newInputValue);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && tagInput.trim()) {
                    setTags([...tags, tagInput.trim()]);
                    setTagInput('');
                    event.preventDefault();
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
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
                    onClick={handleAddTag}
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
                control={<Switch id="toggle-taxes" />}
                label="Setup a response message for opt-in user keywords"
              />
            </Tooltip>
          </Box>

          







          {optInMessageType === 'pre' ? (
            <Box sx={{ px: 3, pb: 3 }}>
              <Box sx={{ mt: 4 }}>
                <Tooltip title="Opt-Out response preview" arrow placement="top">
                  <Card
                    sx={{
                      border: '1px solid #919EAB33',
                      width: '100%',
                      maxWidth: '380px',
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
                      {renderTemplateOptInContent()}

                      {savedOptInTemplate?.chatBoxImage && (
                        <img
                          src={savedOptInTemplate?.chatBoxImage}
                          alt="Chat Preview"
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ fontSize: 14, fontWeight: '500' }}
                        >
                          {savedOptInTemplate?.message}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Tooltip>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                pl: 3,
                width: '380px',
              }}
            >
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '380px',
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
                  {/* Display the saved regular message type conditionally */}
                  {savedRegularMessage.regularMessageType === 'video' && (
                    <VideoType videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4" />
                  )}

                  {savedRegularMessage.regularMessageType === 'audio' && (
                    <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                  )}

                  {savedRegularMessage.regularMessageType === 'file' && <FileType />}

                  {/* Display image if available */}
                  <Box sx={{ mb: 2 }}>
                    {chatBoxImage && (
                      <img
                        src={chatBoxImage}
                        alt="Chat Preview"
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    )}
                  </Box>

                  {/* Display the regular message content */}
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0 : 0 }}
                  >
                    {savedRegularMessage.regularMessageContent}
                  </Typography>
                </Box>
              </Card>
            </Box>
          )}
          <Box sx={{ px: 3, pb: 3 }}>
            <Tooltip title=" Configure Opt-Out response " arrow placement="top">
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="inherit"
                onClick={handleOpenOptInDrawer}
              >
                Configure
              </Button>
            </Tooltip>
          </Box>

          <OptInDrawer
            open={optInDrawer}
            onClose={handleCloseOptInDrawer}
            setMessageType={setOptInMessageType}
            messageType={optInMessageType}
          />









        </Card>
      </Box>
    </DashboardContent>
  );
}
