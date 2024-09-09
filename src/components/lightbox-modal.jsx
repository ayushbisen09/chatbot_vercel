import React from 'react';

import { Dialog, IconButton, DialogContent } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export const ImageModal = ({ open, onClose, src }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogContent
      sx={{
        padding: 0, // Remove padding around the image
        overflow: 'hidden', // Ensure no overflow from the image
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          zIndex: 1, // Ensure the close button is above the image
        }}
      >
        <Iconify icon="material-symbols:close" width={24} />
      </IconButton>
      <img
        src={src}
        alt="Preview"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto', // Ensure the image maintains its aspect ratio
          objectFit: 'contain',
        }}
      />
    </DialogContent>
  </Dialog>
);
