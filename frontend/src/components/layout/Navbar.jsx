import { useMemo, useState } from "react";

import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    Menu,
    X,
    Tent
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";

function Navbar() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        isAuthenticated,
        user
    } = useSelector(
        (state) => state.auth
    );

    const isAdmin =
        user?.roles?.includes("Admin");

    const initials = useMemo(() => {

        if (!user?.fullName)
            return "U";

        return user.fullName
            .split(" ")
            .map(name => name[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

    }, [user]);

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };

    const navClass = ({ isActive }) =>
        isActive
            ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
            : "text-slate-600 hover:text-emerald-600 transition";

    return (

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <Link
                    to={isAdmin ? "/admin/manage-camps" : "/"}
                    className="flex items-center gap-3"
                >

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">

                        <Tent size={24} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold">

                            CampBooking

                        </h1>

                        <p className="text-xs text-slate-500">

                            Adventure Starts Here

                        </p>

                    </div>

                </Link>

                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-8 lg:flex">

                    {!isAdmin && (

                        <>

                            <NavLink
                                to="/"
                                className={navClass}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/camps"
                                className={navClass}
                            >
                                Camps
                            </NavLink>

                            {isAuthenticated && (

                                <>

                                    <NavLink
                                        to="/my-bookings"
                                        className={navClass}
                                    >
                                        My Bookings
                                    </NavLink>

                                  

                                </>

                            )}

                        </>

                    )}

                    {isAdmin && (

                        <>

                            <NavLink
                                to="/admin/manage-camps"
                                className={navClass}
                            >
                                Manage Camps
                            </NavLink>

                            <NavLink
                                to="/admin/add-camp"
                                className={navClass}
                            >
                                Add Camp
                            </NavLink>

                            <NavLink
 to="/admin/dashboard"                                className={navClass}
                            >
                                Dashboard
                            </NavLink>

                        </>

                    )}

                </nav>

                {/* Right Side */}

                <div className="hidden items-center gap-4 lg:flex">

                    {!isAuthenticated ? (

                        <>

                            <Link
                                to="/login"
                                className="rounded-xl border px-5 py-2 transition hover:bg-slate-100"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
                            >
                                Register
                            </Link>

                        </>

                    ) : (

                        <>


                            <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">

                                    {initials}

                                </div>

                                <div>

                                    <p className="font-semibold">

                                        {user?.fullName}

                                    </p>

                                    <span className="text-xs text-slate-500">

                                        {isAdmin
                                            ? "Administrator"
                                            : "Camper"}

                                    </span>

                                </div>

                            </div>
                                                        <button
                                onClick={handleLogout}
                                className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

                {/* Mobile Menu Button */}

                <button
                    onClick={() =>
                        setMobileMenuOpen(!mobileMenuOpen)
                    }
                    className="rounded-xl border p-2 transition hover:bg-slate-100 lg:hidden"
                >

                    {mobileMenuOpen ? (

                        <X size={24} />

                    ) : (

                        <Menu size={24} />

                    )}

                </button>

            </div>

            {/* Mobile Drawer */}

            {mobileMenuOpen && (

                <div className="border-t bg-white lg:hidden">

                    <div className="space-y-2 px-6 py-6">

                        {!isAdmin && (

                            <>

                                <NavLink
                                    to="/"
                                    className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/camps"
                                    className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                >
                                    Camps
                                </NavLink>

                                {isAuthenticated && (

                                    <>

                                        <NavLink
                                            to="/my-bookings"
                                            className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            My Bookings
                                        </NavLink>

                                        <NavLink
 to="/admin/dashboard"                                            className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Dashboard
                                        </NavLink>

                                    </>

                                )}

                            </>

                        )}

                        {isAdmin && (

                            <>

                                <NavLink
                                    to="/admin/manage-camps"
                                    className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                >
                                    Manage Camps
                                </NavLink>

                                <NavLink
                                    to="/admin/add-camp"
                                    className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                >
                                    Add Camp
                                </NavLink>

                                <NavLink
 to="/admin/dashboard"                                    className="block rounded-xl px-4 py-3 hover:bg-slate-100"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                >
                                    Dashboard
                                </NavLink>

                            </>

                        )}

                        <hr className="my-4" />

                        {!isAuthenticated ? (

                            <div className="space-y-3">

                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="block rounded-xl border px-4 py-3 text-center"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="block rounded-xl bg-emerald-600 px-4 py-3 text-center text-white"
                                >
                                    Register
                                </Link>

                            </div>

                        ) : (

                            <>

                                <div className="mt-5 rounded-2xl bg-slate-100 p-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">

                                            {initials}

                                        </div>

                                        <div>

                                            <p className="font-semibold">

                                                {user?.fullName}

                                            </p>

                                            <p className="text-sm text-slate-500">

                                                {isAdmin
                                                    ? "Administrator"
                                                    : "Camper"}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="mt-5 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                                >
                                    Logout
                                </button>

                            </>

                        )}

                    </div>

                </div>

            )}

        </header>

    );

}

export default Navbar;