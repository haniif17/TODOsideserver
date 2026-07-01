import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {

  return (

    <div className="flex bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );

}