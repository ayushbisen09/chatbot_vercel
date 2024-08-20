import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

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
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="WhatsApp number you have added. " arrow placement="top">
              <Box component="span">+91 9425124879</Box>
            </Tooltip>
            <Tooltip title="Phone number ID of your WhatsApp Number." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Phone Number ID: 117359445455733
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
              <Box component="span">https://chatflow.pabbly.com/65e80c31e88b/5b654444</Box>
            </Tooltip>
            <Tooltip
              title="WhatsApp Business Account ID of your WhatsApp Number."
              arrow
              placement="top"
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                WhatsApp Business Account ID: 117359445455733
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={137}>
        <ListItemText
          primary={
            <Tooltip title="Date when your WhatsApp number added." arrow placement="top">
              <span>{fDate(row.createdAt)}</span>
            </Tooltip>
          }
          secondary={
            <Tooltip title="Time when your WhatsApp number added." arrow placement="top">
              <span>{fTime(row.createdAt)}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell width={110}>
        {row.status === 'active' ? (
          <Tooltip title="This WhatsApp number is currently active" arrow placement="top">
            <Label variant="soft" color="success">
              {row.status}
            </Label>
          </Tooltip>
        ) : row.status === 'inactive' ? (
          <Tooltip title="This WhatsApp number is currently inactive." arrow placement="top">
            <Label variant="soft" color="error">
              {row.status}
            </Label>
          </Tooltip>
        ) : (
          <Label variant="soft" color="success">
            {row.status}
          </Label>
        )}
      </TableCell>
      <TableCell width={140} align="right">
        <Tooltip title="This WhatsApp number is currently inactive." arrow placement="top">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              lineHeight: { lg: '14px', md: '14px', xs: '14px' },
              height: { lg: '40px', md: '40px', xs: '40px' }, // Default height
            }}
          >
            Access Inbox
          </Button>
        </Tooltip>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click to see more details." arrow placement="top">
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
            sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
          >
            <Iconify icon="eva:arrow-ios-downward-fill" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Click to see options." arrow placement="top">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
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
              direction="row"
              gap={2}
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip title="Verification token of your WhatsApp Number." arrow placement="top">
                <span>
                  <ListItemText
                    primary={`Verification Token: ${showToken ? '4545656565' : '●●●●●●●●●'}`}
                    primaryTypographyProps={{ typography: 'body2' }}
                  />
                </span>
              </Tooltip>
              <Tooltip title="Click here to show/hide verification token." arrow placement="top">
                <IconButton onClick={handleToggleToken}>
                  <Iconify icon={showToken ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip title="Privacy policy URL of your website." arrow placement="top">
                <span>
                  <ListItemText
                    primary={
                      <Typography component="div" variant="body2">
                        Privacy Policy URL:{' '}
                        <Link
                          style={{ color: '#078DEE' }}
                          underline="always"
                          href="https://www.pabbly.com/privacy-policy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          https://www.pabbly.com/privacy-policy/
                        </Link>
                      </Typography>
                    }
                  />
                </span>
              </Tooltip>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip title=" Terms of service URLL of your website." arrow placement="top">
                <span>
                  <ListItemText
                    primary={
                      <Typography component="div" variant="body2">
                        Terms of Service URL:{' '}
                        <Link
                          href="https://www.pabbly.com/terms-conditions/"
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="always"
                          sx={{ color: '#078DEE' }}
                        >
                          https://www.pabbly.com/terms-conditions/
                        </Link>
                      </Typography>
                    }
                  />
                </span>
              </Tooltip>
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
        <Tooltip title="This will remove this WhatsApp number" arrow placement="top">

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
          </Tooltip>

        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
