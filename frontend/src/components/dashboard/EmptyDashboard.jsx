import { LayoutDashboard } from "lucide-react";

const EmptyDashboard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-12 flex flex-col items-center justify-center">

      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
        <LayoutDashboard
          size={42}
          className="text-blue-600"
        />
      </div>

      <h2 className="text-3xl font-bold text-gray-800">
        Dashboard is Empty
      </h2>

      <p className="text-gray-500 mt-3 max-w-lg text-center">
        No dashboard data is available right now.
        Once bookings, camps and revenue are available,
        they will automatically appear here.
      </p>

    </div>
  );
};

export default EmptyDashboard;