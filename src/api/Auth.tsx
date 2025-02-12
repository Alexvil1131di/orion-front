import axios from "axios";

export const postlogin = async (email: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logIn`,
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

export const postRegister = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`,
        {
            email,
            password,
            firstName,
            lastName,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
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