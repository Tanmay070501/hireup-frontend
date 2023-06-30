import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AppliedToJobs from "../pages/AppliedToJobs";
import PCellDashboard from "../pages/PCellDashboard";
import CompanyRecruitersList from "../pages/CompanyRecruitersList";

function DashboardComponent() {
    const { user } = useSelector((state) => state.auth);
    if (user?.role === "admin")
        return (
            <Routes>
                <Route path="*" element={<AdminDashboard />} />
            </Routes>
        );
        if (user?.role === "company")
        return (
            <Routes>
                <Route path="*" element={<CompanyRecruitersList />} />
            </Routes>
        );
    if (user?.role === "recruiter")
        return (
            <Routes>
                <Route path="*" element={<RecruiterDashboard />} />
            </Routes>
        );
    if (user?.role === "student")
        return (
            <Routes>
                <Route path="*" element={<AppliedToJobs />} />
            </Routes>
        );
    if (user?.role === "pcell") {
        return (
            <Routes>
                <Route path="*" element={<PCellDashboard />} />
            </Routes>
        );
    }
    return <div></div>;
}

export default DashboardComponent;
