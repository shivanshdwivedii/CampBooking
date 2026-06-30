import {
    Mail,
    MapPin,
    Phone
} from "lucide-react";

import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className="mt-auto border-t bg-slate-900 text-slate-300">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <h2 className="text-2xl font-bold text-white">

                            CampBooking

                        </h2>

                        <p className="mt-4 leading-7">

                            Discover amazing camping destinations,
                            book your next adventure and create
                            unforgettable memories with ease.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-4 text-lg font-semibold text-white">

                            Quick Links

                        </h3>

                        <div className="flex flex-col gap-3">

                            <Link
                                to="/"
                                className="transition hover:text-emerald-400"
                            >
                                Home
                            </Link>

                            <Link
                                to="/camps"
                                className="transition hover:text-emerald-400"
                            >
                                Camps
                            </Link>


                            <Link
                                to="/my-bookings"
                                className="transition hover:text-emerald-400"
                            >
                                My Bookings
                            </Link>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-4 text-lg font-semibold text-white">

                            Contact

                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <MapPin
                                    size={18}
                                    className="text-emerald-400"
                                />

                                <span>

                                    Kanpur, India

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Phone
                                    size={18}
                                    className="text-emerald-400"
                                />

                                <span>

                                    +91 9876543210

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Mail
                                    size={18}
                                    className="text-emerald-400"
                                />

                                <span>

                                    support@campbooking.com

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="mb-4 text-lg font-semibold text-white">

                            Follow Us

                        </h3>

                        <div className="flex gap-4">

                            <button className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600">

                                <FaFacebook size={20} />

                            </button>

                            <button className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600">

                                <FaInstagram size={20} />

                            </button>

                            <button className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600">

                                <FaGithub size={20} />

                            </button>

                            <button className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600">

                                <FaLinkedin size={20} />

                            </button>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-6 md:flex-row">

                    <p className="text-sm">

                        © {year} CampBooking. All Rights Reserved.

                    </p>

                    <p className="text-sm text-slate-400">

                        Built with React • Redux • ASP.NET Core • SQL Server

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;