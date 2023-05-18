import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

function CompanyCompleteProfile() {
    const [file, setFile] = useState();
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const websiteRef = useRef(null);
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (nameRef.current.value.trim().length === 0) {
            toast.error("Company's Name cannot be empty");
            return;
        }
        console.log("reached");
        const formData = new FormData();
        formData.append("name", nameRef?.current?.value);
        formData.append("logo", file);
        formData.append("description", descriptionRef?.current?.value);
        formData.append("website", websiteRef?.current?.value);
        try {
            const res = await axiosInstance.post("/company/create", formData);
            console.log(res?.data);
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
            encType="multipart/form-data"
        >
            <TextField
                margin="normal"
                label="Company Name"
                fullWidth
                inputRef={nameRef}
            />
            <TextField
                margin="normal"
                minRows={4}
                multiline
                label="Company Description"
                fullWidth
                inputRef={descriptionRef}
            />
            <TextField
                margin="normal"
                label="Company's website"
                fullWidth
                inputRef={websiteRef}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    my: 2,
                }}
            >
                <Typography htmlFor="upload-resume" component={"label"}>
                    Company's Logo*:
                </Typography>
                <Button color="secondary" variant="contained" component="label">
                    Upload
                    <input
                        id="upload-resume"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                    />
                </Button>
                <Typography>{file && `${file.name}`}</Typography>
            </Box>
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

export default CompanyCompleteProfile;
