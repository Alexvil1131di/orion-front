import { FormEvent, useState } from "react";
import { LoginServices } from "../../services/Auth/LoginServices";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const loginService = new LoginServices(email, password);
        const res = await loginService.login()
        if (res.error) { setError(true); setTimeout(() => setError(false), 5000) }
    }

    return (
        <div className="flex justify-center items-center h-full bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full  max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
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
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-red-500 italic mb-2">Invalid email or password please try again</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
