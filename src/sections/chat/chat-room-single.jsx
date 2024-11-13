import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import { Button, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { CollapseButton } from './styles';

export function ChatRoomSingle({ participant }) {
  const collapse = useBoolean(true);
  const collapseAdditional = useBoolean(false);
  const collapsegeneraldetails = useBoolean(false);
  const collapseUserAttribute = useBoolean(false);

  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('open');
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');
  const [role, setRole] = useState('+91 7489077458');
  const [name, setName] = useState('Ayush Bisen');
  const [avatar, setAvatar] = useState(
    `${CONFIG.site.basePath}/assets/images/chatavatar/Ayush.png`
  );

  const [teamMember, setteamMember] = useState('');
  const [incomingStatus, setIncomingStatus] = useState('allowed');
  const [userStatus, setUserStatus] = useState('');

  // New state for user attributes
  const [userAttributes, setUserAttributes] = useState({
    email: 'xyz@gmail.com',
    city: 'Bhopal',
    pincode: '481331',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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

  const handleteamMemberChange = (event) => {
    setteamMember(event.target.value);
  };

  const handleIncomingStatusChange = (event) => {
    setIncomingStatus(event.target.value);
  };

  const handleUserStatusChange = (event) => {
    setUserStatus(event.target.value);
  };

  // New function to handle editing user attributes
  const handleEditUserAttributes = () => {
    setIsEditing(!isEditing);
  };

  // New function to handle changes in user attributes
  const handleUserAttributeChange = (attribute, value) => {
    setUserAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);

  const renderContact = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Tooltip title="This is the last active status of the contact" arrow placement="top">
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Last Active</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          01 Aug 2022 11:00 AM{' '}
        </Typography>
      </Stack>

      <Stack>
        <Tooltip
          title="This is the 24 hour status it is active or not of this contact"
          arrow
          placement="top"
        >
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>24 Hours Status</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Active{' '}
        </Typography>
      </Stack>
      <Stack>
        <Tooltip title="This is the due date of this contact" arrow placement="top">
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Due date</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          Apr 08, 2024 11:48:29{' '}
        </Typography>
      </Stack>
      <Stack>
        <Tooltip
          title="This is the service level aggrement of this contact it indicates how many time left for this contact that SLA's expires"
          arrow
          placement="top"
        >
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>SLA</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          23:04 hours left{' '}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderAdditionalInfo = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Tooltip title="Click here to edit the attributes" arrow placement="top">
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            sx={{ width: 32, mb: 1 }}
            onClick={handleEditUserAttributes}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Tooltip>
      </Stack>
      {['email', 'city', 'pincode'].map((attribute) => (
        <Stack key={attribute}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>
            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
          </Typography>
          {isEditing ? (
            <TextField
              size="small"
              value={userAttributes[attribute]}
              onChange={(e) => handleUserAttributeChange(attribute, e.target.value)}
              sx={{ fontSize: '12px' }}
            />
          ) : (
            <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
              {userAttributes[attribute]}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );

  const rendergeneraldetails = (
    <Stack spacing={1} sx={{ px: 2, py: 2.5 }}>
      <Stack>
        <Tooltip title="This shows when this contact send his first message." arrow placement="top">
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>First Message</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          01 Aug 2022 11:00 AM{' '}
        </Typography>
      </Stack>

      <Stack>
        <Tooltip title="This is the Order ID of this contact." arrow placement="top">
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular' }}>Order ID</Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '12px', fontWeight: 'regular', color: 'text.secondary' }}>
          #87887656
        </Typography>
      </Stack>

      {!teammembersPageDisabled && (
        <Stack>
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
            Team Member
          </Typography>
          <Tooltip title="Click here to assign this contact to team member" arrow placement="top">
            <FormControl fullWidth size="small">
              <InputLabel id="chat-owner-select-label">Team Member</InputLabel>
              <Select
                labelId="chat-owner-select-label"
                id="chat-owner-select"
                value={teamMember}
                label="Team Member"
                onChange={handleteamMemberChange}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="Ayush Bisen">Ayush Bisen</MenuItem>
                <MenuItem value="Ankit Mandli">Ankit Mandli</MenuItem>
                <MenuItem value="Rajendra Jatav">Rajendra Jatav</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Stack>
      )}

      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>Status</Typography>
        <Tooltip
          title="Click here to set the status of the chat either it is open, closed, resolved, replied, on hold ."
          arrow
          placement="top"
        >
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
              <MenuItem value="Replied">Replied</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>Tags</Typography>
        <Tooltip title="This is the tags that is assign this contact." arrow placement="top">
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
                placeholder="+ Add a tag"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <InputAdornment position="start" />,
                }}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  },
                }}
              />
            )}
          />
        </Tooltip>
      </Stack>

      {!teammembersPageDisabled && (
        <Stack>
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
            Incoming Status
          </Typography>

          <Tooltip
            title="This shows the incoming status of this contact this include allowed and blocked."
            arrow
            placement="top"
          >
            <FormControl fullWidth size="small">
              <InputLabel id="incoming-status-select-label">Incoming Status</InputLabel>
              <Select
                labelId="incoming-status-select-label"
                id="incoming-status-select"
                value={incomingStatus}
                label="Incoming Status"
                onChange={handleIncomingStatusChange}
              >
                <MenuItem value="allowed">Allowed</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Stack>
      )}

      {!teammembersPageDisabled && (
        <Stack>
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular', mb: '10px' }}>
            User Status
          </Typography>

          <Tooltip
            title="This shows the user status of this contact this include opt-in and opt-out."
            arrow
            placement="top"
          >
            <FormControl fullWidth size="small">
              <InputLabel id="user-status-select-label">User Status</InputLabel>
              <Select
                labelId="user-status-select-label"
                id="user-status-select"
                value={userStatus}
                label="User Status"
                onChange={handleUserStatusChange}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="Opt-In">Opt-In</MenuItem>
                <MenuItem value="Opt-Out">Opt-Out</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );

  return (
    <>
      {/* {renderInfo} */}
      <Tooltip title="Click here to see chat information of this contact" arrow placement="top">
        <CollapseButton selected={collapse.value} onClick={collapse.onToggle}>
          CHAT INFORMATION
        </CollapseButton>
      </Tooltip>

      <Collapse in={collapse.value}>{renderContact}</Collapse>
      <Tooltip title="Click here to see user attributes of this contact" arrow placement="top">
        <CollapseButton selected={collapseAdditional.value} onClick={collapseAdditional.onToggle}>
          USER ATTRIBUTE
        </CollapseButton>
      </Tooltip>

      <Collapse in={collapseAdditional.value}>{renderAdditionalInfo}</Collapse>
      <Tooltip title="Click here to see general details of this contact" arrow placement="top">
        <CollapseButton
          selected={collapsegeneraldetails.value}
          onClick={collapsegeneraldetails.onToggle}
        >
          GENERAL DETAILS
        </CollapseButton>
      </Tooltip>

      <Collapse in={collapsegeneraldetails.value}>{rendergeneraldetails}</Collapse>
    </>
  );
}
