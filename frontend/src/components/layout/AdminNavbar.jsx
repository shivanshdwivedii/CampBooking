import { useMemo, useState } from "react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
  Bell,
  LayoutDashboard,
  Menu,
  Plus,
  Tent,
  ClipboardList,
  X,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";

function AdminNavbar() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [mobileOpen, setMobileOpen] = useState(false);

    const { user } = useSelector(
        (state) => state.auth
    );

    const initials = useMemo(() => {

        if (!user?.fullName)
            return "A";

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
            ? "border-b-2 border-emerald-400 pb-1 font-semibold text-emerald-400"
            : "text-slate-300 transition hover:text-white";

    return (

        <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 shadow-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <div
                    onClick={() =>
                        navigate("/admin/manage-camps")
                    }
                    className="flex cursor-pointer items-center gap-3"
                >

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">

                        <Tent size={24} />

                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            CampBooking

                        </h2>

                        <p className="text-xs text-slate-400">

                            Admin Panel

                        </p>

                    </div>

                </div>

                {/* Desktop Nav */}

                <nav className="hidden items-center gap-8 lg:flex">
  <NavLink
  to="/admin/dashboard"
    className={navClass}
  >
    Dashboard
  </NavLink>

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
    to="/admin/manage-bookings"
    className={navClass}
  >
    Manage Bookings
  </NavLink>
</nav>

                {/* Right */}

                <div className="hidden items-center gap-4 lg:flex">

                    <button className="rounded-full bg-slate-800 p-3 transition hover:bg-slate-700">

                        <Bell
                            size={20}
                            className="text-white"
                        />

                    </button>

                    <div className="flex items-center gap-3 rounded-2xl bg-slate-800 px-4 py-2">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">

                            {initials}

                        </div>

                        <div>

                            <p className="font-semibold text-white">

                                {user?.fullName}

                            </p>

                            <span className="text-xs text-slate-400">

                                Administrator

                            </span>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
                    >

                        Logout

                    </button>

                </div>

                {/* Mobile */}

                <button
                    onClick={() =>
                        setMobileOpen(!mobileOpen)
                    }
                    className="rounded-lg border border-slate-700 p-2 text-white lg:hidden"
                >

                    {mobileOpen
                        ? <X size={24} />
                        : <Menu size={24} />}

                </button>

            </div>
                        {/* Mobile Drawer */}

            {mobileOpen && (

                <div className="border-t border-slate-700 bg-slate-900 lg:hidden">

                    <div className="space-y-2 px-6 py-6">

                        {/* Profile */}

                        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-800 p-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">

                                {initials}

                            </div>

                            <div>

                                <p className="font-semibold text-white">

                                    {user?.fullName}

                                </p>

                                <p className="text-sm text-slate-400">

                                    Administrator

                                </p>

                            </div>

                        </div>

                        {/* Dashboard */}

                        <NavLink
to="/admin/dashboard"                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                        >

                            <LayoutDashboard size={20} />

                            Dashboard

                        </NavLink>

                        {/* Manage Camps */}

                        <NavLink
                            to="/admin/manage-camps"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                        >

                            <Tent size={20} />

                            Manage Camps

                        </NavLink>

                        {/* Add Camp */}

                        <NavLink
  to="/admin/add-camp"
  onClick={() => setMobileOpen(false)}
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
>
  <Plus size={20} />
  Add Camp
</NavLink>

<NavLink
  to="/admin/manage-bookings"
  onClick={() => setMobileOpen(false)}
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
>
  <ClipboardList size={20} />
  Manage Bookings
</NavLink>

<hr className="my-5 border-slate-700" />

                        {/* Logout */}

                        <button
                            onClick={handleLogout}
                            className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                        >

                            Logout

                        </button>

                    </div>

                </div>

            )}

        </header>

    );

}

export default AdminNavbar;
