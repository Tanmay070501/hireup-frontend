import React from "react";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { purple } from "@mui/material/colors";

function NavBar() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
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
    );
}

export default NavBar;
