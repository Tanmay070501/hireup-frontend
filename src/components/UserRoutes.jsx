import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateJobPost from "../pages/CreateJobPost";
import InviteRecruiter from "../pages/InviteRecruiter";
import { useSelector } from "react-redux";

function UserRoutes() {
    const { user } = useSelector((state) => state.auth.user);
    if (user?.role === "recruiter") {
        return (
            <Routes>
                <Route path="job/create" element={<CreateJobPost />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    if (user?.role === "recruiter") {
        return (
            <Routes>
                <Route path="invite" element={<InviteRecruiter />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="invite" element={<InviteRecruiter />} />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
}

export default UserRoutes;
