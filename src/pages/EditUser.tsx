import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import authService from '../services/auth';
interface Roles {
    id: string;
    name: string;
}

export interface EditUserData {
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    isActive: boolean;
}
interface status {
    id: number;
    name: string;
}
const userStatus: status[] = [
    { 'id': 1, 'name': 'Active' },
    { 'id': 0, 'name': 'Inactive' }
]

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userData, setUser] = useState<EditUserData>({
        firstName: "",
        lastName: "",
        email: "",
        roleId: "",
        isActive: true,
    });
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = React.useState<Roles[]>([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getRoleslist = async () => {
        try {
            const data = await authService.getRoleslists();
            console.log(data);
            if (data && Array.isArray(data)) {
                setRoles(data);
            } else {
                console.warn("User list is empty or invalid:", data);
                setRoles([]); // Set empty array to avoid breaking the table
            }
        } catch {
            console.log("error");
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const fetchUser = async () => {
            const CurrentUserdata = await authService.getUserById(id);
            // console.log('CurrentUserdata>>>>', CurrentUserdata);
            if (CurrentUserdata) {
                setUser({
                    firstName: CurrentUserdata.firstName,
                    lastName: CurrentUserdata.lastName ?? null,
                    email: CurrentUserdata.email ?? null,
                    roleId: CurrentUserdata.roleId ?? null,
                    isActive: CurrentUserdata.isActive ?? null,
                });
                setSelectedRole(CurrentUserdata.roleId ?? null);
                setSelectedStatus(CurrentUserdata.isActive ? 1 : 0);
            }
            setLoading(false);
        };
        getRoleslist();
        fetchUser();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        console.log(userData);
        setLoading(true);

        try {
            console.log('userData>', userData);
            if (id) {
                const responseData = await authService.updateUserById(id, userData);
                setSuccess(responseData.message);
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred during updation');
        } finally {
            setLoading(false);
        }
    };
    // console.log('userData>>>', userData)
    return (
        <div>
            <Container component="main" maxWidth="xl">
                <Typography component="h1" variant="h4">
                    Edit User
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
                        {success && (
                            <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
                                {success}
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
                                        value={userData?.firstName || 'john'}
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
                                        value={userData?.lastName || 'dev'}
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
                                            // userData({ ...userData, roleId: value });
                                            setUser((prev) => ({
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
                                        value={userData?.email || 'testemail@mail.com'}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>

                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Status
                                    </InputLabel>
                                    <Select
                                        labelId="status-label"
                                        id="status-select"
                                        value={selectedStatus}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value as string, 10);
                                            setSelectedStatus(value);
                                            setUser((prev) => ({
                                                ...prev,
                                                isActive: value === 1,
                                            }));
                                        }}
                                        fullWidth
                                        label="Status"
                                    >
                                        {userStatus.map((status) => (
                                            <MenuItem key={status.id} value={status.id}>
                                                {status.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Update user"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default EditUser;
