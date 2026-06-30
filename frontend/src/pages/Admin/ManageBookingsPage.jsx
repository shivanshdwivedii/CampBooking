import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/bookingApi";

function ManageBookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings =
    async () => {
      try {
        const data =
          await getAllBookings();

        setBookings(data);
      } catch {
        toast.error(
          "Failed to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };
      const handleStatusUpdate = async (
    bookingId,
    status
  ) => {
    try {
      await updateBookingStatus(
        bookingId,
        status
      );

      toast.success(
        "Booking updated successfully."
      );

      loadBookings();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update booking."
      );
    }
  };

  const filteredBookings =
    useMemo(() => {
      if (statusFilter === "All")
        return bookings;

      return bookings.filter(
        (booking) =>
          booking.status ===
          statusFilter
      );
    }, [bookings, statusFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading Bookings...
        </h2>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-black">
            Manage Bookings
          </h1>

          <p className="mt-3 text-slate-500">
            View and manage all customer bookings.
          </p>

        </div>

        {/* Filters */}

        <div className="mb-8 flex flex-wrap gap-4">

          <button
            onClick={() =>
              setStatusFilter("All")
            }
            className={`rounded-xl px-5 py-2 font-semibold ${
              statusFilter === "All"
                ? "bg-emerald-600 text-white"
                : "bg-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() =>
              setStatusFilter(
                "Confirmed"
              )
            }
            className={`rounded-xl px-5 py-2 font-semibold ${
              statusFilter ===
              "Confirmed"
                ? "bg-emerald-600 text-white"
                : "bg-white"
            }`}
          >
            Confirmed
          </button>

          <button
            onClick={() =>
              setStatusFilter(
                "Cancelled"
              )
            }
            className={`rounded-xl px-5 py-2 font-semibold ${
              statusFilter ===
              "Cancelled"
                ? "bg-red-600 text-white"
                : "bg-white"
            }`}
          >
            Cancelled
          </button>

        </div>
                <div className="overflow-x-auto rounded-3xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left">
                  Reference
                </th>

                <th className="px-6 py-4 text-left">
  Customer
</th>

                <th className="px-6 py-4 text-left">
                  Camp
                </th>

                <th className="px-6 py-4 text-left">
                  Dates
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.map(
                (booking) => (
                  <tr
                    key={booking.id}
                    className="border-t"
                  >

          <td className="px-6 py-5 font-medium">
  {booking.bookingReference}
</td>

<td className="px-6 py-5">
  {booking.userName}
</td>

<td className="px-6 py-5">
  {booking.campName}
</td>

                    <td className="px-6 py-5">
                      <div>
                        <p>
                          {new Date(
                            booking.checkInDate
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-slate-500">
                          to
                        </p>

                        <p>
                          {new Date(
                            booking.checkOutDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-semibold text-emerald-600">
                      ₹{booking.totalAmount}
                    </td>

<td className="px-6 py-5">
  <span
    className={`rounded-full px-4 py-2 text-sm font-semibold ${
      booking.status === "Confirmed"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {booking.status}
  </span>
</td>

                    <td className="px-6 py-5">

                      {booking.status ===
                        "Confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              booking.id,
                              "Cancelled"
                            )
                          }
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}

                      {booking.status ===
                        "Cancelled" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              booking.id,
                              "Confirmed"
                            )
                          }
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Confirm
                        </button>
                      )}

                    </td>

                  </tr>
                )
              )}

              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-slate-500"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default ManageBookingsPage;