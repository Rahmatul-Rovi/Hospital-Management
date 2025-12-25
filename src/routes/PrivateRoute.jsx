import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom"; // 1. useLocation add koro

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation(); // 2. Current location track koro

    if (loading) {
        return <div className="flex justify-center mt-20"><span className="loading loading-bars loading-lg text-blue-500"></span></div>;
    }

    if (user) {
        return children;
    }

    // 3. state-er bhitor location pathiye dao
    return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;