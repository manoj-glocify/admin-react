import React, { useEffect } from 'react';
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
import { checkPermission } from '../config/utils';
import authService from '../services/auth';
import { useConfirm } from "material-ui-confirm";
interface Role {
  id: number;
  name: string;
  description: string;
  permissions: [{
    module: string;
    actions: string[];
  }];
  users: string[];
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: [{
      module: 'users',
      actions: ['users:manage', 'roles:manage', 'settings:manage'],
    }],
    users: ['5'],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Content management access',
    permissions: [{
      module: 'users',
      actions: ['content:create', 'content:edit', 'content:delete'],
    }],
    users: ['12'],
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [{
      module: 'users',
      actions: ['content:view'],
    }],
    users: ['25'],
  },
];

const Roles: React.FC = () => {
  const confirm = useConfirm();
  const [rolesList, setRoles] = React.useState<Role[]>(mockRoles);
  const fetchRoles = async () => {
    try {
      const data = await authService.getAllRoleslists();
      if (data && Array.isArray(data)) {
        setRoles(data);
      } else {
        setRoles(mockRoles);
      }
    } catch {
      throw new Error("Failed to fetch roles");
    }
  }
  const DeleteRole = async (id: number) => {
    const confirmed = await confirm({
      description: "Are you sure you want to delete this role?",
    });
    if (!confirmed) return;
  }
  useEffect(() => {
    fetchRoles();
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Roles</Typography>
        {checkPermission("roles", "create") && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              /* Add role logic */
            }}
          >
            Add Role
          </Button>)}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Users</TableCell>
              {checkPermission("roles", "edit") && (<TableCell align="right">Actions</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesList.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name.toUpperCase()}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell size={'small'} sx={{ maxWidth: 250 }}>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {(role?.permissions || []).map((permission) =>
                      (permission.actions || []).map((action) => (
                        <Chip
                          key={action}
                          label={permission.module + ':' + action}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    )}
                  </Box>
                </TableCell>
                <TableCell>{role.users.length}</TableCell>
                {checkPermission("roles", "edit") && (<TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {
                      /* Edit role logic */
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => DeleteRole(role.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Roles; 