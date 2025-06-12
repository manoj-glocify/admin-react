import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['users:manage', 'roles:manage', 'settings:manage'],
    usersCount: 5,
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Content management access',
    permissions: ['content:create', 'content:edit', 'content:delete'],
    usersCount: 12,
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['content:view'],
    usersCount: 25,
  },
];

const Roles: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Roles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Add role logic */}}
        >
          Add Role
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {role.permissions.map((permission) => (
                      <Chip
                        key={permission}
                        label={permission}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{role.usersCount}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {/* Edit role logic */}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {/* Delete role logic */}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Roles; 