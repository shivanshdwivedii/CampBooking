import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";

function AdminLayout() {

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Admin Header */}

            <AdminNavbar />

            {/* Admin Content */}

            <main className="mx-auto min-h-[calc(100vh-80px)] max-w-7xl px-6 py-8">

                <Outlet />

            </main>

        </div>

    );

}

export default AdminLayout;