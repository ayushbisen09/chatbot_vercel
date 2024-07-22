import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Link,
  TextField,
  Tooltip,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ensure this is imported correctly
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Ensure this is imported correctly
import { Iconify } from 'src/components/iconify'; // Ensure this path is correct
import { DashboardContent } from 'src/layouts/dashboard'; // Ensure this path is correct
import { CONFIG } from 'src/config-global'; // Ensure this path is correct
import { Label } from 'src/components/label';
import { toast } from 'sonner';
import { distance } from 'framer-motion';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

const WhatsAppWidgetPage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isOpenList, setOpenList] = useState(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = () => {
    setOpenList(null);
  };

  const handleOpen = (event) => {
    setOpenList(event.currentTarget);
  };
  // const showToast = () => {
  //   toast.success('Your API Token Copied Successfully!');
  // };
  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // showToast('API Token copied to clipboard');
  };

  const codeSnippet = `<script type="text/javascript" async defer>
(function (w, d, s, o, f, js, fjs) {
  w[o] =
    w[o] ||
    function () {
      (w[o].q = w[o].q || []).push(arguments);
    };
</script>`;
return (
  <DashboardContent maxWidth="xl">
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography sx={{ mt: 4, mb: 1 }} variant="h4">
          WhatsApp Widget
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Manage your WhatsApp widget settings.{' '}
          <Link
            href="https://your-link-here.com"
            target="_blank"
            rel="noopener"
            underline="always"
          >
            Learn More
          </Link>
        </Typography>
      </Box>
      <Button
        sx={{
          marginTop: 5,
          backgroundColor: '#078dee',
          '&:hover': {
            backgroundColor: '#0351ab',
          },
          // Remove unnecessary styles for vertical centering
        }}
        startIcon={
          <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
        }
        size="large"
        variant="contained"
      >
        Add Widget
      </Button>
    </Box>

    <Box sx={{ mt: 4 }}>
      <Card>
        <CardHeader
          title="Widget Name : Quicksell"
          subheader="Created on : Jan 19, 2023 17:19:24"
          sx={{ mb: 3 }}
          action={
            <>
              <Label color="success" variant="soft">
                Active
              </Label>
              <IconButton
                sx={{ ml: 1 }}
                aria-label="more options"
                aria-controls="lock-menu"
                aria-haspopup="true"
                onClick={handleOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="lock-menu"
                anchorEl={isOpenList}
                onClose={handleClose}
                open={Boolean(isOpenList)}
              >
                {OPTIONS.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          }
        />
        <Divider />
          <Box sx={{ mt: 3, p: 3, pt: 0, position: 'relative' }}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={codeSnippet}
              InputProps={{
                endAdornment: (
                  <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow placement="top">
                    <Box
                      component="span"
                      sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        marginTop: 1,
                        marginRight: 1,
                        top: 8,
                        right: 24, // Adjust this value to position the icon left of the scrollbar
                        zIndex: 1,
                      }}
                      onClick={handleCopy}
                    >
                      <Iconify
                        icon={copied ? 'mdi:check' : 'solar:copy-bold'}
                        sx={{
                          width: 20,
                          height: 20,
                          color: copied ? 'success.main' : '#637381',
                        }}
                      />
                    </Box>
                  </Tooltip>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
                '& .MuiInputBase-inputMultiline': {
                  paddingRight: '40px', // Increased to accommodate the copy icon
                  maxHeight: '200px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'grey.400',
                    borderRadius: '4px',
                  },
                },
              }}
            />
          </Box>
        </Card>
        </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader
            title="Widget Name : Support"
            subheader="Created on : Jan 19, 2023 17:19:24"
            sx={{ mb: 3 }}
            action={
              <>
                <Label color="error" variant="soft">
                  Inactive
                </Label>
                <IconButton
                  sx={{ ml: 1 }}
                  aria-label="more options"
                  aria-controls="lock-menu"
                  aria-haspopup="true"
                  onClick={handleOpen}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="lock-menu"
                  anchorEl={isOpenList}
                  onClose={handleClose}
                  open={Boolean(isOpenList)}
                >
                  {OPTIONS.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            }
          />
          <Divider />
          <Box sx={{ mt: 3, p: 3, pt: 0, position: 'relative' }}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={codeSnippet}
              InputProps={{
                endAdornment: (
                  <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow placement="top">
                    <Box
                      component="span"
                      sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        marginTop: 1,
                        marginRight: 1,
                        top: 8,
                        right: 24, // Adjust this value to position the icon left of the scrollbar
                        zIndex: 1,
                      }}
                      onClick={handleCopy}
                    >
                      <Iconify
                        icon={copied ? 'mdi:check' : 'solar:copy-bold'}
                        sx={{
                          width: 20,
                          height: 20,
                          color: copied ? 'success.main' : '#637381',
                        }}
                      />
                    </Box>
                  </Tooltip>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
                '& .MuiInputBase-inputMultiline': {
                  paddingRight: '40px', // Increased to accommodate the copy icon
                  maxHeight: '200px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'grey.400',
                    borderRadius: '4px',
                  },
                },
              }}
            />
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
};

export default WhatsAppWidgetPage;