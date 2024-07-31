import { Helmet } from 'react-helmet-async';

import { Box, Button, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import PageHeader from 'src/components/page-header/page_header';
import { Iconify } from 'src/components/iconify';
import { useTheme } from '@emotion/react';
import { useTabs } from 'src/hooks/use-tabs';
import YourTemplate from 'src/sections/templates/yourtemplates';
import ExploreTemplate from 'src/sections/templates/exploretemplates';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page five | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const basicTabs = useTabs('one');
  const TABS = [
    { value: 'one', icon: <Iconify icon="fluent:book-template-20-filled" width={24} />, label: 'Your Templates',form: <YourTemplate /> },
    { value: 'two', icon: <Iconify icon="fluent:calendar-template-20-filled" width={24} />, label: 'Explore Templates', form:<ExploreTemplate/> },
  ];
  const navigate = useNavigate();

  const navigateTo = () => {
    // Replace '/your-page' with the path you want to navigate to
    navigate('/app/template/addtemplate');
  };

  return (
    <DashboardContent maxWidth='xl'>
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
          title="Templates"
          Subheading="You can Initiate a Conversation with users on WhatsApp using these template messages."
          link_added="#"
        />

        <Button
          onClick={navigateTo}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add New Template
        </Button>
      </Box>
      <Tabs value={basicTabs.value} onChange={basicTabs.onChange} sx={{mt:'40px'}}>
        {TABS.slice(0, 3).map((tab) => (
          <Tab
            key={tab.value}
            icon={tab.icon}
            label={tab.label}
            value={tab.value}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>
      
        {TABS.slice(0, 3).map((tab) =>
          tab.value === basicTabs.value ? <Fragment key={tab.value}>{tab.form}</Fragment> : null
        )}
    </DashboardContent>
  );
}
