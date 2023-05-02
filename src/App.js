import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";

function App() {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return (
            <>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to={"/login"} />} />
                </Routes>
            </>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
}

export default App;
