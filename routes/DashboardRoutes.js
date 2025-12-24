import { v4 as uuid } from 'uuid';

import { 
  Home, 
  Package, 
  Truck, 
  Users, 
  Settings,
  FileText,
  PlusCircle,
} from 'react-feather';

export const DashboardMenu = [
  {
    id: uuid(),
    title: 'Dashboard',
    icon: <Home size={20} className="text-primary" />,
    link: '/',
    description: 'Overview and analytics'
  },
  {
    id: uuid(),
    title: 'Tires',
    icon: <Package size={20} className="text-success" />,
    link: '/tires',
    description: 'Manage tire stock',
    //badge: '156',
    submenu: [
      {
        id: uuid(),
        title: 'All Tires',
        icon: <Package size={16} />,
        link: '/tires'
      },
      {
        id: uuid(),
        title: 'Add New Tire',
        icon: <PlusCircle size={16} />,
        link: '/tires/new'
      }
    ]
  },
  {
    id: uuid(),
    title: 'Vehicles',
    icon: <Truck size={20} className="text-info" />,
    link: '/vehicles',
    description: 'Track vehicle tires'
  },
  {
    id: uuid(),
    title: 'Vehicle Tire Planner',
    icon: <Truck size={20} className="text-info" />,
    link: '/vehicle-tire-planner',
    description: 'Vehicle tire planner'
  },
  {
    id: uuid(),
    title: 'Customer Management',
    icon: <Users size={20} className="text-warning" />,
    link: '/customers',
    description: 'Manage customer accounts'
  },
  {
    id: uuid(),
    title: 'Reports',
    icon: <FileText size={20} className="text-teal" />,
    link: '/reports',
    description: 'Generate reports'
  },
  {
    id: uuid(),
    title: 'Settings',
    icon: <Settings size={20} className="text-secondary" />,
    link: '/settings',
    description: 'System configuration'
  }
];

export default DashboardMenu;
