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
  gethelp: icon('ic-gethelp'),
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
      {
        title: 'Contacts',
        path: paths.dashboard.contact.root,
        icon: ICONS.contacts,
        children: [
          { title: 'Contact List', path: paths.dashboard.contact.root },
          { title: 'Add Contact', path: paths.dashboard.contact.addcontact },
        ],
      },
      { title: 'Agent Queues', path: paths.dashboard.agentQueue, icon: ICONS.agentqueues },
      {
        title: 'Templates',
        path: paths.dashboard.template.root,
        icon: ICONS.templates,
        children: [
          { title: 'Templates List', path: paths.dashboard.template.root },
          { title: 'Add Template', path: paths.dashboard.template.addtemplate },
        ],
      },
      {
        title: 'Broadcast',
        path: paths.dashboard.broadcast.root,
        icon: ICONS.broadcast,
        children: [
          { title: 'Broadcast List', path: paths.dashboard.broadcast.root },
          { title: 'Add Broadcast', path: paths.dashboard.broadcast.addbroadcast },
        ],
      },
      {
        title: 'Flows',
        path: paths.dashboard.flows.root,
        icon: ICONS.flows,
        children: [
          { title: 'Flow List', path: paths.dashboard.flows.root },
          { title: 'Create Flow', path: paths.dashboard.flows.createflow },
        ],
      },
    ],
  },
  /**
   * Settings
   */
  {
    items: [
      {
        title: 'Settings',
        path: paths.dashboard.group.root,
        icon: ICONS.settings,
        children: [
          { title: 'Opt-In Management', path: paths.dashboard.group.root },
          { title: 'Inbox Settings', path: paths.dashboard.group.inboxsettings },
          { title: 'User Attributes', path: paths.dashboard.group.userattributes },
          { title: 'Tags', path: paths.dashboard.group.tags },
          { title: 'Quick Replies', path: paths.dashboard.group.quickreplies },
          { title: 'Team Members', path: paths.dashboard.group.teammembers },
          { title: 'Chat Assignment Rules', path: paths.dashboard.group.chatassignmentrules },
          { title: 'Configure SLAs', path: paths.dashboard.group.configureslas },
          // { title: 'WhatsApp Widget', path: paths.dashboard.group.whatsAppwidget },
          { title: 'API & Webhooks', path: paths.dashboard.group.apiwebhooks },
          { title: 'Activity Log', path: paths.dashboard.group.activitylogs },
          {
            title: 'Notification Preferences',
            path: paths.dashboard.group.notificationpreferences,
          },
          { title: 'Time Zone', path: paths.dashboard.group.timezone },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Get Help',
        path: paths.dashboard.gethelp,
        icon: ICONS.gethelp,
      },
    ],
  },
];
