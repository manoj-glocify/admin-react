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

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    // roleId: string;
}

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        // roleId: '',
    });
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = React.useState<Roles[]>([]);
    const [selectedRole, setSelectedRole] = useState('');

    const getRoleslist = async () => {
        try {
            const data = await authService.getRoleslists();
            console.log(data);
            if (data && Array.isArray(data)) {
                setRoles(data);
                //if (data.length > 0) {

                // }
            } else {
                console.warn("User list is empty or invalid:", data);
                setRoles([]); // Set empty array to avoid breaking the table
            }
        } catch {
            console.log("error");
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const { name, value } = e.target;
        // setFormData((prev) => ({
        //     ...prev,
        //     [name]: value,
        // }));
    };
    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            const response = await authService.getUserById(id);
            console.log('response>', response)
            //  setSelectedRole(response?.role?.id);
            setUserData({
                firstName: response?.firstName ?? '',
                lastName: response?.lastName ?? '',
                email: response?.email ?? '',
                // roleId: response?.role?.id ?? '',
            });
        };
        fetchUser();
        getRoleslist();
    }, [id]);

    console.log('userData>>>', userData)
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
                        {/* {error && (
                            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                                {error}
                            </Alert>
                        )} */}
                        <Box
                            component="form"
                            // onSubmit={handleSubmit}
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
                                        value={userData?.firstName}
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
                                        value={userData?.lastName}
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
                                        value={userData?.email}
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
