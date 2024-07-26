import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

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
// import { ConfirmDialog } from '../custom-dialog';
const flowNames = [
  "send_offer_message_on_whatsapp",
  "process_customer_inquiry",
  "schedule_appointment",
  "handle_product_return",
  "send_order_confirmation",
  // Add more flow names as needed
];

const secondaryNames = [
  "Adam Zampa",
  "Virat Kohli",
  "Steve Smith",
  "Joe Root",
  "Kane Williamson",
  // Add more secondary names as needed
];


export function FlowBuilderTableRow({ row, selected, onSelectRow,flowIndex  }) {
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
      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">{flowNames[flowIndex % flowNames.length]}</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
            {secondaryNames[flowIndex % secondaryNames.length]}
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
            <Box component="span">Jan 19, 2024</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:31
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={592}>
        <Label
          variant="soft"
          color={
            (row.status === 'active' && 'success') ||
            (row.status === 'inactive' && 'error') ||
            'success'
          }
        >
          {row.status}
        </Label>
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
            <Iconify icon="solar:bill-list-bold" />
            Manage Tags
          </MenuItem>
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:user-block-bold" />
            Block & Opt
          </MenuItem>
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:pen-bold" />
            Edit Contact
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
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to remove this contact?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}
