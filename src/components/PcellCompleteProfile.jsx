import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../utils/axiosInstance";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function PcellCompleteProfile() {
    const dispatch = useDispatch();
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [collegeValue, setCollegeValue] = React.useState(null);
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
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (!collegeValue) {
            toast.error("College field cannot be empty");
            return;
        }
        try {
            const res = await axiosInstance.post("/pcell/create", {
                name: collegeValue.college_name,
            });
            dispatch(authActions.updateUser(res?.data?.user));
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };
    return (
        <form
            style={{ width: "100%", margin: "24px 0px" }}
            onSubmit={formSubmitHandler}
        >
            <Autocomplete
                getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.college_name
                }
                filterOptions={(x) => x}
                value={collegeValue}
                noOptionsText="No College"
                includeInputInList
                filterSelectedOptions
                autoComplete
                options={options}
                onChange={(_event, newValue) => {
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
            <Button
                color="secondary"
                sx={{ mt: 2 }}
                variant="contained"
                fullWidth
                type="submit"
            >
                Submit
            </Button>
            <Typography sx={{ my: 4 }} variant="h5" component={"div"}>
                If you don't find your college name, please contact{" "}
                <a href="mailto:hireupasap@gmail.com">hireupasap@gmail.com</a>
            </Typography>
        </form>
    );
}

export default PcellCompleteProfile;
