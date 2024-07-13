import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  inbox: icon('ic-inbox'),
  contacts: icon('ic-contacts'),
  agentqueues: icon('ic-agentqueues'),
  templates: icon('ic-template'),
  broadcast: icon('ic-broadcast'),
  flows: icon('ic-flows'),
  settings: icon('ic-settings'),
  job: icon('ic-job'),
  // blog: icon('ic-blog'),
  // chat: icon('ic-chat'),
  // mail: icon('ic-mail'),
  // user: icon('ic-user'),
  // file: icon('ic-file'),
  // lock: icon('ic-lock'),
  // tour: icon('ic-tour'),
  // order: icon('ic-order'),
  // label: icon('ic-label'),
  // blank: icon('ic-blank'),
  // kanban: icon('ic-kanban'),
  // folder: icon('ic-folder'),
  // course: icon('ic-course'),
  // banking: icon('ic-banking'),
  // booking: icon('ic-booking'),
  // invoice: icon('ic-invoice'),
  // product: icon('ic-product'),
  // calendar: icon('ic-calendar'),
  // disabled: icon('ic-disabled'),
  // external: icon('ic-external'),
  // menuItem: icon('ic-menu-item'),
  // ecommerce: icon('ic-ecommerce'),
  // analytics: icon('ic-analytics'),
  // dashboard: icon('ic-dashboard'),
  // parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview 6.0.0',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Inbox', path: paths.dashboard.inbox, icon: ICONS.inbox },
      { title: 'Contacts', path: paths.dashboard.three, icon: ICONS.contacts },
      { title: 'Agent Queues', path: paths.dashboard.four, icon: ICONS.agentqueues },
      { title: 'Templates', path: paths.dashboard.three, icon: ICONS.templates },
      { title: 'Broadcast', path: paths.dashboard.three, icon: ICONS.broadcast },
      { title: 'Flows', path: paths.dashboard.three, icon: ICONS.flows },
    ],
  },
  /**
   * Management
   */
  {
    // subheader: 'Management',
    items: [
      {
        title: 'Settings',
        path: paths.dashboard.group.root,
        icon: ICONS.settings,
        children: [
          { title: 'Opt-In Management', path: paths.dashboard.group.root },
          { title: 'Inbox Settings', path: paths.dashboard.group.five },
          { title: 'User Attributes', path: paths.dashboard.group.six },
          { title: 'Tags', path: paths.dashboard.group.six },
          { title: 'Quick Replies', path: paths.dashboard.group.six },
          { title: 'Team Members', path: paths.dashboard.group.six },
          { title: 'Chat Assignment Rules', path: paths.dashboard.group.six },
          { title: 'Configure SLAs', path: paths.dashboard.group.six },
          { title: 'WhatsApp Widget', path: paths.dashboard.group.six },
          { title: 'API & Webhooks', path: paths.dashboard.group.six },
          { title: 'Activity Log', path: paths.dashboard.group.six },
          { title: 'Notification Preferences', path: paths.dashboard.group.six },
          { title: 'Time Zone', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
