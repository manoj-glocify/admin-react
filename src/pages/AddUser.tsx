import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
  Alert,
  CircularProgress,
  Grid,
  Select,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
interface Roles {
  createdAt: string;
  description: string;
  id: string;
  isDefault: boolean;
  name: string;
  permissions: {
    actions: object;
    createdAt: string;
    id: string;
  },
}
const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = React.useState<Roles[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const getRoleslist = async () => {
    try {
      const data = await authService.getRoleslists();
      if (data && Array.isArray(data)) {
        setRoles(data);
        if (data.length > 0) {
          data.forEach((role) => {
            if (role.isDefault) {
              setSelectedRole(role.id);
              setFormData((prev) => ({
                ...prev,
                roleId: role.id,
              }));
            }
          });
        }
      } else {
        setRoles([]);
      }
    } catch {
      throw new Error("Failed to fetch roles");
    }
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await authService.newUser(formData);
      navigate('/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRoleslist();
  }, []);
  return (
    <Container component="main" maxWidth="xl">
      <Typography component="h1" variant="h4">
        Add New User
      </Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Roles
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedRole}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedRole(value);
                    setFormData((prev) => ({
                      ...prev,
                      roleId: value,
                    }));
                  }}
                  fullWidth
                  label="Roles"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save user"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddUser; 