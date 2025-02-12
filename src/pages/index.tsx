

import { getUsers } from "../api/Client";
import { useEffect, useState } from "react";
import { ClientService } from "../services/client/clientService";
import { toast } from "react-toastify";
import { userInterface } from "../interfaces/interfaces";
import UserCard from "../components/Index/clientCard";
import Register from "./Auth/Register";

export default function MainPage({ isAuth }: { isAuth: boolean }) {
  const [users, setUsers] = useState<userInterface[]>();
  const [referch, setReferch] = useState(false);

  const [userToEdit, setUserToEdit] = useState<userInterface>();
  const [showCreate, setShowCreate] = useState(false);

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (isAuth && user) {
      getUsers().then((res) => { setUsers(res); })
        .catch(() => { toast.error("Error, something went wrong") });
    }
    console.log(user)
  }, [isAuth, referch]);

  function onEdit(user: userInterface) {
    setShowCreate(true);
    setUserToEdit(user);
  }

  function onDelete(id: string) {
    const clientServices = new ClientService();
    clientServices.deleteClient(id).then(() => {
      toast.success("User deleted");
      setReferch(!referch);
    }).catch(() => { toast.error("Error, something went wrong") });
  }


  return (
    <div className="flex flex-col gap-5 h-full bg-gray-100 overflow-scroll">
      {showCreate && <div className="fixed top-8 pt-8 left-0 right-0 bottom-0 flex flex-col bg-gray-100">
        <button type="button" onClick={() => { window.location.href = "/"; setUserToEdit(undefined) }} className="text-[24px] font-semibold underline text-left pl-4">Go Back</button>
        <Register title={userToEdit ? "Edit User" : "Create User"} userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
      </div>}
      <div className="flex justify-between items-center p-4 border border-b-gray-300">
        <h1 className=" font-bold text-[24px]"> Clients</h1>
        <button type="button" onClick={() => { setShowCreate(true) }} className="bg-blue-600 px-4 py-2 text-white rounded-full" >Create User</button>
      </div>
      <div className="p-6 gap-4 flex flex-wrap justify-center md:justify-start">
        {users && users.map((user) => (
          <>
            <UserCard email={user.email} name={user.name} lastname={user.lastname} addresses={user.addresses} onEdit={() => onEdit(user)} onDelete={() => { onDelete(user.id) }} />
          </>
        ))}

      </div>


    </div >
  );
}
