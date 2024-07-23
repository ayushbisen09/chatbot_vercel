import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/dashboard'));
const Inbox = lazy(() => import('src/pages/dashboard/inbox'));
const Contact = lazy(() => import('src/pages/dashboard/contacts'));
const Addcontact = lazy(() => import('../../sections/contacts/addcontact'));
const AgentQueue = lazy(() => import('src/pages/dashboard/agent_queue'));
const Templates = lazy(() => import('src/pages/dashboard/templates'));
const AddTemplate = lazy(() => import('../../sections/templates/addtemplate'));
const Broadcast = lazy(() => import('src/pages/dashboard/broadcast'));
const Flows = lazy(() => import('src/pages/dashboard/flows'));
const OptInManagement = lazy(() => import('src/pages/dashboard/optInManagement'));
const InboxSettings = lazy(() => import('src/pages/dashboard/inboxsetting'));
const Userattributes = lazy(() => import('src/pages/dashboard/userattributes'));
const Tags = lazy(() => import('src/pages/dashboard/tags'));
const Quickreplies = lazy(() => import('src/pages/dashboard/quickreplies'));
const Teammembers = lazy(() => import('src/pages/dashboard/teammembers'));
const Chatassignmentrules = lazy(() => import('src/pages/dashboard/chatassignmentrules'));
const ConfigureSLAs = lazy(() => import('src/pages/dashboard/configureslas'));
const WhatsAppwidgets = lazy(() => import('src/pages/dashboard/whatsAppwidget'));
const APIWebhooks = lazy(() => import('src/pages/dashboard/api&webhooks'));
const ActivityLogs = lazy(() => import('src/pages/dashboard/activitylogs'));
const Notificationpreferences = lazy(() => import('src/pages/dashboard/notificationpreferences'));
const TimeZone = lazy(() => import('src/pages/dashboard/timezone'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'inbox', element: <Inbox /> },
      { path: 'contact', element: <Contact /> },
      { path: 'contact/addcontact', element: <Addcontact /> },
      { path: 'agentQueue', element: <AgentQueue /> },
      { path: 'template', element: <Templates /> },
      { path: 'template/addtemplate', element: <AddTemplate /> },

      { path: 'broadcast', element: <Broadcast /> },
      { path: 'flows', element: <Flows /> },

      {
        path: 'group',
        children: [
          { element: <OptInManagement />, index: true },
          { path: 'inboxsetting', element: <InboxSettings /> },
          { path: 'userattributes', element: <Userattributes /> },
          { path: 'tags', element: <Tags /> },
          { path: 'quickreplies', element: <Quickreplies /> },
          { path: 'teammembers', element: <Teammembers /> },
          { path: 'chatassignmentrules', element: <Chatassignmentrules /> },
          { path: 'configureslas', element: <ConfigureSLAs /> },
          { path: 'whatsAppwidget', element: <WhatsAppwidgets /> },
          { path: 'apiwebhooks', element: <APIWebhooks /> },
          { path: 'activitylogs', element: <ActivityLogs /> },
          { path: 'notificationpreferences', element: <Notificationpreferences /> },
          { path: 'timezone', element: <TimeZone /> },

          // { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
