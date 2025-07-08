// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'users-management',
      title: 'Users Management',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'users',
          title: 'All Users',
          type: 'item',
          url: '/users',
          permission: { module: 'users', action: 'read' }
        },
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          url: '/roles',
          permission: { module: 'roles', action: 'read' }
        }
      ]
    }
  ]
};

export default pages;
