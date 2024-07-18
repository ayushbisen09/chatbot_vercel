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
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Checkbox, Typography } from '@mui/material';
import { ConfirmDialog } from '../custom-dialog';

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
            <Label
              variant="soft"
              color={
                (row.status === 'opted-in' && 'success') ||
                (row.status === 'opted-out' && 'error') ||
                'success'
              }
            >
              {row.status}
            </Label>

            <Box component="span" sx={{ color: 'text.disabled' }}>
              Apr 08, 2024 06:46:43A
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
            <Box component="span">+91 9234567890</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Sophia kumar Patel
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
            <Box component="span">Imported Manually</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Allowed
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
          <Label color="success" variant="soft">
            Active
          </Label>
          <Box component="span" sx={{ color: 'text.disabled' }}>
            Apr 08, 2024 06:46:43
          </Box>
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
            <Stack
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="User Attribute - Value"
                primaryTypographyProps={{ typography: 'body2' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr:'5px'
                    // Negative margin to remove any gap
                  }}
                >
                  city-Bhopal
                </Typography>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr:'5px'
                    // Negative margin to remove any gap
                  }}
                >
                  ,
                </Typography>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  email-abc@gmail.com
                </Typography>
              </Box>
            </Stack>
            

           
            <Stack
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="Tags"
                primaryTypographyProps={{ typography: 'body2' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr:'5px'
                    // Negative margin to remove any gap
                  }}
                >
                  Purchase
                </Typography>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr:'5px'
                    // Negative margin to remove any gap
                  }}
                >
                  ,
                </Typography>
                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Pabbly Connect
                </Typography>
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
