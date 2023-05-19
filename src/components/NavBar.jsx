import React from "react";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { nav } from "../utils/nav";

function NavBar() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.user.role);
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
                    {role &&
                        nav?.[role].map((el) => (
                            <Button key={el?.id} color="inherit">
                                <Link
                                    style={{
                                        color: "inherit",
                                        textDecoration: "inherit",
                                    }}
                                    to={el.relativeUrl}
                                >
                                    {el?.name}
                                </Link>
                            </Button>
                        ))}
                    <Button color="inherit" onClick={logoutHandler}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
