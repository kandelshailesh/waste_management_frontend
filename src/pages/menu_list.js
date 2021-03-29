import {
  PieChartOutlined,
  TeamOutlined,
  CarryOutOutlined,
  PlusOutlined,
  UserOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  TagOutlined,
  KeyOutlined,
  AppstoreAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';

export const menu_list = [
  // {
  //   key: 1,
  //   icon: <PieChartOutlined />,
  //   component: 'PieChartOne',
  //   label: 'Dashboard',
  //   type: 'menu',

  //   path: '/dashboard',
  //   wologin: true,
  //   wlogin: true,
  // },
  {
    key: 2,
    icon: <UserOutlined />,
    component: 'users',
    label: 'Users',
    type: 'menu',
    path: '/users',
    wologin: true,
    wlogin: true,
  },
  {
    key: 3,
    icon: <TeamOutlined />,
    component: 'Employees',
    label: 'Employees',
    type: 'menu',
    path: '/employees',
    wologin: true,
    wlogin: true,
  },
  {
    key: 4,
    icon: <CalendarOutlined />,
    component: 'Events',
    label: 'Events',
    type: 'menu',
    path: '/events',
    wologin: true,
    wlogin: true,
  },
  {
    key: 5,
    icon: <TagOutlined />,
    component: 'Packages',
    label: 'Packages',
    type: 'menu',
    path: '/packages',
    wologin: true,
    wlogin: true,
  },
  {
    key: 6,
    icon: <AppstoreAddOutlined />,
    component: 'Blogs',
    label: 'Blogs',
    type: 'menu',
    path: '/blogs',
    wologin: true,
    wlogin: true,
  },

  {
    key: 8,
    icon: <CommentOutlined />,
    component: 'Complaints',
    label: 'Complaints',
    type: 'menu',
    path: '/complaints',
    wologin: true,
    wlogin: true,
  },
];
