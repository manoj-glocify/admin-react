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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
interface User {
  createdAt: string;
  email: string;
  firstName: string;
  googleId: string | null;
  id: string;
  isActive: boolean;
  lastName: string;
  roleId: string;
  updatedAt: string;
}

const mockUsers: User[] = [
  { createdAt: '', id: "1", firstName: 'John Doe', email: 'john@example.com', googleId: '', lastName: '', roleId: 'Admin', isActive: true, updatedAt: '' },
  { createdAt: '', id: "2", firstName: 'Jane Smith', email: 'jane@example.com', googleId: '', lastName: '', roleId: 'User', isActive: true, updatedAt: '' },
  { createdAt: '', id: "3", firstName: 'Bob Johnson', email: 'bob@example.com', googleId: '', lastName: '', roleId: 'Editor', isActive: true, updatedAt: '' },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [listusers, setUsers] = React.useState<User[]>(mockUsers);
  const getUserslist = async () => {
    try {
      const data = await authService.getUserlists();
      console.log(data);
      if (data && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn("User list is empty or invalid:", data);
        setUsers([]); // Set empty array to avoid breaking the table
      }
    } catch {
      console.log("error");
    }
  }
  useEffect(() => {
    getUserslist();
  }, []);
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
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            /* Add user logic */
            navigate('/users/add');
          }}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listusers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{(user.roleId === "1") ? "Admin" : "User"}</TableCell>
                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {
                      /* Edit user logic */
                      navigate(`/users/edit/${user.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      /* Delete user logic */
                    }}
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

export default Users; 