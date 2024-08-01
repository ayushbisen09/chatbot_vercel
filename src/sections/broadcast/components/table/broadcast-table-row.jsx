import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Divider, Checkbox, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../../hook/confirm-dialog';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [showToken, setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Test1232</Box>
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
            <Box component="span">send_offer_message_on_whatsapp</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Manual Broadcast
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

      <TableCell width={110}>
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
              (row.status === 'live' && 'success') ||
              (row.status === 'sent' && 'warning') ||
              (row.status === 'scheduled' && 'info') ||
              'success'
            }
          >
            {row.status}
          </Label>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            <Stack>
              <Box sx={{ p: '12px 24px 12px 24px' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Receivers List
                </Typography>
                <Typography sx={{ mb: '2px' }} fontSize="14px" color="text.secondary">
                  <Box component="span" fontWeight="medium" color="text.primary">
                    Included:
                  </Box>{' '}
                  Pabbly Connect List, Pabbly Subscription Billing, Pabbly Support.
                </Typography>
                <Typography fontSize="14px" color="text.secondary">
                  <Box component="span" fontWeight="medium" color="text.primary">
                    Excluded:
                  </Box>{' '}
                  Pabbly Email Marketing, Pabbly Form Builder.
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: '12px 24px 12px 24px' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Stats
                </Typography>
                <Stack spacing={0.5}>
                  {' '}
                  {/* 0.5 * 8px = 4px gap, adjust to 2px using 0.25 */}
                  {[
                    { label: 'Sent', value: '700 (20%)' },
                    { label: 'Delivered', value: '565 (45%)' },
                    { label: 'Read', value: '565 (45%)' },
                    { label: 'Clicked', value: '122 (04%)' },
                    { label: 'Replied', value: '122 (04%)' },
                    { label: 'Replied', value: '700 (20%)' },
                  ].map((item, index) => (
                    <Typography key={index} fontSize="14px" color="text.primary">
                      {item.label}:{' '}
                      <Box component="span" color="text.secondary">
                        {item.value}
                      </Box>
                    </Typography>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ p: '6px 24px 24px 24px' }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                    Add to Existing list
                  </Button>
                  <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                    Add to New list
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

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

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to remove this contact?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
