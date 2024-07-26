import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
let lastAssignedNameIndex = -1;

export function KanbanColumnToolBar({ totalTasks, handleProps }) {
  const predefinedNames = ['Open', 'On Hold', 'Replied'];

  const getUniqueName = () => {
    lastAssignedNameIndex = (lastAssignedNameIndex + 1) % predefinedNames.length;
    return predefinedNames[lastAssignedNameIndex];
  };
  const [name] = useState(getUniqueName());

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Label
          sx={{
            borderRadius: '50%',
            borderColor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
          }}
        >
          {totalTasks}
        </Label>

        <Box sx={{ mx: 1, fontSize: '18px', fontWeight: '600' }}>{name}</Box>

        <IconButton size="small" sx={{ marginLeft: 'auto' }} {...handleProps}>
          <Iconify icon="nimbus:drag-dots" />
        </IconButton>
      </Stack>
    </>
  );
}
