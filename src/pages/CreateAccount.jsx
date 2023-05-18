import { Button, Container, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import MainLogo from "../components/MainLogo";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CreateAccount() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const passRef = useRef(null);
    const confirmPassRef = useRef(null);
    const { token } = useParams();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (passRef.current.value !== confirmPassRef.current.value) {
            setError(true);
            return;
        }
        // console.log("reach");
        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/auth/createAccount",
                {
                    token,
                    password: passRef.current.value,
                }
            );
            console.log(res);
            navigate("/login?success=true");
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };
    const confirmPasswordHandler = () => {
        if (passRef.current.value !== confirmPassRef.current.value) {
            setError(true);
            return;
        }
        setError(false);
    };
    return (
        <Container maxWidth={"xs"}>
            <MainLogo />
            <form onSubmit={submitHandler}>
                <TextField
                    variant="outlined"
                    label="Enter Password"
                    type="password"
                    size="medium"
                    fullWidth
                    margin="normal"
                    inputRef={passRef}
                />
                <TextField
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                    size="medium"
                    fullWidth
                    margin="normal"
                    onBlur={confirmPasswordHandler}
                    inputRef={confirmPassRef}
                    error={error}
                    helperText={error && "Password does not match!"}
                />
                <Button
                    color="secondary"
                    sx={{ my: 2 }}
                    variant="outlined"
                    fullWidth
                    type="submit"
                >
                    Create Account
                </Button>
            </form>
        </Container>
    );
}

export default CreateAccount;
