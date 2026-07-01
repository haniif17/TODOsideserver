import { useEffect, useState } from "react";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/cards/DashboardCard";

export default function Dashboard() {

    const [totalTodo, setTotalTodo] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [highPriority, setHighPriority] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/todos/");

            const todos = res.data.items || res.data;

            setTotalTodo(todos.length);

            setPending(
                todos.filter(todo => todo.status === "pending").length
            );

            setCompleted(
                todos.filter(todo => todo.status === "completed").length
            );

            setHighPriority(
                todos.filter(todo => todo.priority === "high").length
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="grid grid-cols-4 gap-6">

                <DashboardCard
                    title="Total Todo"
                    value={totalTodo}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Pending"
                    value={pending}
                    color="#F59E0B"
                />

                <DashboardCard
                    title="Completed"
                    value={completed}
                    color="#22C55E"
                />

                <DashboardCard
                    title="High Priority"
                    value={highPriority}
                    color="#EF4444"
                />

            </div>

        </MainLayout>

    );

}