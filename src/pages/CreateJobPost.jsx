import { Container, TextField, Typography } from "@mui/material";
import React from "react";
import JobDescription from "../components/JobDescription";

function CreateJobPost() {
    return (
        <Container maxWidth={"md"}>
            <Typography textAlign={"center"} my={4}>
                Create Job Post
            </Typography>
            <TextField label="Job Title" margin="normal" fullWidth />
            <JobDescription placeholder={"Job Description"} />
        </Container>
    );
}

export default CreateJobPost;
