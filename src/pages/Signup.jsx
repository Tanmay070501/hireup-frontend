import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useRef } from "react";
import MainLogo from "../components/MainLogo";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [role, setRole] = React.useState("student");
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (emailRef.current.value.trim().length === 0) {
            toast.error("Email cannot be empty!");
            return;
        }
        if (passRef.current.value.trim().length === 0) {
            toast.error("Password field cannot be empty!");
            return;
        }
        if (role.trim().length === 0) {
            toast.error("Select one role from options!");
            return;
        }
        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/auth/signup",
                {
                    email: emailRef.current.value,
                    password: passRef.current.value,
                    role: role,
                },
                {
                    headers: {
                        "Bypass-Tunnel-Reminder": "anything",
                    },
                }
            );
            toast.success(res.data?.message);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };
    return (
        <>
            <Container maxWidth={"xs"}>
                <MainLogo />
                <form onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        label="Enter email"
                        type="email"
                        size="medium"
                        fullWidth
                        margin="normal"
                        inputRef={emailRef}
                    />
                    <FormControl margin="normal" fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            inputRef={passRef}
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="select-role-label">Role</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            value={role}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"student"}>Student</MenuItem>
                            <MenuItem value={"pcell"}>Placement Cell</MenuItem>
                            <MenuItem value={"company"}>Company</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        style={{
                            marginTop: "24px",
                            backgroundColor: purple[400],
                        }}
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Sign up
                    </Button>
                    <Box
                        mt={2}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>
                            <Link to={"/login"} component={RouterLink}>
                                Already have an account? Log in
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default Signup;
