import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateJobPost from "../pages/CreateJobPost";
import InviteRecruiter from "../pages/InviteRecruiter";
import { useSelector } from "react-redux";
import JobPost from "../pages/JobPost";

function UserRoutes() {
    const { user } = useSelector((state) => state.auth);
    if (user?.role === "recruiter") {
        return (
            <Routes>
                <Route path="job/create" element={<CreateJobPost />} />
                <Route path="job/:jobId" element={<JobPost />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    if (user?.role === "company") {
        return (
            <Routes>
                <Route path="invite" element={<InviteRecruiter />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="job/:jobId" element={<JobPost />} />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
}

export default UserRoutes;
