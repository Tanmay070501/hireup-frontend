import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateJobPost from "../pages/CreateJobPost";
import InviteRecruiter from "../pages/InviteRecruiter";
import { useSelector } from "react-redux";
import JobPost from "../pages/JobPost";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CompanyRecruitersList from "../pages/CompanyRecruitersList";
import OnCampusJobs from "../pages/OnCampusJobs";
import OffCampusJobs from "../pages/OffCampusJobs";
import CommonApproval from "./CommonApproval";
import UpdateDetails from "../pages/UpdateDetails";
import ViewResume from "../pages/ViewResume";

function UserRoutes() {
    const { user } = useSelector((state) => state.auth);
    if (user.role === "admin") {
        return (
            <Routes>
                <Route
                    path="/approvals/company"
                    element={<CommonApproval who={"company"} />}
                />
                <Route
                    path="/approvals/pcell"
                    element={<CommonApproval who={"pcell"} />}
                />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    if (user?.role === "recruiter") {
        return (
            <Routes>
                <Route path="/" element={<RecruiterDashboard />} />
                <Route path="job/create" element={<CreateJobPost />} />
                <Route path="job/:jobId" element={<JobPost />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    if (user?.role === "company") {
        return (
            <Routes>
                <Route path="recruiters" element={<CompanyRecruitersList />} />
                <Route path="invite" element={<InviteRecruiter />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        );
    }
    if (user?.role === "student") {
        return (
            <Routes>
                <Route path="job/oncampus" element={<OnCampusJobs />} />
                <Route path="job/offcampus" element={<OffCampusJobs />} />
                <Route path="job/:jobId" element={<JobPost />} />
                <Route path="update-details" element={<UpdateDetails/>} />
                <Route path="resume" element={<ViewResume/>} />
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
