import UrlInput from "../components/Index/urlInput";
import NonLoggedInInfo from "../components/Index/nonLoggedInInfo";
import TrashCanSvg from "../assets/common/trashCan";

import { getUrls } from "../api/user-url";
import { FormEvent, useEffect, useState } from "react";
import { UrlServices } from "../services/urls/urlServices";
import { toast } from "react-toastify";
import { UrlInterface } from "../interfaces/user-url-interface";
import CopySvg from "../assets/common/copy";
import UserCard from "../components/Index/clientCard";

export default function MainPage({ isAuth }: { isAuth: boolean }) {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<Array<UrlInterface>>([]);
  const [createdUrl, setCreatedUrl] = useState("");
  const [referch, setReferch] = useState(false);


  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (isAuth && user) {
      getUrls(user.id).then((res) => { setUrls(res); })
        .catch((err) => { console.log(err); })
    }
  }, [isAuth, referch]);

  function handleSubmitLogged(e: FormEvent) {
    e.preventDefault();
    const urlServices = new UrlServices();
    return toast.promise(urlServices.addAnUrl({ userId: user?.id, longUrl: url }), {
      pending: "Creating url",
      success: "Url created!",
      error: "Error, something went wrong, check your url",
    }).finally(() => { setReferch(!referch); });
  }

  function handleSubmitNotLogged(e: FormEvent) {
    e.preventDefault();
    handleSubmitLogged(e).then((res) => {
      setCreatedUrl(res.key);
    })
  }

  function handleDeleteUrl(id: string) {
    const urlServices = new UrlServices();
    urlServices.removeUrl(id, () => toast.error("Error, something went wrong"), () => toast.success("Url deleted!")).finally(() => { setReferch(!referch); });
  }

  const addresses = [
    {
      city: "New York",
      street: "5th Avenue",
      state: "123",
      zip: "10001",
      country: "USA"
    },
    {
      city: "Los Angeles",
      street: "Sunset Boulevard",
      state: "456",
      zip: "90001",
      country: "USA"
    },
    {
      city: "Chicago",
      street: "Michigan Avenue",
      state: "789",
      zip: "60601",
      country: "USA"
    }
  ];
  return (
    <div className="h-full bg-gray-100">
      <div className="p-6 gap-4 flex flex-wrap ">
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />

        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />
        <UserCard email="olialexander1131@gmail.com" name="Oli" lastname="Japa" addresses={addresses} />

      </div>


    </div >
  );
}
