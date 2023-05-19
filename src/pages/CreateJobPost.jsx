import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import JobDescription from "../components/JobDescription";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function CreateJobPost() {
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const createJobPostHandler = async () => {
        if (titleRef?.current?.value?.trim()?.length === 0) {
            toast.error("Job title cannot be empty!");
            return;
        }
        if (description?.trim()?.length === 0) {
            toast.error("Job description cannot be empty!");
            return;
        }
        try {
            const res = await axiosInstance.post("/recruiter/job/create", {
                title: titleRef?.current?.value,
                description,
            });
            console.log(res);
            toast.success(res?.data?.message);
            navigate(`/job/${res?.data?.id}`);
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };
    return (
        <Container maxWidth={"md"}>
            <Typography textAlign={"center"} my={4}>
                Create Job Post
            </Typography>
            <TextField
                label="Job Title"
                name="Job Title"
                margin="normal"
                fullWidth
                inputRef={titleRef}
            />
            <JobDescription
                content={description}
                setContent={setDescription}
                placeholder={"Job Description"}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 4,
                }}
            >
                <Button
                    onClick={createJobPostHandler}
                    variant="outlined"
                    color="secondary"
                >
                    Create
                </Button>
            </Box>
        </Container>
    );
}

export default CreateJobPost;
