import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ConfirmProvider } from "material-ui-confirm";
import MainLayout from './layouts/BerryMainLayout';
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
import ThemeCustomization from './theme';


// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }
interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   if (!authService.isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// };
const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const isLoggedIn = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/profile" replace />;
  }
  return <>{children}</>;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeCustomization>
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
            {/* <Route
              path="/"
              element={
                <RoleProtectedRoute allowedRoles={['user']}>
                  <MainLayout />
                </RoleProtectedRoute>
              }>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route> */}
          </Routes>
        </Router>
      </ConfirmProvider>
    </ThemeCustomization>
  );
}

export default App;
