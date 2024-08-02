import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Iconify } from 'src/components/iconify';

export function SelectContactDrawerTableRow({ row, selected }) {
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={500}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Pabbly Connect List</Box>
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
            <Box component="span">233</Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={110}>
        <IconButton
          sx={{
            color: 'success.main',
            marginRight: '8px',
          }}
        >
          <Iconify icon="icon-park-solid:check-one" />
        </IconButton>
        <IconButton
          sx={{
            color: 'error.main',
            marginRight: '8px',
          }}
        >
          <Iconify icon="icon-park-solid:close-one" />
        </IconButton>
        {/* <Label
          sx={{
            color: 'success.main',
            marginRight: '8px',
          }}
          variant="soft"
        >
          AZD
        </Label>
        <Label variant="soft">AZD</Label> */}
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
