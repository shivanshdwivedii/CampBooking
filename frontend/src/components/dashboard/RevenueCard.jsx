import {
  IndianRupee,
  TrendingUp,
  CalendarDays,
  ReceiptText,
} from "lucide-react";

const RevenueCard = ({ revenue }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 h-full">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Revenue Overview
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Current booking statistics
          </p>

        </div>

        <TrendingUp className="text-green-600" size={30} />

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="rounded-lg border p-5">

          <div className="flex items-center gap-2 text-blue-600">

            <IndianRupee size={22} />

            <span className="font-semibold">
              Total Revenue
            </span>

          </div>

          <h3 className="text-3xl font-bold mt-4">
            ₹{revenue?.totalRevenue ?? 0}
          </h3>

        </div>

        <div className="rounded-lg border p-5">

          <div className="flex items-center gap-2 text-green-600">

            <CalendarDays size={22} />

            <span className="font-semibold">
              Monthly Revenue
            </span>

          </div>

          <h3 className="text-3xl font-bold mt-4">
            ₹{revenue?.monthlyRevenue ?? 0}
          </h3>

        </div>

        <div className="rounded-lg border p-5">

          <div className="flex items-center gap-2 text-orange-500">

            <ReceiptText size={22} />

            <span className="font-semibold">
              Bookings
            </span>

          </div>

          <h3 className="text-3xl font-bold mt-4">
            {revenue?.totalBookings ?? 0}
          </h3>

        </div>

      </div>

    </div>
  );
};

export default RevenueCard;