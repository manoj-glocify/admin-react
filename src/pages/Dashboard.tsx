import React, { useEffect, useState } from 'react';
import {
  Grid,
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
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to fetch profile');
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  console.log('>>>', data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={data?.profileCount || 0}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Roles"
            value={data?.RolesCount || 0}
            icon={<SecurityIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Permissions"
            value={data?.PerMissions || 0}
            icon={<SettingsIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="System Status"
            value="Healthy"
            icon={<AssessmentIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 