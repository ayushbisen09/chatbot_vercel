import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { Box, List, Tooltip, Typography, ListItemText, ListItemButton } from '@mui/material';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '6px',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  padding: '8px 16px',
  margin: '2px 0',
  color: '#637381',
  backgroundColor: 'transparent',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '&:hover': {
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
  },
  '&.Mui-selected': {
    color: '#1C252E',
    backgroundColor: 'rgba(145, 158, 171, 0.16)',
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.24)',
    },
  },
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const AGENTS = [
  { name: 'Ayush Bisen', count: 54 },
  { name: 'Ankit Mandli', count: 23 },
  { name: 'Nikhil Patel', count: 54 },
  { name: 'Mukesh Raghuwanshi', count: 54 },
  { name: 'Rajendra Jatav', count: 54 },
];

export default function Agentlist({ onItemSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0); // Ayush Bisen is selected by default

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);

  const filteredAgents = teammembersPageDisabled
    ? AGENTS.filter((agent) => agent.name === 'Ayush Bisen')
    : AGENTS;

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      onItemSelect(index);
    },
    [onItemSelect]
  );

  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
        p: '24px',
        borderRadius: '16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: {
          xs: '100%',
          sm: '100%',
          md: '260px',
        },
      }}
    >
      <Typography fontSize={18} fontWeight={700} mb={1}>
        Team List
      </Typography>

      <List sx={{ width: '100%' }}>
        {filteredAgents.map((agent, index) => (
          <CustomListItemButton
            key={agent.name}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemText
              primary={
                <Tooltip
                  title={` This is agent name : "${agent.name}" and number assigned chats for this agent is: "${agent.count}"`}
                  arrow
                  placement="top"
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        flexGrow: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {agent.name}
                    </span>

                    <span style={{ marginLeft: '8px', flexShrink: 0 }}>({agent.count})</span>
                  </Box>
                </Tooltip>
              }
            />
          </CustomListItemButton>
        ))}
      </List>
    </Box>
  );
}
