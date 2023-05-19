import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function BackdropLoader({ open = false }) {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1111,
            }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackdropLoader;
