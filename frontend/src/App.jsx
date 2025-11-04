import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage.jsx";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./features/authSlice.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
    const authUser = useSelector((state) => state.auth.authUser);
    const isCheckingAuth = useSelector((state) => state.auth.isCheckingAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignupPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/profile"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
            </Routes>

            <Toaster />
        </div>
    );
}

export default App;
