
import { CONFIG } from 'src/config-global';
import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page_header';

import { ChatView } from 'src/sections/chat/view';

const metadata = { title: `Inbox | Dashboard - ${CONFIG.site.name}` };

// ----------------------------------------------------------------------


export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Inbox"
        Subheading="Connecting Brands and Customers through WhatsApp Engagement and Marketing."
        showButton={false}
      />
      <ChatView />


















    </DashboardContent>
  );
}
