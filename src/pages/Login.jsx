import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import MainLogo from "../components/MainLogo";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");
        if (success === "true") {
            toast.success("Account created successfully! Login in now.");
        }
    }, [searchParams]);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/auth/login",
                {
                    email: emailRef.current.value,
                    password: passRef.current.value,
                },
                {
                    headers: {
                        "Bypass-Tunnel-Reminder": "anything",
                    },
                }
            );
            dispatch(authActions.login(res?.data));
        } catch (err) {
            toast.error(err.response?.data?.message);
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
                            fullWidth
                            id="outlined-adornment-password"
                            inputRef={passRef}
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
                    <Button
                        style={{
                            marginTop: "24px",
                            backgroundColor: purple[400],
                        }}
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Log in
                    </Button>
                    <Box
                        mt={2}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>
                            <Link to={"/signup"} component={RouterLink}>
                                Don't have an acount? Sign up
                            </Link>
                        </Typography>
                        <Typography>
                            <Link>Forgot Password?</Link>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default Login;
