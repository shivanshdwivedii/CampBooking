import { CalendarDays, RefreshCcw } from "lucide-react";

const DashboardHeader = ({ user, onRefresh }) => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome{user?.fullName ? `, ${user.fullName}` : ""}
        </h1>

        <p className="text-gray-500 mt-2">
          Camp Booking Admin Dashboard
        </p>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <CalendarDays size={18} />
          <span>{currentDate}</span>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
          {user?.role || "Admin"}
        </span>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>

      </div>

    </div>
  );
};

export default DashboardHeader;