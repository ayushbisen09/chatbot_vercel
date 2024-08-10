import React from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  Tooltip,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

const renderCard = (
  card,
  index,
  addTextField,
  deleteTextField,
  deleteCard,
  handleHoverCardClick
) => (
  <Card
    key={card.id}
    sx={{
      position: 'relative',
      boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
      px: 1.5,
      pt: 3.5,
      pb: 2.5,
      mb: 3,
      borderRadius: '8px',
      border: '1px solid transparent',
      overflow: 'visible',
      '&:hover': {
        border: '1px solid #919EAb',
        borderRadius: '16px',
      },
      '&:hover .hoverCard': {
        opacity: 1,
      },
    }}
  >
    <Stack spacing={2}>
      <TextField
        label="Enter message"
        helperText="Add message 1024 letters allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      {card.textFields.map((field) => (
        <Stack key={field.id} spacing={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField label="Enter Text" variant="outlined" fullWidth />
            <IconButton onClick={() => deleteTextField(card.id, field.id)}>
              <Iconify width={20} icon="solar:trash-bin-trash-bold" />
            </IconButton>
            <IconButton onClick={() => addTextField(card.id)}>
              <Iconify width={20} icon="solar:add-circle-bold" />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: -2, px: 1.4, fontSize: '12px' }}
          >
            Enter button text. 20 letters allowed
          </Typography>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => addTextField(card.id)}
        fullWidth
        startIcon={
          <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
        }
      >
        Add Button
      </Button>
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

export default renderCard;
