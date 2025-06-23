import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  enabled: boolean;
}

const mockPermissions: Permission[] = [
  {
    id: 'users:create',
    name: 'Create Users',
    description: 'Allow creating new users',
    module: 'Users',
    enabled: true,
  },
  {
    id: 'users:edit',
    name: 'Edit Users',
    description: 'Allow editing existing users',
    module: 'Users',
    enabled: true,
  },
  {
    id: 'users:delete',
    name: 'Delete Users',
    description: 'Allow deleting users',
    module: 'Users',
    enabled: false,
  },
  {
    id: 'roles:manage',
    name: 'Manage Roles',
    description: 'Allow managing user roles',
    module: 'Roles',
    enabled: true,
  },
  {
    id: 'settings:view',
    name: 'View Settings',
    description: 'Allow viewing system settings',
    module: 'Settings',
    enabled: true,
  },
  {
    id: 'settings:edit',
    name: 'Edit Settings',
    description: 'Allow editing system settings',
    module: 'Settings',
    enabled: false,
  },
];

const PermissionCard: React.FC<{ permission: Permission }> = ({ permission }) => {
  const [checked, setChecked] = React.useState(true);
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('>>>');
    setChecked(e.target.checked);
    // Toggle permission logic
    // e.permission.enabled = false;
  };
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {permission.name}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {permission.description}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Module: {permission.module}
      </Typography>
      <Box sx={{ mt: 'auto' }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked ?? permission.enabled}
              onChange={handleToggle}
              color="primary"
            />
          }
          label={checked ? 'Enabled' : 'Disabled'}
        />
      </Box>
    </Paper>
  );
};

const Permissions: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Permissions
      </Typography>
      <Grid container spacing={3}>
        {mockPermissions.map((permission) => (
          <Grid item xs={12} sm={6} md={4} key={permission.id}>
            <PermissionCard permission={permission} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Permissions; 