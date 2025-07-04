import React from "react";
// import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from "../config/utils";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', module: 'dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users', module: 'users', action: 'read' },
  { text: 'Roles', icon: <SecurityIcon />, path: '/roles', module: 'roles', action: 'read' },
  { text: 'Permissions', icon: <SettingsIcon />, path: '/permissions', module: 'permissions', action: 'read' },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();
  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 64,
          transition: 'width 0.2s ease-in-out',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          if (item.module && item.action && !hasPermission(item.module, item.action)) {
            return null;
          }
          return (<ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
          )
        })}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 