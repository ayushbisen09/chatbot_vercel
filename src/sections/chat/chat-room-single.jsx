import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import Select from '@mui/material/Select';
import { CONFIG } from 'src/config-global';

import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip'; // Added import for Chip
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'; // Added import for InputAdornment
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import { useBoolean } from 'src/hooks/use-boolean';

import { CollapseButton } from './styles';

// ----------------------------------------------------------------------

export function ChatRoomSingle({ participant }) {
  const collapse = useBoolean(true);
  const collapseAdditional = useBoolean(false);
  const collapsegeneraldetails = useBoolean(false); // New collapse state
  const collapseUserAttribute = useBoolean(false); // New collapse state
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState(''); // Added state for status
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']); // Initialize with default tags
  const [tagInput, setTagInput] = useState(''); // Added state for tag input
  const [role, setRole] = useState('+91 7489077458');
  const [name, setName] = useState('Ayush Bisen');
  const [avatar, setAvatar] = useState(
    `${CONFIG.site.basePath}/assets/images/chatavatar/Ayush.png`
  );

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Added handler for status change
  };
  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };
  const handleTagInputKeyPress = (event) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const renderInfo = (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Avatar alt={name} src={avatar} sx={{ width: 64, height: 64, mb: 2 }} />
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {role}
      </Typography>
    </Stack>
  );

  const renderContact = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Ticket ID</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          #56435{' '}
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Last Active</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          01 Aug 2022 11:00 AM{' '}
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>24 Hours Status </Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Active{' '}
        </Typography>
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Due date </Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Apr 08, 2024 11:48:29{' '}
        </Typography>
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>SLA </Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          23:04 hours left{' '}
        </Typography>
      </Stack>

      {/* You can add more stacks or content here if needed */}
    </Stack>
  );
  const renderAdditionalInfo = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Email</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          xyz@gmail.com
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>City</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Bhopal
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Order ID</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          #87887656
        </Typography>
      </Stack>
      <stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
          Chat Owner
        </Typography>

        <FormControl fullWidth size="small">
          <InputLabel id="priority-select-label">Chat Owner</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Chat Owner"
            onChange={handlePriorityChange}
          >
            <MenuItem value="Ayush Bisen">Ayush Bisen</MenuItem>
            <MenuItem value="medium">Ankit Mandli</MenuItem>
            <MenuItem value="high">Rajendra Jatav</MenuItem>
          </Select>
        </FormControl>
      </stack>
      <stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>Status</Typography>

        <FormControl fullWidth size="small">
          <InputLabel id="priority-select-label">Status</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Status"
            onChange={handlePriorityChange}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="On Hold">On Hold</MenuItem>
            <MenuItem value="Replied">Replied </MenuItem>
            <MenuItem value="Resolved">Resolved </MenuItem>
            <MenuItem value="Closed">Closed </MenuItem>
          </Select>
        </FormControl>
      </stack>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>Tags</Typography>

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={tags}
          onChange={(event, newValue) => setTags(newValue)}
          inputValue={tagInput}
          onInputChange={handleTagInputChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="soft"
                color="info"
                size="small"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              onClick={handleAddTag}
              {...params}
              variant="outlined"
              size="small"
              // label="Tags" // Added label
              placeholder="+ Add a tag"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="Start">
                    {/* <IconButton  size="medium">
                      <AddIcon style={{ fontSize: 16 }} />
                    </IconButton> */}
                    {/* <Typography sx={{ fontSize: 12 }}>Add a tag</Typography> */}
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiAutocomplete-inputRoot': {
                  minHeight: 'auto',
                  display: 'flex', // Ensures input and adornment stay aligned
                  alignItems: 'center', // Aligns items vertically in the input
                  justifyContent: 'start',
                },
              }}
            />
          )}
        />
      </Stack>

      {/* You can add more stacks or content here if needed */}
    </Stack>
  );

  const rendergeneraldetails = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>First Message</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          01 Aug 2022 11:00 AM{' '}
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>24 Hours Status</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Active
        </Typography>
      </Stack>

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Order ID</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          #87887656
        </Typography>
      </Stack>
      <stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
          Incoming Status
        </Typography>

        <FormControl fullWidth size="small">
          <InputLabel id="priority-select-label">Incoming Status</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Incoming Status"
            onChange={handlePriorityChange}
          >
            <MenuItem value="Ayush Bisen">Ayush Bisen</MenuItem>
            <MenuItem value="medium">Ankit Mandli</MenuItem>
            <MenuItem value="high">Rajendra Jatav</MenuItem>
          </Select>
        </FormControl>
      </stack>
      <stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
          {' '}
          User Status
        </Typography>

        <FormControl fullWidth size="small">
          <InputLabel id="priority-select-label">User Status</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="User Status"
            onChange={handlePriorityChange}
          >
            <MenuItem value="Opt-In">Opt-In</MenuItem>
            <MenuItem value="Opt-OUT">Opt-OUT</MenuItem>
          </Select>
        </FormControl>
      </stack>

      {/* You can add more stacks or content here if needed */}
    </Stack>
  );

  return (
    <>
      {renderInfo}

      <CollapseButton selected={collapse.value} onClick={collapse.onToggle}>
        CHAT INFORMATION
      </CollapseButton>

      <Collapse in={collapse.value}>{renderContact}</Collapse>

      <CollapseButton selected={collapseAdditional.value} onClick={collapseAdditional.onToggle}>
        USER ATTRIBUTE
      </CollapseButton>

      <Collapse in={collapseAdditional.value}>{renderAdditionalInfo}</Collapse>
      <CollapseButton
        selected={collapsegeneraldetails.value}
        onClick={collapsegeneraldetails.onToggle}
      >
        GENERAL DETAILS
      </CollapseButton>
      <Collapse in={collapsegeneraldetails.value}>{rendergeneraldetails}</Collapse>
    </>
  );
}
