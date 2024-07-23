import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
  Tab,
  Tabs,
} from '@mui/material';
import { Fragment } from 'react';
import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page_header';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';

import AddSingleContact from 'src/sections/contacts/addsinglecontact';
import AddBulkContact from 'src/sections/contacts/addbulkcontact';

export default function AddContact() {
  const basicTabs = useTabs('one');
  const TABS = [
    { value: 'one', icon: <Iconify icon="solar:user-id-bold" width={24} />, label: 'Add Single Contact',form: <AddSingleContact /> },
    { value: 'two', icon: <Iconify icon="solar:bill-list-bold" width={24} />, label: 'Add Bulk Contact', form:<AddBulkContact/> },
  ];

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader title="Add Contact" Subheading="Add contact with attributes." link_added="#" />
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
