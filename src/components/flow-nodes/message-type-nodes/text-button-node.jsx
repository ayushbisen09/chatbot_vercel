import React, { useState } from 'react';

import {
  Box,
  Card,
  Menu,
  Stack,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  ListItemIcon,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function TextButtonNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'text-button',
      textFields: [{ id: 1 }], // Initialize with one text field for the first card
    },
  ]); // Initialize with one card

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const addTextField = (cardId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          if (card.textFields.length < 3) {
            return {
              ...card,
              textFields: [...card.textFields, { id: card.textFields.length + 1 }],
            };
          }
        }
        return card;
      })
    );
  };

  const deleteTextField = (cardId, fieldId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            textFields: card.textFields.filter((field) => field.id !== fieldId),
          };
        }
        return card;
      })
    );
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addCard = (type) => {
    if (type === 'text-button') {
      setCards([...cards, { id: cards.length + 1, type, textFields: [{ id: 1 }] }]);
    }
    handleClose();
  };

  const handleHoverCardClick = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      const newCard = {
        ...cards[cardIndex],
        id: cards.length + 1, // Assign a new ID to the cloned card
      };
      setCards([...cards, newCard]);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        backgroundColor: '#F4F6F8',
        border: '1px solid transparent',
        overflow: 'visible',
        '&:hover': {
          border: '1px solid #078DEE',
          borderRadius: '16px',
        },
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">Text Buttons</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />
      {cards.map((card, index) => (
        <Card
          key={card.id} // Directly assigning key here
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
          {...other} // Ensure key is not included here
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
              height: 30 + (index === 0 ? 3 : 4) * 30, // Adjust height based on number of icons
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
                <Iconify
                  width={24}
                  icon="heroicons:eye-16-solid"
                  sx={{ color: 'text.secondary' }}
                />
              </IconButton>
            </Tooltip>
            {/* Hide delete icon if it's the first card */}
            {index > 0 && ( // Show delete icon only if it's not the first card
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
      ))}
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick} // Open the menu
        fullWidth
        startIcon={
          <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
        }
      >
        Add Content
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Choose Content Type
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => addCard('text-button')}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="teenyicons:button-outline" />
            Text + Button
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="ant-design:youtube-outlined" />
            Media
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="typcn:th-list-outline" />
            List
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="ion:cube-outline" />
            Single Product Message
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="mdi:shopping-outline" />
            Multi Product Message
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="icon-park-outline:page-template" />
            Template
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="mdi:face-agent" />
            Intervention
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Card>
  );
}
