import { Autocomplete, Button, TextField } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import courses from "../utils/course";
import axios from "axios";

function StudentCompleteProfile() {
    const formSubmitHandler = (e) => {
        e.preventDefault();
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
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [collegeValue, setCollegeValue] = React.useState(null);
    console.log(value);
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
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
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
                    />
                )}
                <TextField
                    label="10th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
                <TextField
                    label="12th Percentage"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
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
                />
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
