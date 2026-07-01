import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../services/api";

export default function Login() {

    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            navigate("/dashboard");

        }

    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        if (!username || !password) {

            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Username dan Password wajib diisi"
            });

            return;
        }

        try {

            const response = await api.post("/auth/login", {
                username: username,
                password: password
            });

            console.log("LOGIN SUCCESS");
            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: "Selamat datang!",
                timer: 1500,
                showConfirmButton: false
            });

            navigate("/dashboard");

        } catch (error) {

            console.log("========== LOGIN ERROR ==========");
            console.log(error);

            if (error.response) {
                console.log("STATUS :", error.response.status);
                console.log("DATA :", error.response.data);
            } else {
                console.log("MESSAGE :", error.message);
            }

            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text:
                    error.response?.data?.message ||
                    error.response?.data?.detail ||
                    error.message
            });

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="w-[420px] bg-white rounded-2xl shadow-xl p-10">

                <h1 className="text-3xl font-bold text-blue-600">
                    ToDo Management
                </h1>

                <p className="text-gray-500 mt-2 mb-8">
                    Login
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-lg p-3 mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg"
                >
                    Login
                </button>

            </div>

        </div>

    );

}