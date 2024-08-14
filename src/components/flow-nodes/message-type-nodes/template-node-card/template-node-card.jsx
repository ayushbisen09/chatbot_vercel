import React from 'react';
import {
  Box,
  Card,
  Stack,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

const renderTemplateNode = (
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
      borderRadius: '12px',
      border: '1px solid transparent',
      overflow: 'visible',
      '&:hover': {
        border: '1px solid #919EAb',
        borderRadius: '12px',
      },
      '&:hover .hoverCard': {
        opacity: 1,
      },
    }}
  >
    <Stack spacing={2}>
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => addTextField(card.id)}
        fullWidth
        startIcon={
          <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
        }
      >
        Add Template
      </Button>
    </Stack>
    {/* Hover Card */}
    <Box
      className="hoverCard"
      sx={{
        position: 'absolute',
        top: 17,
        right: -37,
        width: '48px',
      
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
        p: 1,
      }}
    >
      <Tooltip title="Add">
        <IconButton onClick={() => handleHoverCardClick(card.id)}>
          <Iconify
            width={20}
            icon="eva:plus-fill"
            sx={{ color: 'text.secondary' }}
          />
        </IconButton>
      </Tooltip>

      {/* Render delete icon only if there is more than one card */}
      {index > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteCard(card.id)}>
            <Iconify
              width={20}
              icon="solar:trash-bin-trash-bold"
              sx={{ color: 'text.secondary' }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  </Card>
);

export default renderTemplateNode;
