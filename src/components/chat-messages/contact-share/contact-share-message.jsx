import React from 'react';
import { Box, Card, IconButton, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { Iconify } from 'src/components/iconify'; // Adjust your Iconify import as needed

const contacts = ['Ayush Bisen']; // Example contact names

export default function ShareContact() {
  return (
    <Box
      sx={{
        width: '320px',
        p: 2,
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
      }}
    >
      {contacts.map((contact, index) => (
        <React.Fragment key={index}>
          <Typography
            sx={{
              fontSize: '16px',
              position: 'absolute',
              left: '-10px',
              top: '100%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              border: '1px solid #E6E6E6',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              p: 0.1,
            }}
          >
            🙏
          </Typography>
          <Box>
            <Typography>{contact}</Typography>
          </Box>

         <Divider sx={{ my: 1 }} />
        </React.Fragment>
      ))}

      {/* Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="iconamoon:arrow-down-2-bold" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is where you can add additional details or actions related to the contacts.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
