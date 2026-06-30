import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
    getMyBookings,
    cancelBooking
} from "../../api/bookingApi";

function MyBookingsPage() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [cancelLoading, setCancelLoading] =
        useState(null);
        const navigate = useNavigate();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const data =
                await getMyBookings();

            setBookings(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCancelBooking = async (
        bookingReference
    ) => {

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this booking?"
            );

        if (!confirmCancel)
            return;

        try {

            setCancelLoading(
                bookingReference
            );

            await cancelBooking(
                bookingReference
            );

            await loadBookings();

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data ||
                "Unable to cancel booking."
            );

        } finally {

            setCancelLoading(null);

        }

    };

    const formatDate = (date) => {

        return new Date(date)
            .toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />

                    <p className="mt-5 text-lg font-semibold">

                        Loading Your Bookings...

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

           

            <section className="mx-auto max-w-7xl px-6 py-12">

                <div className="mb-10">

                    <h1 className="text-5xl font-bold">

                        My Bookings

                    </h1>

                    <p className="mt-3 text-slate-600">

                        View and manage all your camp bookings.

                    </p>

                </div>
                                {bookings.length === 0 ? (

                    <div className="rounded-3xl bg-white p-16 text-center shadow">

                        <h2 className="text-3xl font-bold">

                            No Bookings Yet

                        </h2>

                        <p className="mt-4 text-slate-500">

                            You haven't booked any camps yet.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8">

                        {bookings.map((booking) => (

                            <div
                                key={booking.bookingReference}
                                className="rounded-3xl bg-white p-8 shadow transition hover:shadow-xl"
                            >

                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Left */}

                                    <div>

                                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                                            {booking.status}

                                        </span>

                                        <h2 className="mt-5 text-3xl font-bold">

                                            {booking.campName}

                                        </h2>

                                        <p className="mt-2 text-slate-500">

                                            Booking Ref :
                                            <span className="ml-2 font-semibold">

                                                {booking.bookingReference}

                                            </span>

                                        </p>

                                    </div>

                                    {/* Right */}

                                    <div className="grid gap-4 sm:grid-cols-2">

                                        <div className="rounded-2xl bg-slate-100 p-4">

                                            <h4 className="font-semibold">

                                                Check In

                                            </h4>

                                            <p className="mt-2">

                                                {formatDate(
                                                    booking.checkInDate
                                                )}

                                            </p>

                                        </div>

                                        <div className="rounded-2xl bg-slate-100 p-4">

                                            <h4 className="font-semibold">

                                                Check Out

                                            </h4>

                                            <p className="mt-2">

                                                {formatDate(
                                                    booking.checkOutDate
                                                )}

                                            </p>

                                        </div>
                                                                                <div className="rounded-2xl bg-slate-100 p-4">

                                            <h4 className="font-semibold">

                                                Total Nights

                                            </h4>

                                            <p className="mt-2">

                                                {booking.totalNights} Night(s)

                                            </p>

                                        </div>

                                        <div className="rounded-2xl bg-slate-100 p-4">

                                            <h4 className="font-semibold">

                                                Total Amount

                                            </h4>

                                            <p className="mt-2 text-lg font-bold text-emerald-600">

                                                ₹{booking.totalAmount}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* Additional Details */}

                                <div className="mt-8 grid gap-4 md:grid-cols-2">

                                    <div className="rounded-2xl border border-slate-200 p-5">

                                        <h4 className="font-semibold text-slate-800">

                                            Billing Address

                                        </h4>

                                        <p className="mt-2 text-slate-600">

                                            {booking.billingAddress}

                                        </p>

                                    </div>

                                    <div className="rounded-2xl border border-slate-200 p-5">

                                        <h4 className="font-semibold text-slate-800">

                                            Phone Number

                                        </h4>

                                        <p className="mt-2 text-slate-600">

                                            {booking.phoneNumber}

                                        </p>

                                    </div>

                                </div>

                                {/* Footer */}

<div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <span className="text-sm text-slate-500">
      Booking Status
    </span>

    <div className="mt-2">
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          booking.status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : booking.status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : booking.status === "Cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-slate-100 text-slate-700"
        }`}
      >
        {booking.status}
      </span>
    </div>
  </div>

  <div className="flex flex-wrap gap-3">
    <Link
      to={`/manage-booking/${booking.bookingReference}`}
      className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
    >
      Manage Booking
    </Link>


{booking.status === "Confirmed" &&
  new Date(booking.checkOutDate) < new Date() && (
    <Link
      to={`/rate/${booking.id}/${booking.campId}`}
      className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
    >
      ⭐ Rate Camp
    </Link>
)}

    {booking.status !== "Cancelled" && (
      <button
        onClick={() =>
          handleCancelBooking(
            booking.bookingReference
          )
        }
        disabled={
          cancelLoading ===
          booking.bookingReference
        }
        className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
      >
        {cancelLoading === booking.bookingReference
          ? "Cancelling..."
          : "Cancel Booking"}
      </button>
    )}
  </div>
  
</div>

                            </div>

                        ))}

                    </div>

                )}
                            </section>

        </div>

    );

}

export default MyBookingsPage;