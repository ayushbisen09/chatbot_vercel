import React, { useState } from 'react';

import {
  Box,
  Card,
  Menu,
  Button,
  MenuItem,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  ListItemIcon,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import renderListNode from './node-cards/list-card';
import renderAddItemCard from './node-cards/add-item-card';
import renderTextButtonNode from './node-cards/text-button-card';
import renderListNodeAddSectionCard from './node-cards/list-node-add-section-card';

const commonCardStyles = {
  boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
  px: 1.5,
  pt: 3.5,
  pb: 2.5,
  mb: 3,
  borderRadius: '16px',
  border: '1px solid transparent',
  overflow: 'visible',
  '&:hover': {
    border: '1px solid #919EAb',
    borderRadius: '16px',
  },
};
const commonCardStylesforsection = {
  px: 1.5,
  pt: 3.5,
  pb: 2.5,
  mb: 3,
  borderRadius: '16px',

  // overflow: 'visible',
};

export default function ListNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [cards, setCards] = useState([{ id: 1, type: 'list-node', textFields: [] }]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const addTextField = (cardId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            textFields: [...card.textFields, { id: card.textFields.length + 1 }],
          };
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
    const newCard = { id: cards.length + 1, type, textFields: [] };
    setCards([...cards, newCard]);
    handleClose();
    if (type === 'add-section') {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === newCard.id ? { ...card, textFields: [{ id: 1 }] } : card
        )
      );
    }
  };

  const addItemCard = (cardId) => {
    const newCard = { id: cards.length + 1, type: 'add-item', textFields: [] };
    setCards([...cards, newCard]);
  };

  const handleHoverCardClick = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      const newCard = {
        ...cards[cardIndex],
        id: cards.length + 1,
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
        title={<Typography variant="h6">List</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton onClick={() => handleHoverCardClick(cards[0].id)}>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />
      <Card sx={commonCardStyles}>
        {/* Render cards using the appropriate render function */}
        {cards.map((card, index) => {
          if (card.type === 'text-button') {
            return renderTextButtonNode(
              card,
              index,
              addTextField,
              deleteTextField,
              deleteCard,
              handleHoverCardClick
            );
          }
          if (card.type === 'list-node') {
            return renderListNode(card, index, deleteTextField, deleteCard, handleHoverCardClick);
          }
          if (card.type === 'add-section') {
            return renderListNodeAddSectionCard(
              card,
              index,
              addTextField,
              deleteTextField,
              deleteCard,
              handleHoverCardClick,
              addItemCard
            );
          }
          if (card.type === 'add-item') {
            return renderAddItemCard(
              card,
              index,
              addTextField,
              deleteTextField,
              deleteCard,
              handleHoverCardClick
            );
          }
          return null;
        })}

        {/* Common Card for adding sections */}
        <Card sx={commonCardStylesforsection}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => addCard('add-section')} // Trigger adding the 'add-section' card
            fullWidth
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Section
          </Button>
        </Card>

        <TextField
          sx={{ p: 0, mb: 2.5 }}
          label="Item Title"
          variant="outlined"
          fullWidth
          placeholder="Enter item title"
          InputProps={{
            style: { textAlign: 'center' },
          }}
        />
      </Card>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick}
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
        <MenuItem onClick={() => addCard('text')}>
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
