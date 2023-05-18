import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import courses from "../utils/course";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function StudentCompleteProfile() {
    const nameRef = useRef(null);
    const [file, setFile] = useState();
    const tenthPercentageRef = useRef(null);
    const twelvethPercentageRef = useRef(null);
    const coursePercentageRef = useRef(null);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [collegeValue, setCollegeValue] = React.useState(null);
    const dispatch = useDispatch();
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (nameRef?.current?.value?.trim().length === 0) {
            toast.error("Name field cannot be empty!");
            return;
        }
        if (!collegeValue) {
            toast.error("College field cannot be empty");
            return;
        }
        if (!file) {
            toast.error("Resume field cannot be empty");
            return;
        }
        if (!value) {
            toast.error("Course cannot be empty");
            return;
        }
        if (
            !coursePercentageRef ||
            coursePercentageRef?.current?.value?.trim().length === 0
        ) {
            toast.error("Course Percentage cannot be empty");
            return;
        }
        if (tenthPercentageRef?.current?.value?.trim().length === 0) {
            toast.error("10th Percentage cannot be empty");
            return;
        }
        if (twelvethPercentageRef?.current?.value?.trim().length === 0) {
            toast.error("12th Percentage cannot be empty");
            return;
        }
        const name = nameRef.current.value;
        const course = value.label;
        const coursePercentage =
            parseInt(coursePercentageRef.current.value) || 0;
        const tenthPercentage = parseInt(tenthPercentageRef.current.value) || 0;
        const twelvethPercentage =
            parseInt(twelvethPercentageRef.current.value) || 0;
        const collegeName = collegeValue.college_name;
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("name", name);
        formData.append("course", course);
        formData.append("coursePercantage", coursePercentage);
        formData.append("tenthPercentage", tenthPercentage);
        formData.append("twelvethPercentage", twelvethPercentage);
        formData.append("collegeName", collegeName);
        try {
            const res = await axiosInstance.post("/student/create", formData);
            dispatch(authActions.updateUser(res?.data?.user));
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };
    const coursesList = courses.map((el) => {
        return {
            id: el.id,
            label: el.course,
        };
    });
    const defaultProps = {
        options: coursesList,
        getOptionLabel: (option) => option.label,
    };

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
    return (
        <React.Fragment>
            <form
                style={{ width: "100%", margin: "24px 0px" }}
                onSubmit={formSubmitHandler}
                encType="multipart/form-data"
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    inputRef={nameRef}
                />
                <Autocomplete
                    {...defaultProps}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option.id === value.id;
                    }}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.label}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Course"
                            variant="outlined"
                            margin="normal"
                        />
                    )}
                />
                {value && (
                    <TextField
                        label={`${value.label} Percentage`}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        inputRef={coursePercentageRef}
                    />
                )}
                <Autocomplete
                    getOptionLabel={(option) =>
                        typeof option === "string"
                            ? option
                            : option.college_name
                    }
                    filterOptions={(x) => x}
                    value={collegeValue}
                    noOptionsText="No College"
                    includeInputInList
                    filterSelectedOptions
                    autoComplete
                    options={options}
                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setCollegeValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="College/University Name"
                            margin="normal"
                            fullWidth
                        />
                    )}
                    isOptionEqualToValue={(option, value) => {
                        return option.college_name === value.college_name;
                    }}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={uuidv4()}>
                                {option.college_name}
                            </li>
                        );
                    }}
                />
                <TextField
                    label="10th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    inputRef={tenthPercentageRef}
                />
                <TextField
                    label="12th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    inputRef={twelvethPercentageRef}
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

                <Button
                    style={{ backgroundColor: purple[400] }}
                    sx={{ mt: 2 }}
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </React.Fragment>
    );
}

export default StudentCompleteProfile;
