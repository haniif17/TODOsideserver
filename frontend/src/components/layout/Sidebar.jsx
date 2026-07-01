import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    LogOut,
} from "lucide-react";

import Swal from "sweetalert2";

const menus = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "Categories",
        icon: FolderKanban,
        path: "/categories",
    },
    {
        title: "Todos",
        icon: ListTodo,
        path: "/todos",
    },
];

export default function Sidebar() {

    const navigate = useNavigate();

    const logout = async () => {

        const result = await Swal.fire({

            title: "Logout",

            text: "Yakin ingin logout?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Logout",

            cancelButtonText: "Batal",

        });

        if (!result.isConfirmed) return;

        localStorage.removeItem("token");

        Swal.fire({

            icon: "success",

            title: "Logout Berhasil",

            timer: 1200,

            showConfirmButton: false,

        });

        navigate("/");

    };

    return (

        <aside className="w-64 bg-blue-600 text-white min-h-screen flex flex-col justify-between">

            <div>

                <div className="text-3xl font-bold p-8">

                    ToDo App

                </div>

                <nav className="px-4">

                    {menus.map((menu) => {

                        const Icon = menu.icon;

                        return (

                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
                                        isActive
                                            ? "bg-white text-blue-600"
                                            : "hover:bg-blue-500"
                                    }`
                                }
                            >

                                <Icon size={20} />

                                {menu.title}

                            </NavLink>

                        );

                    })}

                </nav>

            </div>

            <div className="p-5">

                <button

                    onClick={logout}

                    className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl p-3 transition"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

}