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
// import { error } from 'console';
import authService from '../services/auth';
import { useConfirm } from "material-ui-confirm";
interface Role {
  id: number;
  name: string;
  description: string;
  permissions: [{
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
      actions: ['users:manage', 'roles:manage', 'settings:manage'],
    }],
    users: ['5'],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Content management access',
    permissions: [{
      actions: ['content:create', 'content:edit', 'content:delete'],
    }],
    users: ['12'],
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [{
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
      console.log(data);
      if (data && Array.isArray(data)) {
        setRoles(data);
      } else {
        console.warn("User list is empty or invalid:", data);
        setRoles([]); // Set empty array to avoid breaking the table
      }
    } catch {
      console.log("error while fetching data");
    }
  }
  const DeleteRole = async (id: number) => {
    const { confirmed, reason } = await confirm({
      description: "Are you sure you want to delete this role?",
    });

    if (!confirmed) return;
    console.log(reason);
  }
  useEffect(() => {
    fetchRoles();
  }, [])
  console.log('rolesList>>', rolesList);
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            /* Add role logic */
          }}
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
            {rolesList.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name.toUpperCase()}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {(role?.permissions || []).map((permission) =>
                      (permission.actions || []).map((action) => (
                        <Chip
                          key={action}
                          label={action}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    )}
                  </Box>
                </TableCell>
                <TableCell>{role.users.length}</TableCell>
                <TableCell align="right">
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