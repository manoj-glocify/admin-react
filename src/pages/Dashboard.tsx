import React, { useEffect, useState } from 'react';
import {
  Grid,
  Alert,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import authService from '../services/auth';
import { hasPermission } from '../config/utils';

const mainItems = [
  { title: 'Users', value: "2", icon: <PeopleIcon color="primary" />, module: 'users', action: 'read' },
  { title: 'Roles', value: "3", icon: <SecurityIcon color="primary" />, module: 'roles', action: 'read' },
  { title: 'Permissions', value: "0", icon: <SettingsIcon color="primary" />, module: 'permissions', action: 'read' },
  { title: 'System Status', value: "Healthy", icon: <AssessmentIcon color="primary" />, module: 'system' }
];

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

const Dashboard: React.FC = () => {
  const [data, dashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const data = await authService.getDashboardData();
      dashboardData(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch profile');
    }
  };
  const updatedMainItems = mainItems.map((item) => {
    if (data && item.module) {
      // Assuming the API returns a structure like { users: 'new_value', roles: 'new_value', etc. }
      if (item.module in data) {
        return { ...item, value: data[item.module] };
      }
    }
    return item;
  });
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {updatedMainItems.map((item) => {
          if (item.module && item.action && !hasPermission(item.module, item.action)) {
            return null;
          }
          return (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <StatCard
                title={item.title}
                value={data ? data[item.title.replace(' ', '') + 'Count'] || item.value : item.value}
                icon={item.icon}
              />
            </Grid>
          );
        })}
              </Grid>
    </Box>
  );
};

export default Dashboard; 