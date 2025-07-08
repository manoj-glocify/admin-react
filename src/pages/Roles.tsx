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
import { hasPermission } from '../config/utils';
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

const Roles: React.FC = () => {
  const confirm = useConfirm();
  const [rolesList, setRoles] = React.useState<Role[]>([]);
  const fetchRoles = async () => {
    try {
      const data = await authService.getAllRoleslists();
      if (data && Array.isArray(data)) {
        setRoles(data);
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
        {hasPermission("roles", "create") && (
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
              {hasPermission("roles", "edit") && (<TableCell align="right">Actions</TableCell>)}
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
                {hasPermission("roles", "edit") && (<TableCell align="right">
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