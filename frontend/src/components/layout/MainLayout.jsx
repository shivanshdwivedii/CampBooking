import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {

    return (

        <div className="flex min-h-screen flex-col bg-slate-50">

            {/* Header */}


<Navbar />
            {/* Main Content */}

            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">

                <Outlet />

            </main>

            {/* Footer */}

            <Footer />

        </div>

    );

}

export default MainLayout;