import axios from "axios";
import { addressesInterface } from "../interfaces/user-url-interface";

export const postlogin = async (email: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
        {
            email,
            password,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const postRegister = async (email: string, password: string, name: string, lastname: string, addresses: addressesInterface[]) => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signUp`,
        {
            email,
            password,
            name,
            lastname,
            addresses,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )

}

export const refreshToken = async (token: string) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refreshToken`,
        {
            token
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    return response.data;
}