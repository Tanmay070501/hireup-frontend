import { Typography } from "@mui/material";
import React from "react";

function MainLogo(props) {
    return (
        <>
            <Typography
                fontFamily="cursive"
                my={4}
                textAlign={"center"}
                variant="h3"
                {...props}
            >
                Hireup
            </Typography>
        </>
    );
}

export default MainLogo;
