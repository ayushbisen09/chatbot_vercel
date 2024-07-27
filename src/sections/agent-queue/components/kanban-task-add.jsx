import Paper from '@mui/material/Paper';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

export function KanbanTaskAdd({ openAddTask }) {
  if (!openAddTask) {
    return null;
  }

  return (
    <ClickAwayListener>
      <div>
        <Paper
          sx={{
            borderRadius: 1.5,
            bgcolor: 'background.default',
            boxShadow: (theme) => theme.customShadows.z1,
          }}
        />
      </div>
    </ClickAwayListener>
  );
}