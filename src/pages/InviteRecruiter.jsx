import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

function InviteRecruiter() {
    const emailRef = useRef();
    const { _id: userId } = useSelector((state) => state.auth.user);
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (emailRef.current.value.trim().length === 0) {
            toast.error("Email cannot be empty");
            return;
        }
        try {
            const res = await axiosInstance.post("/company/invite", {
                email: emailRef.current.value,
                userId,
            });
            console.log(res);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };
    return (
        <Container maxWidth={"xs"} sx={{ my: 4 }}>
            <form onSubmit={formSubmitHandler}>
                <Typography variant="h6" my={2} textAlign={"center"}>
                    Invite Recruiter
                </Typography>
                <TextField
                    margin="normal"
                    label="Enter email"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    required
                />
                <Button
                    sx={{ my: 2 }}
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    fullWidth
                >
                    Invite
                </Button>
            </form>
        </Container>
    );
}

export default InviteRecruiter;
