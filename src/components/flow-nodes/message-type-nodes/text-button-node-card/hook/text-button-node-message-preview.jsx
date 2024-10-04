import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// ----------------------------------------------------------------------

export function TextButtonNodeMessagePreview({ showTextButtonNodeMessagePreview, setShowTextButtonNodeMessagePreview }) {
  console.log('showTextButtonNodeMessagePreview',showTextButtonNodeMessagePreview);
  const handleCloseDrawer =() => {
    setShowTextButtonNodeMessagePreview(false);
  };

  return (
    <Drawer
      open={showTextButtonNodeMessagePreview}
      onClose={handleCloseDrawer}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 320 } }}
    >
      <Box sx={{ p: 2.5 }}>

        Card
      </Box>
    </Drawer>
  );
}
