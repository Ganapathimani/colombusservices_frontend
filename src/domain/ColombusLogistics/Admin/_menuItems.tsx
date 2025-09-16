import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faTruckPickup,
  faFileInvoice,
  faTruckFast,
  faUserShield,
  faHandsHelping,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

export type MenuSubItem = {
  name: string;
  link: string;
};

export type MenuItem = {
  title: string;
  icon: React.ReactNode;
  subItems?: MenuSubItem[];
  link?: string;
};

export const menuItems: MenuItem[] = [
  {
    title: 'Super Admin',
    icon: <FontAwesomeIcon icon={faCrown} size="xl" />,
    subItems: [
      { name: 'Create Employee', link: 'create-employee' },
    ],
  },
  {
    title: 'Admin',
    icon: <FontAwesomeIcon icon={faUserShield} size="xl" />,
    subItems: [
      { name: 'Admin', link: 'order-entries' },
      { name: 'Create User', link: 'create-user' },
    ],
  },
  {
    title: 'Assistant Team',
    icon: <FontAwesomeIcon icon={faUsers} size="xl" />,
    subItems: [{ name: 'Assistant Orders', link: 'confirmOrder' }],
  },
  {
    title: 'Pickup Team',
    icon: <FontAwesomeIcon icon={faTruckPickup} size="xl" />,
    subItems: [{ name: 'Order Pickup', link: 'orderPickup' }],
  },
  {
    title: 'LR Team',
    icon: <FontAwesomeIcon icon={faFileInvoice} size="xl" />,
    subItems: [{ name: 'LR', link: 'lorry-receipts' }],
  },
  {
    title: 'Delivery Team',
    icon: <FontAwesomeIcon icon={faTruckFast} size="xl" />,
    subItems: [{ name: 'Delivery', link: 'deliveries' }],
  },
  {
    title: 'Help Center',
    icon: <FontAwesomeIcon icon={faHandsHelping} size="xl" />,
    subItems: [{ name: 'Help Center', link: 'helpCenter' }],
  },
];
