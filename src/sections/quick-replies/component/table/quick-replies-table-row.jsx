import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

export function QuickRepliesTableRow({
  selected,
  quickrepliesIndex,
}) {
 
  const popover = usePopover();


  const quickreplies = [
    '/Hello',
    '/Product Info',
    '/Return Policy',
    '/Speak to a Representative',
    '/Hey',
    // Add more flow names as needed
  ];

  const quickrepliescreatedby = [
    'Created by: Ayush Bisen',
    'Created by: Ankit Mandli',
    'Created by: Nikhil Patel',
    'Created by: Rajendra Jatav',
    'Created by: Sarthak Tiwari',
    // Add more flow names as needed
  ];

  const quickrepliesmessage = [
    '	Hello User this is Quick Reply.',
    'Hi, thanks for contacting us.',
    'Hi there! Welcome to Magnet Brains Soft. Tech. Let me know if you need help with anything.',
    'Your order is currently being processed. You’ll receive an update once it ships.',
    'For more information on this item, please visit the product page or let me know how I can help',
    // Add more flow names as needed
  ];

  const quickrepliestypes = [
    'Image',
    'Text',
    'Audio',
    'Video',
    'File',
    // Add more flow names as needed
  ];

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="WhatsApp number you have added." arrow placement="top">
              <Box component="span">{quickreplies[quickrepliesIndex % quickreplies.length]}</Box>
            </Tooltip>
            <Tooltip title="Phone number ID of your WhatsApp Number." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {quickrepliescreatedby[quickrepliesIndex % quickrepliescreatedby.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Webhook URL for incoming messages of your WhatsApp Number."
              arrow
              placement="top"
            >
              <Box component="span">
                {quickrepliesmessage[quickrepliesIndex % quickrepliesmessage.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title="Webhook URL for incoming messages of your WhatsApp Number."
              arrow
              placement="top"
            >
              <Box component="span">
                {quickrepliestypes[quickrepliesIndex % quickrepliestypes.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click to see options." arrow placement="top">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
