import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ConfirmProvider } from "material-ui-confirm";
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import authService from './services/auth';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                authService.isAuthenticated()
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ConfirmProvider>
    </ThemeProvider >
  );
}

export default App;
