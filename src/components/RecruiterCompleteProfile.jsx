import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function RecruiterCompleteProfile() {
    const dispatch = useDispatch();
    const nameRef = useRef(null);
    const positionRef = useRef(null);
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (nameRef.current.value.trim().length === 0) {
            toast.error("Name cannot be empty!");
            return;
        }
        if (positionRef.current.value.trim().length === 0) {
            toast.error("Position cannot be empty!");
            return;
        }
        try {
            const res = await axiosInstance.post("/recruiter/create", {
                name: nameRef?.current?.value,
                position: positionRef?.current?.value,
            });
            dispatch(authActions.updateUser(res?.data?.result));
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong!"
            );
        }
    };
    return (
        <form
            style={{ width: "100%", margin: "24px 0px" }}
            onSubmit={formSubmitHandler}
        >
            <TextField
                label="Name"
                margin="normal"
                name="name"
                fullWidth
                inputRef={nameRef}
            />
            <TextField
                label="Position"
                margin="normal"
                name="position"
                fullWidth
                inputRef={positionRef}
            />
            <Button
                sx={{ my: 2 }}
                color="secondary"
                variant="contained"
                type="submit"
                fullWidth
            >
                Submit
            </Button>
        </form>
    );
}

export default RecruiterCompleteProfile;
