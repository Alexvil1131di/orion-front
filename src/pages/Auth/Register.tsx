import { FormEvent, useState } from "react";
import { LoginServices } from "../../services/Auth/LoginServices";
import ShowPasswordButton from "../../components/Auth/showPasswordButton";
import { toast } from "react-toastify";

function Register() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const loginService = new LoginServices(email, password);
        const { response, error } = await loginService.register(firstName, lastName)
        if (response) {
            toast.success("User created successfully");
            window.location.href = "/Auth/Login";
        }
        if (error) {
            const errorMessage = JSON.parse(error.request.response).message.join(", ");
            setError(errorMessage);
            setTimeout(() => { setError("") }, 10000);
        }
    }

    return (
        <div className="flex justify-center items-center h-full bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
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

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg shadow-sm px-3 py-2 gap-2">
                            <input
                                className="w-full"
                                type={showPassword ? "text" : "password"} id="lastName" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <ShowPasswordButton className={" w-6 h-6 cursor-pointer"} showPassword={showPassword} setShowPassword={setShowPassword} />

                        </div>
                    </div>
                    {error && <p className="text-red-500 italic text-sm mb-5">{error}</p>}

                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                Street
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
                                City
                            </label>
                            <input
                                className="w-full border rounded-lg shadow-sm px-3 py-2"
                                type={"text"} id="lastName" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                            />


                        </div>
                    </div>
                    <div className="mb-4 flex gap-2">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                State
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
                                Country
                            </label>
                            <input
                                className="w-full border rounded-lg shadow-sm px-3 py-2"
                                type={"text"} id="lastName" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                            />


                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Zipcode
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                            type="number"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full border mb-4 font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Address
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
