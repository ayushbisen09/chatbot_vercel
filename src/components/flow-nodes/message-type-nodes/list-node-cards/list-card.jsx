import React from 'react';
import { useDispatch } from 'react-redux';

import { Card, Stack, TextField } from '@mui/material';

import { updateBody,updateHeader,updateFooter  } from 'src/redux/slices/listNodeMessagePreviewSlice';

const RenderListNode = (
  card,
  index,
  deleteTextField,
  deleteCard,
  handleHoverCardClick
) => {
  const { id } = card;
  const dispatch = useDispatch();

  return (
    <Card
      key={id}
      sx={{
        px: 1.5,
        pt: 3.5,
        pb: 2.5,
        mb: 3,
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Enter Header"
          helperText="Enter header here only  20 letter allowed."
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          onChange={(e) => dispatch(updateHeader(e.target.value))}
        />
        <TextField
          label="Enter Body"
          helperText="Enter body here only  1024 letter allowed."
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => dispatch(updateBody(e.target.value))}

        />
        <TextField
          label="Enter Footer"
          helperText="Enter footer here only  60 letter allowed."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={(e) => dispatch(updateFooter(e.target.value))}
        />
      </Stack>

      {/* Hover Card */}
    </Card>
  );
};

export default RenderListNode;
