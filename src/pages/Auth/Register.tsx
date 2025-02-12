import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { LoginServices } from "../../services/Auth/LoginServices";
import ShowPasswordButton from "../../components/Auth/showPasswordButton";
import { toast } from "react-toastify";
import { addressesInterface, userInterface } from "../../interfaces/user-url-interface";
import { ClientService } from "../../services/urls/clientService";

function Register({ userToEdit, title, setUserToEdit }: { userToEdit?: userInterface, title?: string, setUserToEdit?: Dispatch<SetStateAction<userInterface | undefined>> }) {

    const [email, setEmail] = useState(userToEdit?.email || "");
    const [firstName, setFirstName] = useState(userToEdit?.name || "");
    const [lastName, setLastName] = useState(userToEdit?.lastname || "");
    const [password, setPassword] = useState("");
    const [addresses, setAddresses] = useState<addressesInterface[]>([]);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [address, setAddress] = useState<addressesInterface>();
    const [addressToDelete, setAddressToDelete] = useState<string[]>([]);

    useEffect(() => {
        console.log("usertoedit", userToEdit);
        if (userToEdit) {
            setEmail(userToEdit.email);
            setFirstName(userToEdit.name);
            setLastName(userToEdit.lastname);
            setAddresses(userToEdit.addresses);
        }
    }, [userToEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (userToEdit) {
            await editUser();
        } else {
            await registerUser();
        }
        if (addressToDelete.length > 0) {
            const clientService = new ClientService();
            Promise.all(
                await Promise.all(addressToDelete.map(async (id) => {
                    await clientService.deleteAddress(id);
                })));
        }
    }


    async function registerUser() {
        const loginService = new LoginServices(email, password);
        const { response, error } = await loginService.register(firstName, lastName, addresses)
        if (response) {
            toast.success("User created successfully");
        }
        if (error) {
            toast.error(error.response.data.message);
            setTimeout(() => { setError("") }, 10000);
        }
    }

    async function editUser() {
        if (!userToEdit) return;
        const clientService = new ClientService();
        const { response, error } = await clientService.editClient(userToEdit?.id, firstName, lastName, addresses,
            () => { toast.error("Error editing user"); },
            () => { toast.success("User edited successfully"); }
        )
        console.log(response, error);
        if (response && setUserToEdit) {
            window.location.href = "/";
            setUserToEdit(undefined);
        }
        if (error && setUserToEdit) {
            const errorMessage = JSON.parse(error.request.response).message.join(", ");
            setUserToEdit(undefined);
            setError(errorMessage);
            setTimeout(() => { setError("") }, 10000);
            window.location.href = "/";

        }
    }

    function deleteAddress(index: number) {
        if (addresses[index]?.id) { setAddressToDelete([...addressToDelete, addresses[index]?.id]); }
        setAddresses(addresses.filter((_, i) => i !== index));
    }



    return (
        <div className="flex justify-center items-center h-full  bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full overflow-y-scroll max-h-[800px]">
                <h2 className="text-2xl font-bold mb-5 text-center">{title ? title : userToEdit ? "Edit User" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                            type="email"
                            id="email"
                            value={email}
                            disabled={userToEdit ? true : false}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg shadow-sm"
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="w-full border rounded-lg shadow-sm px-3 py-2"
                                type={"text"} id="lastName" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                            />


                        </div>
                    </div>

                    {!userToEdit && <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg shadow-sm px-3 py-2 gap-2">
                            <input
                                className="w-full"
                                type={showPassword ? "text" : "password"} id="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <ShowPasswordButton className={" w-6 h-6 cursor-pointer"} showPassword={showPassword} setShowPassword={setShowPassword} />

                        </div>
                    </div>}
                    {error && <p className="text-red-500 italic text-sm mb-5">{error}</p>}

                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="street">
                                Street
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg shadow-sm"
                                type="text"
                                id="street"
                                value={address?.street}
                                onChange={(e) => setAddress({ ...address, street: e.target.value } as addressesInterface)}
                                placeholder="Enter your street"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                className="w-full border rounded-lg shadow-sm px-3 py-2"
                                type={"text"} id="city" value={address?.city}
                                onChange={(e) => setAddress({ ...address, city: e.target.value } as addressesInterface)}
                                placeholder="Enter your city"
                            />


                        </div>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                                State
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg shadow-sm"
                                type="text"
                                id="state"
                                value={address?.state}
                                onChange={(e) => setAddress({ ...address, state: e.target.value } as addressesInterface)}
                                placeholder="Enter your state"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                                Country
                            </label>
                            <input
                                className="w-full border rounded-lg shadow-sm px-3 py-2"
                                type={"text"} id="country" value={address?.country}
                                onChange={(e) => setAddress({ ...address, country: e.target.value } as addressesInterface)}
                                placeholder="Enter your country"
                            />


                        </div>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="zip">
                                Zipcode
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg shadow-sm"
                                type="text"
                                id="zip"
                                value={address?.zip}
                                onChange={(e) => setAddress({ ...address, zip: e.target.value } as addressesInterface)}
                                placeholder="Enter your zipcode"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full max-w-[150px] h-[42px] border mb-4 font-bold py-2 mt-8 rounded-lg hover:bg-black hover:text-white transition duration-200"
                            onClick={() => {
                                if (address?.street && address?.city && address?.state && address?.country && address?.zip) {
                                    setAddresses([...addresses, address]);
                                    setAddress({ street: "", city: "", state: "", country: "", zip: "" });
                                } else {
                                    toast.error("Please fill in all address fields");
                                }
                            }}
                        >
                            Add Address
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {userToEdit ? "Edit User" : "Sign Up"}
                    </button>
                </form>
                {addresses.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Addresses</h3>
                        <ul>
                            {addresses.map((addr, index) => (
                                <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded-lg shadow-sm">
                                    <span>{`${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}, ${addr.zip}`}</span>
                                    <button
                                        type="button"
                                        className="ml-4 text-red-500 hover:text-red-700"
                                        onClick={() => deleteAddress(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
