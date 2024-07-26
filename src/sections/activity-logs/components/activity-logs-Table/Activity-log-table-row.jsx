import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import ListItemText from '@mui/material/ListItemText';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';

export function ActivitylogTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const [setShowToken] = useState(false);

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={350}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Jan 19, 2024</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:31
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Ayush Bisen</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              ayush.bisen@pabbly.com
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Team Member Login</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              User
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={700}>
        <Label
          variant="soft"
          color={
            (row.status === 'created' && 'success') ||
            (row.status === 'updated' && 'error') ||
            'success'
          }
        >
          {row.status}
        </Label>
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
            <Box
              component="span"
              sx={{
                color: '#078DEE',
                display: 'inline-block',
                maxWidth: '150px', // Adjust this value as needed
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              6671324303c8782026584551846
             
            </Box>
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
