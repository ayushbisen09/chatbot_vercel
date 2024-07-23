import styled from '@emotion/styled';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';


export default function TemplateList({ onItemSelect }) {
  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '6px',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    padding: '8px 16px', // Adjust as needed
    margin: '2px 0', // Add a small margin to prevent layout shifts

    // Unselected state
    color: '#637381',
    backgroundColor: 'transparent',

    '& .MuiListItemIcon-root': {
      color: '#637381',
      transition: 'color 0.2s ease-in-out',
      minWidth: '24px', // Set a fixed minimum width for the icon
      width: '24px', // Set a fixed width for the icon
      height: '24px', // Set a fixed height for the icon
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px', // Add some space between icon and text
    },

    '& .MuiListItemText-root': {
      margin: 0, // Remove default margins
    },

    // Hover state
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
    },

    // Selected state
    '&.Mui-selected': {
      color: '#1C252E',
      backgroundColor: 'rgba(145, 158, 171, 0.16)',
      '&:hover': {
        backgroundColor: 'rgba(145, 158, 171, 0.24)',
      },
      '& .MuiListItemIcon-root': {
        color: '#1C252E',
      },
    },

    // Prevent text selection on rapid clicks
    userSelect: 'none',

    // Ensure consistent layout
    display: 'flex',
    alignItems: 'center',
  }));
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      onItemSelect(index); // Pass the selected index to the parent
    },
    [onItemSelect]
  );
  const dialog = useBoolean();

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '303px',
        },
      }}
    >
      
     
      <List sx={{ width: '100%' }}>
        {/* Pabbly Connect List */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Iconify icon="solar:file-text-bold" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
              <div
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
                  Pabbly Connect List
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Pabbly Subscription Billing List */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Iconify icon="solar:file-text-bold" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
              <div
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
                  Pabbly Subscription Billing List
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (23)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Pabbly Form Builder List */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Iconify icon="solar:file-text-bold" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
              <div
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
                  Pabbly Form Builder List
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>
      </List>
    </Box>
  );
}
