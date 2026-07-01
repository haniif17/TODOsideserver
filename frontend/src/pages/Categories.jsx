import { useEffect, useState } from "react";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Categories() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const res = await api.get("/categories/");

            setCategories(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <MainLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Categories

                </h1>

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >

                    + Add Category

                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4">ID</th>

                            <th className="p-4">Name</th>

                            <th className="p-4">Description</th>

                            <th className="p-4">Created</th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map((category) => (

                            <tr
                                key={category.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {category.id}
                                </td>

                                <td className="p-4">
                                    {category.name}
                                </td>

                                <td className="p-4">
                                    {category.description}
                                </td>

                                <td className="p-4">
                                    {new Date(category.created_at).toLocaleDateString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}