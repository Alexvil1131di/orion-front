import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UrlServices } from "../../services/urls/urlServices";

import Logo from "../../assets/common/Logo";


const UrlRedirect = () => {
    const { token } = useParams();

    useEffect(() => {
        if (!token) return;
        const urlServices = new UrlServices();
        urlServices.openUrl(token).then((res) => {
            window.location.href = res;
        }).catch((err) => {
            console.log(err);
        })

    }, [token]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <Logo className="w-[40%] h-[40%]"></Logo>
                <p className="text-[34px]">Redirecting...</p>
            </div>
        </>
    );
};

export default UrlRedirect;