import React from 'react';

import { Box, Card, Stack, Tooltip, TextField, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const renderListNode = (
  card,
  index,

  deleteTextField,
  deleteCard,
  handleHoverCardClick
) => (
  <Card
    key={card.id}
    sx={{
      // position: 'relative',
      // boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
      px: 1.5,
      pt: 3.5,
      pb: 2.5,
      mb: 3,

      // border: '1px solid transparent',
      // overflow: 'visible',
      // '&:hover': {
      //   border: '1px solid #919EAb',
      //   borderRadius: '16px',
      // },
      // '&:hover .hoverCard': {
      //   opacity: 1,
      // },
    }}
  >
    <Stack spacing={2}>
      <TextField
        label="Enter header"
        helperText="Enter header here only  20 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        label="Enter body"
        helperText="Enter body here only  1024 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label="Enter Footer"
        helperText="Enter footer here only  60 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={3}
      />
    </Stack>

    {/* Hover Card */}
    <Box
      className="hoverCard"
      sx={{
        position: 'absolute',
        top: 30,
        right: -37,
        width: '50px',
        height: 30 + (index === 0 ? 3 : 4) * 30,
        backgroundColor: 'background.paper',
        border: '1px solid #ddd',
        borderRadius: '12px',
        opacity: 0,
        transition: 'opacity 0.1s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 10,
      }}
    >
      <Tooltip title="Add">
        <IconButton onClick={() => handleHoverCardClick(card.id)}>
          <Iconify
            width={24}
            icon="heroicons:plus-circle-16-solid"
            sx={{ color: 'text.secondary' }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton>
          <Iconify width={24} icon="heroicons:eye-16-solid" sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Tooltip>
      {index > 0 && (
        <Tooltip title="Delete Content">
          <IconButton onClick={() => deleteCard(card.id)}>
            <Iconify
              width={24}
              icon="solar:trash-bin-trash-bold"
              sx={{ color: 'text.secondary' }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  </Card>
);

export default renderListNode;
