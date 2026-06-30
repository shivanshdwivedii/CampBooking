import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getBooking } from "../../api/bookingApi";

function ManageBookingPage() {
  const { bookingReference } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, [bookingReference]);

  const loadBooking = async () => {
    try {
      const data = await getBooking(
        bookingReference
      );

      setBooking(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load booking.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading Booking...
        </h2>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Booking Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="mb-8 text-4xl font-bold">
            Manage Booking
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Camp Name
              </p>

              <h2 className="text-xl font-semibold">
                {booking.campName}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Booking Reference
              </p>

              <h2 className="font-semibold text-emerald-600">
                {booking.bookingReference}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Check In
              </p>

              <h2 className="font-semibold">
                {new Date(
                  booking.checkInDate
                ).toLocaleDateString("en-GB")}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Check Out
              </p>

              <h2 className="font-semibold">
                {new Date(
                  booking.checkOutDate
                ).toLocaleDateString("en-GB")}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Nights
              </p>

              <h2 className="font-semibold">
                {booking.totalNights}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Amount
              </p>

              <h2 className="font-semibold text-emerald-600">
                ₹ {booking.totalAmount}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Billing Address
              </p>

              <h2 className="font-semibold">
                {booking.billingAddress}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Phone Number
              </p>

              <h2 className="font-semibold">
                {booking.phoneNumber}
              </h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {booking.status}
              </span>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              to="/my-bookings"
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBookingPage;