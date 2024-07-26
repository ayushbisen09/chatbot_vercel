import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/app/dashboard'));
const Inbox = lazy(() => import('src/pages/app/inbox'));
const Contact = lazy(() => import('src/pages/app/contacts'));
const Addcontact = lazy(() => import('../../sections/contacts/addcontact'));
const AgentQueue = lazy(() => import('src/pages/app/agent_queue'));
const Templates = lazy(() => import('src/pages/app/templates'));
const AddTemplate = lazy(() => import('../../sections/templates/addtemplate'));
const Broadcast = lazy(() => import('src/pages/app/broadcast'));
const Flows = lazy(() => import('src/pages/app/flows'));
const OptInManagement = lazy(() => import('src/pages/app/optInManagement'));
const InboxSettings = lazy(() => import('src/pages/app/inboxsetting'));
const Userattributes = lazy(() => import('src/pages/app/userattributes'));
const Tags = lazy(() => import('src/pages/app/tags'));
const Quickreplies = lazy(() => import('src/pages/app/quickreplies'));
const Teammembers = lazy(() => import('src/pages/app/teammembers'));
const Chatassignmentrules = lazy(() => import('src/pages/app/chatassignmentrules'));
const ConfigureSLAs = lazy(() => import('src/pages/app/configureslas'));
const WhatsAppwidgets = lazy(() => import('src/pages/app/whatsAppwidget'));
const APIWebhooks = lazy(() => import('src/pages/app/api&webhooks'));
const ActivityLogs = lazy(() => import('src/pages/app/activitylogs'));
const Notificationpreferences = lazy(() => import('src/pages/app/notificationpreferences'));
const TimeZone = lazy(() => import('src/pages/app/timezone'));

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
    path: 'app',
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
