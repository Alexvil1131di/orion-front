import axios from "axios";
import { editClient } from "../../api/Client";
import { addressesInterface } from "../../interfaces/user-url-interface";
import Cookies from "js-cookie";

export class ClientService {

    constructor() {

    }


    async deleteAddress(id: string,) {
        return axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/address/delete/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then((res) => { return { response: res.data, error: null }; }).catch((err) => { return { response: null, error: err } });
    }


    async deleteClient(id: string) {
        return axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/client/delete/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then((res) => { return { response: res.data, error: null }; }).catch((err) => { return { response: null, error: err } });
    }


    async editClient(id: string, name: string, lastname: string, addresses: addressesInterface[], onError: (error: string) => void, onSuccess: () => void) {
        return await editClient(id, name, lastname, addresses).then((res) => {
            onSuccess();
            return { response: res, error: null };
        }).catch((err) => {
            onError(err.response.data);
            return { response: null, error: err };
        });

    }

}
