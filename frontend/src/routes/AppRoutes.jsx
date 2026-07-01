import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Todos from "../pages/Todos";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/categories"

                    element={

                        <ProtectedRoute>

                            <Categories />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/todos"

                    element={

                        <ProtectedRoute>

                            <Todos />

                        </ProtectedRoute>

                    }

                />

            </Routes>

        </BrowserRouter>

    );

}