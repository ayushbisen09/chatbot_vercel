import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { TextTemplateTypeDialog } from '../template-type-dialogs/text-template-type-dialog';
import { PreviewTempalteDailog } from './template-preview-dailog/template-preview-dailog';

const templatename = [
  'Classic Layout',
  'Creative Portfolio',
  'Elegant Presentation',
  'Professional Report',
  'Educational Content',
];

const templatetype = ['Text', 'File', 'Audio', 'Video', 'Image'];

export function ChooseTemplateDialogTableRow({ row, selected, onDeleteRow, TemplateIndex }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openTextTemplateDialog, setOpenTextTemplateDialog] = useState(false);

  const handleOpenPreviewDialog = () => {
    setOpenPreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  const handleOpenTextTemplateDialog = () => {
    if (templatetype[TemplateIndex % templatetype.length] === 'Text') {
      setOpenTextTemplateDialog(true);
    }
  };

  const handleCloseTextTemplateDialog = () => {
    setOpenTextTemplateDialog(false);
  };

  const renderPrimary = (
    <TableRow
      hover
      selected={selected}
      onClick={handleOpenTextTemplateDialog}
      style={{ cursor: 'pointer' }}
    >
      <TableCell width={200}>
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
                display: 'inline-block',
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {templatename[TemplateIndex % templatename.length]}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={110}>
        <Label
          variant="soft"
          color={
            (row.status === 'approved' && 'success') ||
            (row.status === 'rejected' && 'error') ||
            'success'
          }
        >
          {row.status}
        </Label>
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
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {templatetype[TemplateIndex % templatetype.length]}
            </Box>
          </Stack>
        </Stack>
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
            <Box component="span">09 Aug 2024</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              11:01 am
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton onClick={handleOpenPreviewDialog}>
          <Iconify icon="solar:eye-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <PreviewTempalteDailog
        open={openPreviewDialog}
        onClose={handleClosePreviewDialog}
        row={row}
      />

      <TextTemplateTypeDialog
        open={openTextTemplateDialog}
        onClose={handleCloseTextTemplateDialog}
      />
    </>
  );
}
