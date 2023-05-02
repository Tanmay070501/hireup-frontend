import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { user: null };
const authSlice = createSlice({
    name: "authenticaiton",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    accessToken: action.payload.accessToken,
                },
            };
        },
    },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
