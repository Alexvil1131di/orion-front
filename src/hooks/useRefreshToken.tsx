import { useEffect } from "react";
import { refreshToken } from "../api/Auth";
import Cookies from "js-cookie";

const useRefreshToken = (pathName: string) => {
    const token = Cookies.get("token");
    const router = (route: string) => { window.location.href = route };

    useEffect(() => {
        if (!token) return;
        refreshToken(token).then((res) => {
            Cookies.set("token", res.token, { expires: 1 });
            delete res.token;
            sessionStorage.setItem("user", JSON.stringify(res));
        }).catch((err) => {
            console.log(err);
            Cookies.remove("token");
            sessionStorage.removeItem("user");
            router("/");
            return
        });

    }, [pathName]);



}

export default useRefreshToken;