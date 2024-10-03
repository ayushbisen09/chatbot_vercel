import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Avatar,
  Button,
  Switch,
  Divider,
  Tooltip,
  CardHeader,
  Typography,
  FormControlLabel,
} from '@mui/material';

import { wellComeSetChosen } from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';
import FileType from 'src/sections/optIn-management/hook/messages-type/file';
import AudioTemplateChatBox from 'src/sections/preview-template/audio-chatbox';
import VideoTemplateChatBox from 'src/sections/preview-template/video-chatbox';
import VideoType from 'src/sections/optIn-management/hook/messages-type/video';
import AudioType from 'src/sections/optIn-management/hook/messages-type/audio';
import FilePreviewTemplateChatBox from 'src/sections/preview-template/file-chatbox';
import ImagePreviewTemplateChatBox from 'src/sections/preview-template/image-chatbox';

import { WellComeMessageDrawer } from '../../hook/wellcome-message-drawer';
import video from '../../../../../public/assets/images/chatImage/video.png';
import FileImage from '../../../../../public/assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

export default function WellComeMessage() {
  const { messageType, messageContent, chatBoxImage } = useSelector(
    (state) => state.wellComeMessageRegularMessage
  );

  const wellComeMessageTemplateType = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeMessageTemplateType
  ); // Access the saved template fields

  const wellComeMessageTemplateFields = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeMessageTemplateFields
  ); // Access the saved template fields

  const wellComeMessageFileTemplateFields = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeMessageFileTemplateFields
  ); // New file template fields

  const wellComeMessageUploadedFile = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeMessageUploadedFile
  ); // New uploaded file

  const { wellComeMessageAudioUrl, wellComeMessageAudioBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access audio data from the template slice

  const { wellComeMessageVideoUrl, wellComeMessageVideoBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access video data from Redux

  const { wellComeMessageImageUrl, wellComeMessageImageBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access video data from Redux

  const [wellComeMessageDrawer, setWellComeMessageDrawer] = useState(false);
  const [wellComeMessageType, setWellComeMessageType] = useState('pre');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  console.log(wellComeMessageTemplateType);
  const dispatch = useDispatch();
  return (
    <Box>
      <CardHeader
        title={
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
            Welcome Message
          </Typography>
        }
      />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip
          title="Click here to Enable/Disabled configure automated reply for user's first query during working hours"
          arrow
          placement="top"
        >
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Configure automated reply for user's first query during working hours."
          />
        </Tooltip>
      </Box>

      <Box sx={{ px: 3 }}>
        <Box sx={{ width: '380px' }}>
          <Tooltip title="Opt-Out response preview" arrow placement="top">
            <Box sx={{ width: '380px' }}>
              {wellComeMessageType === 'regular' && (
                <Card sx={{ border: '1px solid #919EAB33', width: '100%', maxWidth: '500px' }}>
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
                </Card>
              )}
              {wellComeMessageTemplateType === 'text' &&
                wellComeMessageType === 'pre' &&
                wellComeMessageTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <PreviewTemplateChatBox
                      coverSrc="/assets/images/templateImage/template-image1.jpg"
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeMessageTemplateFields)}
                          </span>
                          <br /> <br />
                          {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, wellComeMessageTemplateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, wellComeMessageTemplateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, wellComeMessageTemplateFields)}
                          <br />
                          {replacePlaceholders(
                            `Delivery Address: {{5}}`,
                            wellComeMessageTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeMessageTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeMessageTemplateType === 'file' &&
                wellComeMessageType === 'pre' &&
                wellComeMessageFileTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <FilePreviewTemplateChatBox
                      coverSrc={wellComeMessageUploadedFile || FileImage} // Show the uploaded file or a default image
                      showImage
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(
                              ` Hi {{1}}! 🎧🛒`,
                              wellComeMessageFileTemplateFields
                            )}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(
                            ` Product: {{2}}`,
                            wellComeMessageFileTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Quantity: {{3}}`,
                            wellComeMessageFileTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Order ID: {{4}}`,
                            wellComeMessageFileTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Delivery Address: {{5}}`,
                            wellComeMessageFileTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeMessageFileTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeMessageTemplateType === 'audio' &&
                wellComeMessageType === 'pre' &&
                wellComeMessageAudioBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <AudioTemplateChatBox
                      audioSrc={wellComeMessageAudioUrl}
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {`Hi ${wellComeMessageAudioBodyFields[0]}! 🎧🛒`}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {`Product: ${wellComeMessageAudioBodyFields[1]}`}
                          <br />
                          {`Quantity: ${wellComeMessageAudioBodyFields[2]}`}
                          <br />
                          {`Order ID: ${wellComeMessageAudioBodyFields[3]}`}
                          <br />
                          {`Delivery Address: ${wellComeMessageAudioBodyFields[4]}`}
                          <br />
                          {`Estimated Delivery Date: ${wellComeMessageAudioBodyFields[5]}`}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeMessageTemplateType === 'video' &&
                wellComeMessageType === 'pre' &&
                wellComeMessageVideoBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <VideoTemplateChatBox
                      coverSrc={video}
                      showImage={!wellComeMessageVideoUrl}
                      videoSrc={wellComeMessageVideoUrl} // Pass the video URL from Redux state
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeMessageVideoBodyFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, wellComeMessageVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, wellComeMessageVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, wellComeMessageVideoBodyFields)}
                          <br />
                          {replacePlaceholders(
                            `Delivery Address: {{5}}`,
                            wellComeMessageVideoBodyFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeMessageVideoBodyFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeMessageTemplateType === 'image' &&
                wellComeMessageType === 'pre' &&
                wellComeMessageImageBodyFields && (
                  <ImagePreviewTemplateChatBox
                    // coverSrc={isFileUploaded ? URL.createObjectURL(file) : Image}
                    showImage={FileImage}
                    coverSrc={wellComeMessageImageUrl || FileImage} // Pass the video URL from Redux state
                    text={
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeMessageImageBodyFields)}
                        </span>
                        <br /> <br />
                        {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                        <br /> <br />
                        {` Order Details:`}
                        <br />
                        {replacePlaceholders(` Product: {{2}}`, wellComeMessageImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Quantity: {{3}}`, wellComeMessageImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Order ID: {{4}}`, wellComeMessageImageBodyFields)}
                        <br />
                        {replacePlaceholders(
                          `Delivery Address: {{5}}`,
                          wellComeMessageImageBodyFields
                        )}
                        <br />
                        {replacePlaceholders(
                          `Estimated Delivery Date: {{6}}`,
                          wellComeMessageImageBodyFields
                        )}
                      </>
                    }
                    showLinks
                    showVisit
                    showCall
                  />
                )}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <Tooltip title="Configure Opt-In response" arrow placement="top">
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              dispatch(wellComeSetChosen('optIn'));
              setWellComeMessageDrawer(true);
            }}
          >
            Configure
          </Button>
        </Tooltip>
      </Box>

      <WellComeMessageDrawer
        open={wellComeMessageDrawer}
        onClose={() => setWellComeMessageDrawer(false)}
        setMessageType={setWellComeMessageType}
        messageType={wellComeMessageType}
      />
    </Box>
  );
}
