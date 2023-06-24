import {
    Autocomplete,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import JobDescription from "../components/JobDescription";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function CreateJobPost() {
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const locationRef = useRef(null);
    const salaryRef = useRef(null);
    const [jobType, setJobType] = React.useState("offcampus");
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [collegeValue, setCollegeValue] = React.useState([]);
    const fetchOpt = React.useCallback(async (inputValue) => {
        const res = await axios.get(
            "https://college-api-1-0-0.onrender.com/colleges?name=" + inputValue
        );
        const data = res.data?.map((e) => {
            return {
                college_name: e.college_name,
            };
        });
        setOptions(data);
    }, []);
    React.useEffect(() => {
        fetchOpt(inputValue);
    }, [collegeValue, inputValue, fetchOpt]);

    const handleChange = (event) => {
        setJobType(event.target.value);
    };
    const createJobPostHandler = async () => {
        if (titleRef?.current?.value?.trim()?.length === 0) {
            toast.error("Job title cannot be empty!");
            return;
        }
        if (description?.trim()?.length === 0) {
            toast.error("Job description cannot be empty!");
            return;
        }
        let extraBody = {};
        if (locationRef?.current?.value.trim().length !== 0) {
            extraBody["jobLocation"] = locationRef?.current?.value;
        }
        if (jobType === "oncampus") {
            if (collegeValue.length === 0) {
                toast.error("List of colleges cannot be empty!");
                return;
            }
            extraBody["colleges"] = collegeValue.map((el) => el.college_name);
        }
        if (salaryRef?.current?.value.trim().length !== 0) {
            extraBody["salary"] = salaryRef?.current?.value;
        }
        try {
            const res = await axiosInstance.post("/recruiter/job/create", {
                title: titleRef?.current?.value,
                description,
                jobType,
                ...extraBody,
            });
            console.log(res);
            toast.success(res?.data?.message);
            navigate(`/job/${res?.data?.id}`);
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };
    console.log(collegeValue);
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Job Loaction"
                        name="Job Location"
                        fullWidth
                        margin="normal"
                        inputRef={locationRef}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="jobtype-select-label">
                            Job Type
                        </InputLabel>
                        <Select
                            labelId="jobtype-select-label"
                            id="jobtype-select"
                            value={jobType}
                            label="Job Type"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"offcampus"}>Off Campus</MenuItem>
                            <MenuItem value={"oncampus"}>On Campus</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {jobType === "oncampus" && (
                <Autocomplete
                    multiple
                    //id="tags-standard"
                    noOptionsText="Try searching with different name"
                    options={options}
                    getOptionLabel={(option) => option?.college_name}
                    value={collegeValue}
                    onChange={(event, newValue) => {
                        setCollegeValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="College List"
                            placeholder="Search for college name"
                            required
                            variant="outlined"
                            margin="normal"
                        />
                    )}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={uuidv4()}>
                                {option.college_name}
                            </li>
                        );
                    }}
                    required
                />
            )}
            <TextField
                margin="normal"
                variant="outlined"
                label="Salary/CTC"
                fullWidth
                inputRef={salaryRef}
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
