import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { menuItems } from './_menuItems';

interface AdminSidePanelProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const roleAccess: Record<string, string[]> = {
  assistant: ['Assistant Team', 'Help Center'],
  pickup: ['Pickup Team', 'Help Center'],
  lr: ['LR Team', 'Help Center'],
  delivery: ['Delivery Team', 'Help Center'],
  admin: [
    'Admin',
  ],
  super_admin: [
    'Super Admin',
    'Help Center',
  ],
};

const getUserRole = (): string => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return 'CUSTOMER';
    }
    const user = JSON.parse(userStr);
    return user?.role?.toLowerCase() ?? 'CUSTOMER';
  } catch {
    return 'CUSTOMER';
  }
};

const AdminSidePanel = ({ onSelectCategory, selectedCategory }: AdminSidePanelProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const userRole = getUserRole();
  const allowedTabs = roleAccess[userRole] || [];

  const filteredMenu = menuItems.filter((item) => allowedTabs.includes(item.title));

  const getActiveItem = useMemo(() => {
    const active = filteredMenu.find(
      (item) => item.link === pathname.replace('/admin/', '')
        || item.subItems?.some((sub) => sub.link === pathname.replace('/admin/', '')),
    );
    return active?.title || '';
  }, [pathname, filteredMenu]);

  useEffect(() => {
    if (getActiveItem && !openSection) {
      setOpenSection(getActiveItem);
    }
  }, [getActiveItem, openSection]);

  const toggleSection = useCallback((title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  }, []);

  const handleItemClick = useCallback(
    (title: string, link: string) => {
      onSelectCategory(title);
      navigate(`/admin/${link}`);
    },
    [navigate, onSelectCategory],
  );

  return (
    <Box sx={{ width: '230px', bgcolor: '#FAFAFA', height: '100vh' }}>
      <List component="nav">
        {filteredMenu.map((item) => {
          const isActive = selectedCategory === item.title || getActiveItem === item.title;
          const isOpen = openSection === item.title;

          return (
            <div key={item.title}>
              {item.subItems ? (
                <>
                  <ListItemButton
                    onClick={() => toggleSection(item.title)}
                    sx={{
                      py: 1,
                      px: 2,
                      borderRadius: '6px',
                      transition: 'all 200ms',
                      bgcolor: isOpen || isActive ? '#EFF6FF' : 'inherit',
                      '&:hover': { bgcolor: '#F3F4F6' },
                    }}
                  >
                    <ListItemIcon sx={{
                      minWidth: '40px',
                      color: isActive || isOpen
                        ? '#002E5D' : '#6B7280',
                    }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={(
                        <Typography
                          noWrap
                          title={item.title}
                          sx={{
                            color: isActive || isOpen ? '#002E5D' : '#374151',
                            fontSize: '15px',
                            fontWeight: isActive || isOpen ? '500' : '400',
                          }}
                        >
                          {item.title}
                        </Typography>
                      )}
                    />
                    <IconButton size="small">
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className={isActive || isOpen ? '#002E5D' : 'text-gray-400'}
                        style={{ fontSize: '12px' }}
                      />
                    </IconButton>
                  </ListItemButton>

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((sub) => (
                        <ListItemButton
                          key={sub.name}
                          onClick={() => handleItemClick(sub.name, sub.link)}
                          sx={{
                            pl: 6,
                            py: 0.5,
                            borderRadius: '6px',
                            transition: 'all 200ms',
                            bgcolor: selectedCategory === sub.name
                              ? '#DBEAFE' : 'inherit',
                            '&:hover': { bgcolor: '#F9FAFB' },
                          }}
                        >
                          <ListItemText
                            primary={(
                              <Typography
                                noWrap
                                title={sub.name}
                                sx={{
                                  color:
                                    selectedCategory === sub.name
                                      ? '#002E5D'
                                      : '#4B5563',
                                  fontSize: '14px',
                                  fontWeight:
                                    selectedCategory === sub.name
                                      ? '500'
                                      : '400',
                                }}
                              >
                                {sub.name}
                              </Typography>
                            )}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton
                  onClick={() => handleItemClick(item.title, item.link || '#')}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: '6px',
                    transition: 'all 200ms',
                    bgcolor: isActive ? '#EFF6FF' : 'inherit',
                    '&:hover': { bgcolor: '#F3F4F6' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '40px', color: isActive ? '#2563EB' : '#6B7280' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={(
                      <Typography
                        noWrap
                        title={item.title}
                        sx={{
                          color: isActive ? '#2563EB' : '#374151',
                          fontSize: '14px',
                          fontWeight: isActive ? '500' : '400',
                        }}
                      >
                        {item.title}
                      </Typography>
                    )}
                  />
                </ListItemButton>
              )}
            </div>
          );
        })}
      </List>
    </Box>
  );
};

export default AdminSidePanel;
