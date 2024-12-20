import { useAppSelector } from "app/hooks.ts";
import { getToken } from "app/userSlice.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkIsAdmin, checkTokenExpiration } from "utils/checkTokenExpiration.ts";

const AdminProtectedRoute = () => {
    const location = useLocation();
    const token = useAppSelector(getToken);

    const isTokenValid = checkTokenExpiration(token);
    const userIsAdmin = checkIsAdmin(token);

    return isTokenValid && userIsAdmin ? (
        <Outlet />
    ) : (
        <Navigate to={isTokenValid ? "/" : "/admin/auth/sign-in"} state={{ from: location }} replace />
        // <Navigate to={"/admin/auth/sign-in"} state={{ from: location }} replace />
    );
};

export default AdminProtectedRoute;
