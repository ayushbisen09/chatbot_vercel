import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Divider, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import VideoPlayer from 'src/components/chat-messages/video/video-message';
import AudioPlayer from 'src/components/chat-messages/audio/audio-message';
import FileMessage from 'src/components/chat-messages/file-message/file-message';
import MessageReply from 'src/components/chat-messages/reply-message/message-reply';
import { ImageModal } from 'src/components/chat-messages/image-modal/lightbox-modal';
import LocationCard from 'src/components/chat-messages/location-meesage/location-message';
import ShareContact from 'src/components/chat-messages/contact-share/contact-share-message';

import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';
import audio from '../../../public/assets/audios/new-instrumental.mp3';
import vide from '../../../public/assets/videos/chat-videos/advertisement.mp4';

// Updated HoverActions component with a 'position' prop
const HoverActions = ({ position = 'left' }) => (
  <Stack
    direction="row"
    className="hover-actions"
    sx={{
      [position]: 0,
      mt: '4px',
      mb: '8px',
      opacity: 0,
      top: '100%',
      position: 'absolute',
      transition: (theme) =>
        theme.transitions.create(['opacity'], { duration: theme.transitions.duration.shorter }),
    }}
  >
    <IconButton size="small">
      <Iconify icon="solar:reply-bold" width={24} />
    </IconButton>
  </Stack>
);

// Updated CustomMessage component
const CustomMessage = ({ text1, text2, text3, src }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      my: 2,
      position: 'relative',
      '&:hover .hover-actions': { opacity: 1 },
    }}
  >
    <Box
      sx={{
        bgcolor: '#ccf4fe',
        borderRadius: 1,
        width: 320,
        overflow: 'hidden',
        p: 1.5,
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 3,
        }}
      >
        {text1}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 1,
        }}
      >
        {text2}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 3,
        }}
      >
        {text3}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF',
          }}
        >
          <Iconify width={20} icon="material-symbols:call" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          Call Now
        </Typography>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF',
          }}
        >
          <Iconify width={20} icon="solar:copy-bold" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          Coupon Code
        </Typography>
      </Box>
      <Divider sx={{ mb: 1, mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF',
          }}
        >
          <Iconify width={20} icon="icon-park-outline:share" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF',
            fontSize: '14px',
            fontWeight: '400',
          }}
        >
          Visit Now
        </Typography>
      </Box>
    </Box>
    <HoverActions position="right" />
  </Box>
);

export function ChatMessageList({ messages = [], participants, loading }) {
  const { messagesEndRef } = useMessagesScroll(messages);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const handleOpenModal = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  if (loading) {
    return (
      <Stack sx={{ flex: '1 1 auto', position: 'relative' }}>
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            left: 0,
            width: 1,
            height: 2,
            borderRadius: 0,
            position: 'absolute',
          }}
        />
      </Stack>
    );
  }

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, pb: 3, flex: '1 1 auto' }}>
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            participants={participants}
            onOpenLightbox={() => handleOpenModal(message.body)}
          />
        ))}

        <CustomMessage
          text1="Hi {{1}}! 🎧🛒"
          text2="Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌"
          text3={`Order Details: 
            Product: {{2}}
            Quantity: {{3}}
            Order ID: {{4}}
            Delivery Address: {{5}}
            Estimated Delivery Date: {{6}}`}
          src="/assets/images/chatImage/imagechat.png"
        />

        <Box
          sx={{
            mt: 5,
            borderRadius: '8px',
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <VideoPlayer videoSrc={vide} />
          <HoverActions />
        </Box>

        <Box
          sx={{
            mt: 5,
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <AudioPlayer audioSrc={audio} />
          <HoverActions />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 5,
            width: '100%',
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <FileMessage onButtonClick={() => alert('Button clicked!')} />
          <HoverActions position="right" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',

            mt: 5,
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <MessageReply />
          <HoverActions position="right" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            mt: 5,
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <LocationCard
            location="New York City, NY"
            image="https://example.com/image.jpg" // Replace with your image URL
          />
          <HoverActions position="left" />
        </Box>


        <Box
          sx={{
            display: 'flex',
            mt: 5,
            position: 'relative',
            '&:hover .hover-actions': { opacity: 1 },
          }}
        >
          <ShareContact />
          <HoverActions position="right" />
        </Box>
      </Scrollbar>

      <ImageModal open={modalOpen} onClose={handleCloseModal} src={modalImage} />
    </>
  );
}
