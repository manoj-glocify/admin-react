import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Profile: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
              }}
            >
              <AccountCircle sx={{ fontSize: 100 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              John Doe
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Administrator
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {/* Change avatar logic */}}
            >
              Change Avatar
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  defaultValue="John"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  defaultValue="Doe"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="john.doe@example.com"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Security
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save Changes</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 