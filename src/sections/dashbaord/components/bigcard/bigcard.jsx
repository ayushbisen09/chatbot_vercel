import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ModalVideo from 'react-modal-video';

import {
  Box,
  Card,
  List,
  Button,
  ListItem,
  CardMedia,
  Typography,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { WhatsAppDialog } from 'src/sections/dashbaord/hooks/add-whatsApp-number';




export default function BigCard(sx, ...other) {
  const videoId = 'CoIfgN0tfhE'; // Repalace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Pabbly Broadcast Card.png`;
  const [isOpen, setOpen] = useState(false);

  const dialog = useBoolean();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

        backgroundColor: 'common.white',
        mt: '24px',
        pt: 5,
        pb: 5,
        pr: 3,
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        height: { md: 1 },
        position: 'relative',
        pl: { xs: 3, md: 5 },
        alignItems: { xs: 'left', md: 'left' },
        justifyContent: { xs: 'left', md: 'left' },
        color: 'common.white',
        textAlign: { xs: 'left', md: 'left' },
        flexDirection: { xs: 'column', md: 'row' },

        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
          Points To Remember
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'grey.600',

            ...(true && { mb: 3 }), // Example conditional margin bottom
          }}
        >
          <List sx={{ color: 'grey.600' }}>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Choose a WhatsApp Business API provider that suits your needs and requirements."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Familiarize yourself with the requirements for using the WhatsApp Business API."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Apply for access to the WhatsApp Business API through your chosen provider."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Review and agree to the terms and conditions set by WhatsApp and your chosen provider."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Verify your business and phone number with WhatsApp."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Work with your chosen provider to complete the setup process. "
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Iterate on your messaging strategies to improve engagement and achieve your business goals."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  component: 'div',
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary={
                  <>
                    Stay informed about updates and changes to policies that may affect your use of
                    the API.{' '}
                    <Link href="#" underline="always">
                      Learn more
                    </Link>
                  </>
                }
              />
            </ListItem>
            {/* Add more list items as needed */}
          </List>
        </Typography>
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          size="large"
          variant="outlined"
          color="primary"
        >
          Add WhatsApp Number
        </Button>
        <WhatsAppDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>

      {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
      <Box
        sx={{
          marginRight: '16px', // Default margin-right for all screen sizes
          ...(isMobile && {
            marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
          }),
        }}
      >
        <Card>
          <CardMedia
            component="img"
            src={coverSrc}
            title="Cover Image"
            style={{
              height: '100%',
              width: '100%',
              cursor: 'pointer',
              objectFit: 'contain',
            }}
            onClick={() => setOpen(true)}
          />
        </Card>
        <ModalVideo
          channel="youtube"
          autoplay="true"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Box>
  );
}
