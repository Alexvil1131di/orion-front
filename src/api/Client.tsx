import axios from "axios";
import Cookies from "js-cookie";
import { addressesInterface } from "../interfaces/interfaces";



export const getUsers = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/client/get`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  return response.data;
}

export const deleteClient = async (id: string) => {
  return await axios.delete(`${import.meta.env.VITE_BASE_URL}/url/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  ).then((res) => { return { response: res.data, error: null }; }).catch((err) => { return { response: null, error: err } });

}

export const editClient = async (id: string, name: string, lastname: string, addresses: addressesInterface[]) => {
  return await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/client/update/${id}`,
    {
      name,
      lastname,
      addresses,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  ).then((res) => { return { response: res.data, error: null }; }).catch((err) => { return { response: null, error: err } });
}