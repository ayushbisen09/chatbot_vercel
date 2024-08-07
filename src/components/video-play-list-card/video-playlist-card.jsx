import 'react-modal-video/scss/modal-video.scss';

import React, { useState } from 'react';

import { Box, Card, Button } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';

import { Iconify } from '../iconify'; // Import styles for ModalVideo

export default function VideoPlayListCards({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId, // Add the videoId prop to pass the video ID
  ...other
}) {
  const [isOpen, setOpen] = useState(false); // State to handle modal open/close

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
      }}
      {...other}
    >
      <Box sx={{ pt: 1, px: 1 }}>
        <Box
          component="img"
          src={`${CONFIG.site.basePath}/assets/thumbnails-image/${thumbnailimage}`}
          sx={{
            width: '100%',
            height: 264,
            position: 'relative',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={{ pt: 2.5, px: 2, ...sx }}>
        <Box sx={{ pb: 1.5 }}>
          <Label
            sx={{
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
              height: '34px',
              fontSize: '12px',
              fontWeight: '500',
            }}
            variant="soft"
          >
            <Iconify sx={{ mr: 1 }} icon="tabler:clock" width={24} /> 01 hr 20 mins
          </Label>
        </Box>
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'text.primary',
            pb: 1.5,
          }}
        >
          {Videotitle}
        </Box>
        <Box>
          <Button
            variant="contained"
            color="inherit"
            width="105px"
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)} // Open modal on button click
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
