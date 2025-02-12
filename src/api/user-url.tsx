import axios from "axios";
import Cookies from "js-cookie";
import { createUrlInterface } from "../interfaces/user-url-interface";

export const createUrl = async (data: createUrlInterface) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/url/addUrl`,
    {
      userId: data.userId,
      longUrl: data.longUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  return response.data;
};

export const getUrls = async (userId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/url/getByUserId/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  return response.data;
}

export const openUrl = async (key: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/url/open/${key}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  return response.data;
}

export const deleteUrl = async (id: string) => {
  return await axios.delete(`${import.meta.env.VITE_BASE_URL}/url/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  ).then((res) => { return { response: res.data, error: null }; }).catch((err) => { return { response: null, error: err } });

}