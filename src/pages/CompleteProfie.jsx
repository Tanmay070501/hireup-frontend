import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import { purple } from "@mui/material/colors";
import StudentCompleteProfile from "../components/StudentCompleteProfile";
import CompanyCompleteProfile from "../components/CompanyCompleteProfile";
import RecruiterCompleteProfile from "../components/RecruiterCompleteProfile";

function CompleteProfie() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    };
    const renderCompleteProfile = () => {
        if (user.role === "student") return <StudentCompleteProfile />;
        if (user.role === "company") return <CompanyCompleteProfile />;
        if (user.role === "recruiter") return <RecruiterCompleteProfile />;
    };
    return (
        <React.Fragment>
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
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 4,
                    textAlign: "center",
                }}
                maxWidth={"xs"}
            >
                <Typography variant="h5">Complete Your Profile</Typography>

                {renderCompleteProfile()}
            </Container>
        </React.Fragment>
    );
}

export default CompleteProfie;
