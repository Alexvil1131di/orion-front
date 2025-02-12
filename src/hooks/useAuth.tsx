import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCheckAuth = (pathName: string) => {
    const [isAuth, setIsAuth] = useState(false);
    const router = (route: string) => { window.location.href = route };
    const token = Cookies.get("token");
    const user = sessionStorage.getItem("user");

    useEffect(() => {
        if (token && user) {
            setIsAuth(true);
            // Redirect authenticated users away from auth pages
            if (["/Auth/Login", "/Auth/Register"].includes(pathName)) {
                router("/");
            }
        } else {
            setIsAuth(false);
            // Redirect unauthenticated users trying to access protected routes
            if (!["/Auth/Login", "/Auth/Register"].includes(pathName)) {
                router("/Auth/Register");
            }
        }
    }, [pathName, token, user]);

    return { isAuth };
};

export default useCheckAuth;