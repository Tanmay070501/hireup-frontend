import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function Dashboard() {
    const dispatch = useDispatch();
    return (
        <div>
            Dashboard
            <Button
                onClick={() => {
                    dispatch(authActions.logout());
                }}
            >
                Logout
            </Button>
        </div>
    );
}

export default Dashboard;
