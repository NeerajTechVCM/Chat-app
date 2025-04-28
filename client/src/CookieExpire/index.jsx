import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CookieExpiryRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    // Function to check if session cookie exists
    const hasSessionCookie = () => document.cookie.includes("jwt");

    useEffect(() => {
        if (!hasSessionCookie() && location.pathname !== "/login") {

            navigate("/login", { replace: true }); // Redirect immediately
        }
    }, [navigate, location]);

    return null; // This component doesn't render anything
};

export default CookieExpiryRedirect;