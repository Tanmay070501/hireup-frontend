import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import CompleteProfie from "./pages/CompleteProfie";
import CreateAccount from "./pages/CreateAccount";
import UserRoutes from "./components/UserRoutes";
import DashboardComponent from "./components/DashboardComponent";
import AskAdminForApprovalOrUnban from "./pages/AskAdminForApprovalOrUnban";

function App() {
    const { user } = useSelector((state) => state.auth);
    const history = useLocation();
    console.log(history);
    if (!user) {
        return (
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/create/account/:token"
                    element={<CreateAccount />}
                />
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        );
    }
    if (
        (user.role === "company" || user.role === "pcell") &&
        !user?.approvedByAdmin
    ) {
        return (
            <Routes>
                <Route
                    path="/needApproval"
                    element={<AskAdminForApprovalOrUnban text="Approval" />}
                />
                <Route path="*" element={<Navigate to={"/needApproval"} />} />
            </Routes>
        );
    }
    if (!user?.profileCompleted) {
        return (
            <Routes>
                <Route path="/complete" element={<CompleteProfie />} />
                <Route path="*" element={<Navigate to={"/complete"} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                {/* <Route path="job/create" element={<CreateJobPost />} />
                <Route path="invite" element={<InviteRecruiter />} /> */}
                <Route path="/" element={<DashboardComponent />} />
                <Route path="*" element={<UserRoutes />} />
            </Route>
        </Routes>
    );
}

export default App;
