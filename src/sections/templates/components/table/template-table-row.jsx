import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';


import { useBoolean } from 'src/hooks/use-boolean';



import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Checkbox, Divider, Typography } from '@mui/material';
import { ConfirmDialog } from '../custom-dialog';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();



  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell width={500}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Label
              variant="soft"
              color={
                (row.status === 'approved' && 'success') ||
                (row.status === 'pending' && 'warning') ||
                (row.status === 'draft' && 'info') ||
                (row.status === 'rejected' && 'error') ||
                (row.status === 'pending' && 'warning') ||
                (row.status === 'deleted' && 'default') ||
                'success'
              }
            >
              {row.status}
            </Label>

            <Box component="span" sx={{ color: 'text.disabled' }}>
              Apr 08, 2024 06:46:43
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={600}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">send_offer_message_on_whatsapp</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Image
            </Box>
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
            <Box component="span">Marketing</Box>
            {/* <Box component="span" sx={{ color: 'text.disabled' }}>
              Allowed
            </Box> */}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={110}>
        <Stack
          sx={{
            typography: 'body2',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          <Label color="success" variant="soft">
            Good
          </Label>
          
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  

  return (
    <>
      {renderPrimary}

      

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:copy-bold" />
            Duplicate Template
          </MenuItem>
          

          <Divider style={{ borderStyle: 'dashed' }} />
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Remove"
        content="Are you sure want to remove this template? (Removed template will go to deleted section)"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Remove
          </Button>
        }
      />
    </>
  );
}
