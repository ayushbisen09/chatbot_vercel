/* eslint-disable import/extensions */
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

import { useMockedUser } from 'src/auth/hooks';
import { useMessage } from 'src/sections/chat/hooks/use-message';


export function  ImageMessage({ message, participants, onOpenLightbox }) {
  const { user } = useMockedUser();
console.log("image message k andar vala message",message);
  const { me, senderDetails, hasImage } = useMessage({
    message,
    participants,
    currentUserId: `${user?.id}`,
  });

  const { firstName, avatarUrl } = senderDetails;
  const { body, createdAt } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{ mb: 1, color: 'text.disabled', ...(!me && { mr: 'auto' }) }}
    >
      {!me && `${firstName}, `}
      {fToNow(createdAt)}
    </Typography>
  );

  return (
    <Stack
    sx={{
      p: 1.5,
      minWidth: 48,
      maxWidth: 320,
      borderRadius: 1,
      typography: 'body2',
      bgcolor: 'background.neutral',
      ...(me && { color: 'grey.800', bgcolor: 'primary.lighter' }),
      ...(hasImage && { p: 0, bgcolor: 'transparent' }),
    }}
  >
      <Box
        component="img"
        alt="attachment"
        
        src={body}
        onClick={() => onOpenLightbox(body)}
        sx={{
          width: 400,
          height: 'auto',
          borderRadius: 1.5,
          cursor: 'pointer',
          objectFit: 'cover',
          aspectRatio: '16/11',
          '&:hover': { opacity: 0.9 },
        }}
      />
   
  </Stack>
  );
}
