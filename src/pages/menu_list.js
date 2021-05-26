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
  ClockCircleOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
} from '@ant-design/icons';

export const menu_list = [
  {
    key: 1,
    icon: <PieChartOutlined />,
    component: 'PieChartOne',
    label: 'Dashboard',
    type: 'menu',
    path: '/dashboard',
    wologin: false,
    wlogin: true,
  },
  {
    key: 2,
    icon: <UserOutlined />,
    component: 'users',
    label: 'Users',
    type: 'menu',
    path: '/users',
    wologin: false,
    wlogin: true,
  },
  {
    key: 3,
    icon: <TeamOutlined />,
    component: 'Employees',
    label: 'Employees',
    type: 'menu',
    path: '/employees',
    wologin: false,
    wlogin: true,
  },
  {
    key: 4,
    icon: <CalendarOutlined />,
    component: 'Events',
    label: 'Events',
    type: 'menu',
    path: '/events',
    wologin: false,
    wlogin: true,
  },
  {
    key: 5,
    icon: <TagOutlined />,
    component: 'Packages',
    label: 'Packages',
    type: 'menu',
    path: '/packages',
    wologin: false,
    wlogin: true,
  },
  {
    key: 6,
    icon: <AppstoreAddOutlined />,
    component: 'Blogs',
    label: 'Blogs',
    type: 'menu',
    path: '/blogs',
    wologin: false,
    wlogin: true,
  },

  {
    key: 8,
    icon: <CustomerServiceOutlined />,
    component: 'Complaints',
    label: 'Complaints',
    type: 'menu',
    path: '/complaints',
    wologin: false,
    wlogin: true,
  },
  {
    key: 9,
    icon: <ClockCircleOutlined />,
    label: 'Schedule',
    type: 'menu',
    path: '/schedules',
    wologin: false,
    wlogin: true,
  },
  {
    key: 10,
    icon: <CommentOutlined />,
    label: 'Collection Request',
    type: 'menu',
    path: '/collection_request',
    wologin: false,
    wlogin: true,
  },
  {
    key: 11,
    icon: <RocketOutlined />,
    label: 'Subscriptions',
    type: 'menu',
    path: '/subscriptions',
    wologin: false,
    wlogin: true,
  },
  {
    key: 12,
    icon: <RocketOutlined />,
    label: 'Transactions',
    type: 'menu',
    path: '/transactions',
    wologin: false,
    wlogin: true,
  },
];
