import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function AddTodoModal({

    open,
    onClose,
    onSuccess,

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

        if (open) {

            loadCategories();

        }

    }, [open]);

    const loadCategories = async () => {

        try {

            const res = await api.get("/categories/");

            setCategories(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({

            ...form,

            [name]: type === "checkbox" ? checked : value,

        });

    };

    const submit = async () => {

        try {

            await api.post("/todos/", {

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

                title: "Success",

                text: "Todo berhasil ditambahkan"

            });

            onSuccess();

            onClose();

            setForm({

                category_id: "",

                title: "",

                description: "",

                status: "pending",

                priority: "medium",

                deadline: "",

                is_completed: false,

            });

        } catch (err) {

            console.log(err);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Gagal menambah todo"

            });

        }

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[600px] p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Add Todo

                </h2>

                <div className="space-y-4">

                    <input
                        name="title"
                        placeholder="Title"
                        className="border p-3 rounded-lg w-full"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="border p-3 rounded-lg w-full"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <select
                        name="category_id"
                        className="border p-3 rounded-lg w-full"
                        value={form.category_id}
                        onChange={handleChange}
                    >

                        <option value="">

                            Select Category

                        </option>

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >

                                {category.name}

                            </option>

                        ))}

                    </select>

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="status"
                            className="border p-3 rounded-lg"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <option value="pending">Pending</option>

                            <option value="in_progress">In Progress</option>

                            <option value="completed">Completed</option>

                        </select>

                        <select
                            name="priority"
                            className="border p-3 rounded-lg"
                            value={form.priority}
                            onChange={handleChange}
                        >

                            <option value="low">Low</option>

                            <option value="medium">Medium</option>

                            <option value="high">High</option>

                        </select>

                    </div>

                    <input
                        type="date"
                        name="deadline"
                        className="border p-3 rounded-lg w-full"
                        value={form.deadline}
                        onChange={handleChange}
                    />

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            name="is_completed"
                            checked={form.is_completed}
                            onChange={handleChange}
                        />

                        Completed

                    </label>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={submit}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}