import React, { useState } from 'react';

import {
  Box,
  Card,
  Menu,
  Button,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  IconButton,
  useMediaQuery,
} from '@mui/material'; // Ensure this is imported correctly
// import MoreVertIcon from '@mui/icons-material/MoreVert'; // Ensure this is imported correctly
import { Iconify } from 'src/components/iconify'; // Ensure this path is correct
import { DashboardContent } from 'src/layouts/dashboard'; // Ensure this path is correct
// Ensure this path is correct
import { useTheme } from '@emotion/react';

import { Label } from 'src/components/label';
import PageHeader from 'src/components/page-header/page-header';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

const WhatsAppWidgetPage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isOpenList, setOpenList] = useState(null);
  const [copiedQuicksell, setCopiedQuicksell] = useState(false);
  const [copiedSupport, setCopiedSupport] = useState(false);

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
  const handleCopyQuicksell = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedQuicksell(true);
    setTimeout(() => setCopiedQuicksell(false), 2000);
  };
  const handleCopySupport = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedSupport(true);
    setTimeout(() => setCopiedSupport(false), 2000);
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="WhatsApp Widget"
          Subheading="Manage your WhatsApp widget settings."
          link_added="#"
        />

        <Button
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
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
                  <Iconify
                    icon="ph:dots-three-outline-vertical-fill"
                    style={{ width: 18, height: 18 }}
                  />
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
                  <Tooltip
                    title={copiedQuicksell ? 'Copied!' : 'Copy to clipboard'}
                    arrow
                    placement="top"
                  >
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
                      onClick={handleCopyQuicksell}
                    >
                      <Iconify
                        icon={copiedQuicksell ? 'mdi:check' : 'solar:copy-bold'}
                        sx={{
                          width: 20,
                          height: 20,
                          color: copiedQuicksell ? 'success.main' : '#637381',
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
                  <Iconify
                    icon="ph:dots-three-outline-vertical-fill"
                    style={{ width: 18, height: 18 }}
                  />
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
                  <Tooltip
                    title={copiedSupport ? 'Copied!' : 'Copy to clipboard'}
                    arrow
                    placement="top"
                  >
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
                      onClick={handleCopySupport}
                    >
                      <Iconify
                        icon={copiedSupport ? 'mdi:check' : 'solar:copy-bold'}
                        sx={{
                          width: 20,
                          height: 20,
                          color: copiedSupport ? 'success.main' : '#637381',
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
