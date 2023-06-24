import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function AskAdminForApprovalOrUnban(props) {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    };
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box>
                <AppBar sx={{ backgroundColor: purple[400] }} position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <Link
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                                to="/"
                            >
                                Hireup
                            </Link>
                        </Typography>
                        <Button color="inherit" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flex: 1,
                }}
            >
                <Typography variant="h4">
                    Ask Admin For `{props?.text}`. Contact to{" "}
                    <a href="mailto:hireupasap@gmail.com">
                        hireupasap@gmail.com
                    </a>
                </Typography>
            </Box>
        </Box>
    );
}

export default AskAdminForApprovalOrUnban;
