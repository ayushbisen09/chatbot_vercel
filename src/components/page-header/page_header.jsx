
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { Box, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';


export default function PageHeader({ title, Subheading, showButton = true }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const dialog = useBoolean();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        mb: 0,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {Subheading}{' '}
          <Link style={{ color: '#078DEE' }} underline="always" href="#">
            Learn More
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
