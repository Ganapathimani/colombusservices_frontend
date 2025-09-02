import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileSignature,
  faBookOpen,
  faUserTie,
  faShareNodes,
  faCircleQuestion,
  faHandHoldingHeart,
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
    title: 'Assistant Team',
    icon: <FontAwesomeIcon icon={faFileSignature} size="xl" />,
    subItems: [
      { name: 'Assistant Orders', link: 'assistant/orders' },
    ],
  },
  {
    title: 'Pickup Team',
    icon: <FontAwesomeIcon icon={faBookOpen} size="xl" />,
    subItems: [
      { name: 'Order Pickup', link: 'orderPickup' },
    ],
  },
  {
    title: 'LR Team',
    icon: <FontAwesomeIcon icon={faUserTie} size="xl" />,
    subItems: [
      { name: 'LR', link: 'lrteam' },
    ],
  },
  {
    title: 'Delivery Team',
    icon: <FontAwesomeIcon icon={faShareNodes} size="xl" />,
    subItems: [
      { name: 'Delivery', link: 'deliveries' },
    ],
  },
  {
    title: 'Admin',
    icon: <FontAwesomeIcon icon={faCircleQuestion} size="xl" />,
    subItems: [
      { name: 'Admin', link: 'order-entries' },
      { name: 'Create User', link: 'create-user' },
    ],
  },
  {
    title: 'Help Center',
    icon: <FontAwesomeIcon icon={faHandHoldingHeart} size="xl" />,
    subItems: [
      { name: 'Help Center', link: 'helpCenter' },
    ],
  },
];
