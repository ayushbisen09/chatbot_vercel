import { useTheme } from '@emotion/react';

import { Box, Button, Table, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page_header';
import ContactList from 'src/sections/contacts/contactlist';
import StatsCards from 'src/components/stats-card/stats-card';
import ContactsTable from 'src/sections/contacts/components/table/table';
import { useState } from 'react';
import BigCard from 'src/sections/contacts/components/bigcard/bigcard';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const listItemsData = [
    {
      name: 'Pabbly Connect List',
      totalContacts: 54,
      optedInContacts: 30,
      optedOutContacts: 24,
    },
    {
      name: 'Pabbly Subscription Billing List',
      totalContacts: 23,
      optedInContacts: 15,
      optedOutContacts: 8,
    },
    {
      name: 'Pabbly Form Builder List',
      totalContacts: 54,
      optedInContacts: 40,
      optedOutContacts: 14,
    },
  ];
  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const currentData = listItemsData[selectedListItem];
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          title="Contacts"
          Subheading="Import contact, create audience & launch campaign, all from one place."
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
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          // justifyContent: 'space-between',
          mt: '40px',
        }}
      >
          <ContactList onItemSelect={handleListItemSelect} />
        <Box sx={{ width: '100%' }}>
          
          <Box
            sx={{
              mt: 0,

              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            {/* WhatsApp Number Added */}

            <StatsCards
              cardtitle="Total contacts"
              cardstats={currentData.totalContacts.toString()}
              icon_name="total-contacts.png"
              icon_color="#FFA92E"
              bg_gradient="#FFA92E"
            />
            {/* WhatsApp Message Quota (Outgoing) */}
            <StatsCards
              cardtitle="Opted-In contacts"
              cardstats={currentData.optedInContacts.toString()}
              icon_name="Opted_in.png"
              icon_color="#12B66A"
              bg_gradient="#12B66A"
            />

            {/* Messaage Quota Used */}
            <StatsCards
              cardtitle="Opted-Out contacts"
              cardstats={currentData.optedOutContacts.toString()}
              icon_name="Opted_out.png"
              icon_color="#F86672"
              bg_gradient="#F86672"
            />
          </Box>
          <BigCard/>
          <ContactsTable/>
        </Box>
      </Box>
    </DashboardContent>
  );
}
