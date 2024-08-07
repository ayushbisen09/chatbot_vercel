import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import GetHelpBigCard from 'src/sections/get-help/components/big-card';
import { VideoPlayList } from 'src/sections/get-help/components/video-playlist';

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
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
          title="Help & Tutorials"
          Subheading="Tell us about your problem, and we’ll find you a solution."
          link_added="#"
        />
      </Box>

      <GetHelpBigCard />
      <VideoPlayList />

      {/* Table */}
    </DashboardContent>
  );
}
