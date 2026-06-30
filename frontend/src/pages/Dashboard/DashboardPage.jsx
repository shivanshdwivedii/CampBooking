import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Building2,
    CalendarCheck2,
    Users,
    IndianRupee,
    Star,
    CheckCircle2,
    XCircle,
    Plus,
    Tent,
    ClipboardList,
    ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { fetchDashboard } from "../../features/dashboard/dashboardThunks";

import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import EmptyDashboard from "../../components/dashboard/EmptyDashboard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";

function DashboardPage() {
    const dispatch = useDispatch();

const {
  data: dashboard,
  loading,
  error,
} = useSelector((state) => state.dashboard);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-10">
                <DashboardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">

                <div className="rounded-3xl bg-white p-12 shadow-xl">

                    <h2 className="text-3xl font-bold text-red-600">
                        Something went wrong
                    </h2>

                    <p className="mt-4 text-slate-500">
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="min-h-screen bg-slate-100 p-10">
                <EmptyDashboard />
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-100">

            {/* HEADER */}

            <section className="overflow-hidden bg-slate-950">

                <div className="mx-auto max-w-7xl px-8 py-16">

                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                        <div>

                            <p className="text-lg font-medium text-emerald-400">
                                Welcome Back,
                            </p>

                            <h1 className="mt-3 text-5xl font-black tracking-tight text-white">

                                {user?.fullName}

                            </h1>

                            <p className="mt-5 max-w-2xl text-lg text-slate-300">

                                Monitor camps, bookings,
                                revenue and customer
                                engagement from one place.

                            </p>

                        </div>

                        <div>

                            <Link
                                to="/admin/add-camp"
                                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600"
                            >

                                <Plus size={22} />

                                Add New Camp

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* BODY */}

            <section className="mx-auto max-w-7xl px-8 py-12">

                {/* STATS */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <DashboardCard
                        title="Total Camps"
                        value={dashboard.totalCamps}
                        icon={Building2}
                        iconColor="text-emerald-600"
                        iconBg="bg-emerald-100"
                    />

                    <DashboardCard
                        title="Bookings"
                        value={dashboard.totalBookings}
                        icon={CalendarCheck2}
                        iconColor="text-blue-600"
                        iconBg="bg-blue-100"
                    />

                    <DashboardCard
                        title="Users"
                        value={dashboard.totalUsers}
                        icon={Users}
                        iconColor="text-purple-600"
                        iconBg="bg-purple-100"
                    />

                    <DashboardCard
                        title="Revenue"
                        value={`₹${dashboard.totalRevenue}`}
                        icon={IndianRupee}
                        iconColor="text-orange-600"
                        iconBg="bg-orange-100"
                    />

                </div>
                                {/* SECOND ROW */}

                <div className="mt-8 grid gap-6 lg:grid-cols-3">

                    {/* LEFT */}

                    <div className="space-y-6 lg:col-span-2">

                        <div className="grid gap-6 md:grid-cols-2">

                            <DashboardCard
                                title="Average Rating"
                                value={dashboard.averageRating}
                                icon={Star}
                                iconColor="text-yellow-500"
                                iconBg="bg-yellow-100"
                            />

                            <DashboardCard
                                title="Total Ratings"
                                value={dashboard.totalRatings}
                                icon={Star}
                                iconColor="text-pink-600"
                                iconBg="bg-pink-100"
                            />

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <DashboardCard
                                title="Confirmed Bookings"
                                value={dashboard.confirmedBookings}
                                icon={CheckCircle2}
                                iconColor="text-green-600"
                                iconBg="bg-green-100"
                            />

                            <DashboardCard
                                title="Cancelled Bookings"
                                value={dashboard.cancelledBookings}
                                icon={XCircle}
                                iconColor="text-red-600"
                                iconBg="bg-red-100"
                            />

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        <h2 className="text-2xl font-bold">

                            Quick Actions

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Manage your application quickly.

                        </p>

                        <div className="mt-8 space-y-5">

                            <QuickActionCard
                                title="Add Camp"
                                description="Create a new camping destination."
                                icon={Plus}
                                to="/admin/add-camp"
                                color="bg-emerald-500"
                            />

                            <QuickActionCard
                                title="Manage Camps"
                                description="Update existing camp details."
                                icon={Tent}
                                to="/admin/manage-camps"
                                color="bg-blue-500"
                            />

                            <QuickActionCard
                                title="Manage Bookings"
                                description="Review and manage customer bookings."
                                icon={ClipboardList}
                                to="/admin/manage-bookings"
                                color="bg-orange-500"
                            />

                            <QuickActionCard
                                title="Ratings"
                                description="Monitor customer reviews."
                                icon={Star}
                                to="/admin/ratings"
                                color="bg-pink-500"
                            />

                        </div>

                    </div>

                </div>

                {/* DASHBOARD OVERVIEW */}

                <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-3xl font-bold">

                                Dashboard Overview

                            </h2>

                            <p className="mt-2 text-slate-500">

                                Live statistics from your application.

                            </p>

                        </div>

                        <ArrowRight
                            size={24}
                            className="text-slate-400"
                        />

                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-2xl bg-slate-100 p-6">

                            <p className="text-slate-500">

                                Camps Available

                            </p>

                            <h3 className="mt-4 text-5xl font-black">

                                {dashboard.totalCamps}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-slate-100 p-6">

                            <p className="text-slate-500">

                                Total Users

                            </p>

                            <h3 className="mt-4 text-5xl font-black">

                                {dashboard.totalUsers}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-slate-100 p-6">

                            <p className="text-slate-500">

                                Confirmed

                            </p>

                            <h3 className="mt-4 text-5xl font-black text-green-600">

                                {dashboard.confirmedBookings}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-slate-100 p-6">

                            <p className="text-slate-500">

                                Cancelled

                            </p>

                            <h3 className="mt-4 text-5xl font-black text-red-600">

                                {dashboard.cancelledBookings}

                            </h3>

                        </div>

                    </div>

                </div>
                                {/* SYSTEM STATUS */}

                <div className="mt-10 grid gap-6 lg:grid-cols-3">

                    <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white shadow-xl">

                        <h3 className="text-2xl font-bold">
                            System Status
                        </h3>

                        <p className="mt-4 text-emerald-100 leading-7">

                            CampBooking is running normally.
                            All services are available and
                            bookings are being processed successfully.

                        </p>

                        <div className="mt-8 flex items-center gap-3">

                            <div className="h-4 w-4 rounded-full bg-white animate-pulse"></div>

                            <span className="font-semibold">
                                All Systems Operational
                            </span>

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">

                        <h2 className="text-2xl font-bold">

                            Admin Notes

                        </h2>

                        <div className="mt-8 space-y-6">

                            <div className="flex items-start gap-4">

                                <div className="mt-2 h-3 w-3 rounded-full bg-emerald-500"></div>

                                <div>

                                    <h4 className="font-semibold">

                                        Camps

                                    </h4>

                                    <p className="mt-1 text-slate-500">

                                        Keep camp details updated
                                        for better customer experience.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-4">

                                <div className="mt-2 h-3 w-3 rounded-full bg-blue-500"></div>

                                <div>

                                    <h4 className="font-semibold">

                                        Bookings

                                    </h4>

                                    <p className="mt-1 text-slate-500">

                                        Regularly monitor booking
                                        requests and cancellations.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-4">

                                <div className="mt-2 h-3 w-3 rounded-full bg-orange-500"></div>

                                <div>

                                    <h4 className="font-semibold">

                                        Ratings

                                    </h4>

                                    <p className="mt-1 text-slate-500">

                                        High ratings increase
                                        customer trust and
                                        improve bookings.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default DashboardPage;