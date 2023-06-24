import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { authActions } from '../store/auth';

function UpdateDetails() {
    const { user } = useSelector((state) => state.auth); 
    const [coursePercent, setCoursePercent] = React.useState(user?.coursePercentage);
    const [tenthPercent, setTenthPercent] = React.useState(user?.tenthPercentage);
    const [twelvethPercent, setTwelvethPercent] = React.useState(user?.twelvethPercentage);
    const dispatch = useDispatch()
    const [file, setFile] = useState();
    const formSubmitHandler = async (e)=>{
        e.preventDefault()
        if (
            coursePercent?.trim().length === 0
        ) {
            toast.error("Course Percentage cannot be empty");
            return;
        }
        if (tenthPercent?.trim().length === 0) {
            toast.error("10th Percentage cannot be empty");
            return;
        }
        if (twelvethPercent?.trim().length === 0) {
            toast.error("12th Percentage cannot be empty");
            return;
        }
        const coursePercentage =
        parseInt(coursePercent) || 0;
    const tenthPercentage = parseInt(tenthPercent) || 0;
    const twelvethPercentage =
        parseInt(twelvethPercent) || 0;
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("coursePercantage", coursePercentage);
    formData.append("tenthPercentage", tenthPercentage);
    formData.append("twelvethPercentage", twelvethPercentage);
    try {
        const res = await axiosInstance.patch("/student/update", formData);
        dispatch(authActions.updateUser(res?.data?.user));
        toast.success("Profile updated Successfully!");
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
}
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e?.target?.files[0]);
        }
    };
  return (
    <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 4,
                    textAlign: "center",
                }}
                maxWidth={"xs"}
            >
                <Typography variant="h5">Update Your Details</Typography>
                <form
                style={{ width: "100%", margin: "24px 0px" }}
                onSubmit={formSubmitHandler}
                encType="multipart/form-data"
            >
                <TextField
                        label={`${user?.course || "Course"} Percentage`}
                        value={coursePercent}
                        onChange={e => setCoursePercent(e?.target?.value)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                 <TextField
                    label="10th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={tenthPercent}
                    onChange={e => setTenthPercent(e?.target?.value)}
                />
                <TextField
                    label="12th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={twelvethPercent}
                    onChange={e => setTwelvethPercent(e?.target?.value)}
                    contentEditable
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
                        Resume*:
                    </Typography>
                    <Button
                        color="secondary"
                        variant="contained"
                        component="label"
                    >
                        Upload
                        <input
                            id="upload-resume"
                            hidden
                            accept="application/pdf"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Typography>{file && `${file.name}`}</Typography>
                </Box>
                <Button type="submit" variant='contained' sx={{my: 4}} color="secondary">Update</Button>
            </form>
    </Container>
  )
}

export default UpdateDetails
