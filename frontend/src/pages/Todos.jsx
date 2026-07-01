import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import Swal from "sweetalert2";

import AddTodoModal from "../components/modals/AddTodoModal";
import EditTodoModal from "../components/modals/EditTodoModal";

export default function Todos() {

    const [todos, setTodos] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [openModal, setOpenModal] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {

        loadTodos();

    }, [search, status, priority, page]);

    const loadTodos = async () => {

        try {

            const params = new URLSearchParams();

            if (search) params.append("search", search);

            if (status) params.append("status", status);

            if (priority) params.append("priority", priority);

            params.append("page", page);

            const res = await api.get(`/todos/?${params.toString()}`);

            const result = res.data;

            if (result.items) {

                setTodos(result.items);

                setTotalPages(
                    Math.max(1, Math.ceil(result.count / 5))
                );

            } else {

                setTodos(result);

                setTotalPages(1);

            }

        } catch (err) {

            console.log(err);

        }

    };

    const deleteTodo = async (id) => {

        const result = await Swal.fire({

            title: "Delete Todo?",

            text: "Data tidak bisa dikembalikan.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel",

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/todos/${id}`);

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text: "Todo berhasil dihapus",

                timer: 1500,

                showConfirmButton: false,

            });

            loadTodos();

        }

        catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Delete Gagal"

            });

        }

    };

    const editTodo = (todo) => {

        setSelectedTodo(todo);

        setOpenEdit(true);

    };

    return (

        <MainLayout>

            <AddTodoModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onSuccess={loadTodos}

            />

            <EditTodoModal

                open={openEdit}

                onClose={() => setOpenEdit(false)}

                onSuccess={loadTodos}

                todo={selectedTodo}

            />

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Todo Management

                </h1>

                <button

                    onClick={() => setOpenModal(true)}

                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"

                >

                    + Add Todo

                </button>

            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">

                <input

                    type="text"

                    placeholder="Search Todo..."

                    className="border rounded-xl p-3"

                    value={search}

                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}

                />

                <select

                    className="border rounded-xl p-3"

                    value={status}

                    onChange={(e) => {

                        setStatus(e.target.value);

                        setPage(1);

                    }}

                >

                    <option value="">All Status</option>

                    <option value="pending">Pending</option>

                    <option value="in_progress">In Progress</option>

                    <option value="completed">Completed</option>

                </select>

                <select

                    className="border rounded-xl p-3"

                    value={priority}

                    onChange={(e) => {

                        setPriority(e.target.value);

                        setPage(1);

                    }}

                >

                    <option value="">All Priority</option>

                    <option value="high">High</option>

                    <option value="medium">Medium</option>

                    <option value="low">Low</option>

                </select>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4">Title</th>

                            <th className="p-4">Category</th>

                            <th className="p-4">Priority</th>

                            <th className="p-4">Status</th>

                            <th className="p-4">Deadline</th>

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {todos.map((todo) => (

                            <tr

                                key={todo.id}

                                className="border-t"

                            >

                                <td className="p-4">

                                    {todo.title}

                                </td>

                                <td className="p-4">

                                    {todo.category}

                                </td>

                                <td className="p-4">

                                    {todo.priority}

                                </td>

                                <td className="p-4">

                                    {todo.status}

                                </td>

                                <td className="p-4">
                                    {todo.deadline}
                                </td>

                                <td className="p-4 text-center space-x-2">

                                    <button

                                        onClick={() => editTodo(todo)}

                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        onClick={() => deleteTodo(todo.id)}

                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="flex justify-center items-center gap-4 mt-6">

                <button

                    disabled={page === 1}

                    onClick={() => setPage(page - 1)}

                    className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"

                >

                    Previous

                </button>

                <span>

                    Page {page} of {totalPages}

                </span>

                <button

                    disabled={page === totalPages}

                    onClick={() => setPage(page + 1)}

                    className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"

                >

                    Next

                </button>

            </div>

        </MainLayout>

    );

}