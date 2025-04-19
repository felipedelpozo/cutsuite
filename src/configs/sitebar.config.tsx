import {
  IconCalendarWeek,
  IconDashboard,
  IconHelp,
  IconSettings,
} from '@tabler/icons-react';

export const sitebarConfig = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Calendar',
      url: '/dashboard/calendar',
      icon: IconCalendarWeek,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
  ],
};
