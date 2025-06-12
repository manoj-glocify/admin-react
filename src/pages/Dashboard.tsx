import React from 'react';
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="1,234"
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Roles"
            value="12"
            icon={<SecurityIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Permissions"
            value="48"
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