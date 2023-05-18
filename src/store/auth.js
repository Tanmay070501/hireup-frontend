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
        logout() {
            return {
                user: null,
            };
        },
        updateUser(state, action) {
            const user = Object.assign({}, state.user, action.payload);
            return { ...state, user: { ...user } };
        },
    },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
