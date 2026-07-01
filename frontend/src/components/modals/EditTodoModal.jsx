import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function EditTodoModal({

    open,
    onClose,
    onSuccess,
    todo,

}) {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({

        category_id: "",

        title: "",

        description: "",

        status: "pending",

        priority: "medium",

        deadline: "",

        is_completed: false,

    });

    useEffect(() => {

        if (!open || !todo) return;

        loadCategories();

        setForm({

            category_id: todo.category_id || "",

            title: todo.title,

            description: todo.description || "",

            status: todo.status,

            priority: todo.priority,

            deadline: todo.deadline,

            is_completed: todo.is_completed,

        });

    }, [open, todo]);

    const loadCategories = async () => {

        const res = await api.get("/categories/");

        setCategories(res.data);

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({

            ...form,

            [name]: type === "checkbox" ? checked : value,

        });

    };

    const submit = async () => {

        if (
            form.title.trim() === "" ||
            form.category_id === "" ||
            form.deadline === ""
        ) {

            Swal.fire({

                icon: "warning",

                title: "Data belum lengkap",

                text: "Silakan lengkapi semua field wajib."

            });

            return;

        }

        try {

            await api.put(`/todos/${todo.id}`, {

                category_id: Number(form.category_id),

                title: form.title,

                description: form.description,

                status: form.status,

                priority: form.priority,

                deadline: form.deadline,

                is_completed: form.is_completed,

            });

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text: "Todo berhasil diperbarui",

                timer: 1500,

                showConfirmButton: false,

            });

            onSuccess();

            onClose();

        }

        catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Update Gagal",

                text:
                    err.response?.data?.detail ||
                    err.response?.data?.message ||
                    "Terjadi kesalahan saat mengupdate Todo."

            });

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-xl p-6 w-[600px]">

                <h2 className="text-2xl font-bold mb-6">

                    Edit Todo

                </h2>

                <input

                    name="title"

                    value={form.title}

                    onChange={handleChange}

                    className="border p-3 rounded w-full mb-3"

                />

                <textarea

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                    className="border p-3 rounded w-full mb-3"

                />

                <select

                    name="category_id"

                    value={form.category_id}

                    onChange={handleChange}

                    className="border p-3 rounded w-full mb-3"

                >

                    {categories.map(c=>(

                        <option key={c.id} value={c.id}>

                            {c.name}

                        </option>

                    ))}

                </select>

                <div className="flex justify-end gap-3 mt-6">

                    <button

                        onClick={onClose}

                        className="bg-gray-500 text-white px-5 py-3 rounded"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={submit}

                        className="bg-blue-600 text-white px-5 py-3 rounded"

                    >

                        Update

                    </button>

                </div>

            </div>

        </div>

    );

}