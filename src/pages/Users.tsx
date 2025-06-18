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
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from "material-ui-confirm";
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
  role: {
    name: string;
  }
}

const mockUsers: User[] = [
  {
    createdAt: '',
    id: "1",
    firstName: 'John Doe',
    email: 'john@example.com',
    googleId: '',
    lastName: '',
    roleId: 'Admin',
    isActive: true,
    updatedAt: '',
    role: {
      name: 'Admin',
    },
  },
  {
    createdAt: '',
    id: "2",
    firstName: 'Jane Smith',
    email: 'jane@example.com',
    googleId: '',
    lastName: '',
    roleId: 'User',
    isActive: true,
    updatedAt: '',
    role: {
      name: 'User',
    },
  },
  {
    createdAt: '',
    id: "3",
    firstName: 'Bob Johnson',
    email: 'bob@example.com',
    googleId: '',
    lastName: '',
    roleId: 'Editor',
    isActive: true,
    updatedAt: '',
    role: {
      name: 'User',
    }
  },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [listusers, setUsers] = React.useState<User[]>(mockUsers);
  const [open, setOpen] = React.useState(false);
  const confirm = useConfirm();
  const getUserslist = async () => {
    try {
      const data = await authService.getUserlists();
      // console.log(data);
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
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const deleteUser = async (userId: string) => {
    const { confirmed, reason } = await confirm({
      description: "Are you sure you want to delete this user?",
    });

    if (!confirmed) return;
    console.log(reason);
    try {
      await authService.deleteUserById(userId); // Replace with your actual delete call
      setOpen(true);
      getUserslist();
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user. Please try again.");
    }
  };
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
            navigate("/users/add");
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
                <TableCell>
                  {user.role.name.charAt(0).toUpperCase() +
                    user.role.name.slice(1)}
                </TableCell>
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
                  <IconButton size="small" onClick={() => deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={open}
        autoHideDuration={2000}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >user deleted successfully</Alert>
      </Snackbar>
    </Box>
  );
};

export default Users; 