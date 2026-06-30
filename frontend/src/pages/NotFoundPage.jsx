import { Link } from "react-router-dom";
import { TriangleAlert, Home } from "lucide-react";

function NotFoundPage() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

            <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">

                <div className="mb-6 flex justify-center">

                    <div className="rounded-full bg-red-100 p-5">

                        <TriangleAlert
                            size={70}
                            className="text-red-500"
                        />

                    </div>

                </div>

                <h1 className="text-6xl font-black text-slate-900">

                    404

                </h1>

                <h2 className="mt-4 text-3xl font-bold text-slate-800">

                    Page Not Found

                </h2>

                <p className="mt-4 leading-7 text-slate-500">

                    Sorry, the page you are looking for doesn't exist
                    or may have been moved.

                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >

                    <Home size={18} />

                    Back To Home

                </Link>

            </div>

        </div>

    );

}

export default NotFoundPage;