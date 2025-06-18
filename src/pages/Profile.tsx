import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import authService from '../services/auth';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentpwd: '',
    newpwd: '',
    confirmpwd: '',
  });
  const [error, setError] = useState<string | null>(null);

  const changePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);
    setPasswordData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    if (name !== 'currentpwd') {
      if (!validateForm()) {
        setError('');
        return;
      }
    }
  }
  const validateForm = (): boolean => {
    if (passwordData.newpwd !== passwordData.confirmpwd) {
      setError('Passwords do not match');
      return false;
    }
    if (passwordData.newpwd.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const fetchProfileData = async () => {
    try {
      const data = await authService.getCurrentUser();
      if (data) {
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
        });
        setProfile(data);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to fetch profile');
    }
  };
  const handleSubmit = () => {
    console.log('formData>', formData);
  }


  useEffect(() => {
    fetchProfileData();
  }, []);
  console.log('passwordData', passwordData);
  return (

    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto 16px",
                bgcolor: "primary.main",
              }}
            >
              <AccountCircle sx={{ fontSize: 100 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {profile?.firstName} {profile?.lastName}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {profile?.role?.name}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                /* Change avatar logic */
              }}
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
                  value={formData?.firstName || 'John'}
                  margin="normal"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData?.lastName || 'Doe'}
                  margin="normal"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData?.email || 'john.doe@example.com'}
                  margin="normal"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  name="currentpwd"
                  margin="normal"
                  onChange={changePwd}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  name="newpwd"
                  margin="normal"
                  onChange={changePwd}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  name="confirmpwd"
                  margin="normal"
                  onChange={changePwd}
                />
              </Grid>
            </Grid>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
            >
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 