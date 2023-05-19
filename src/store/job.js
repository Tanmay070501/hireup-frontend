import { createSlice } from "@reduxjs/toolkit";

const initialJobState = { job: null };
const jobSlice = createSlice({
    name: "job",
    initialState: initialJobState,
    reducers: {
        setJob(state, action) {
            return {
                ...state,
                job: { ...action?.payload?.job },
            };
        },
        clearJob() {
            return {
                job: null,
            };
        },
    },
});

export const jobActions = jobSlice.actions;
const jobReducer = jobSlice.reducer;
export default jobReducer;
