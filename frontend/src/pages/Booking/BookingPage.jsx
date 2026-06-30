import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import BookingSummary from "../../components/bookings/BookingSummary";

import { createBooking } from "../../api/bookingApi";
import { getCampById } from "../../api/campApi";

function BookingPage() {
    const navigate = useNavigate();

    const { campId } = useParams();

    const [camp, setCamp] = useState(null);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [bookingData, setBookingData] =
        useState({
            checkInDate: "",
            checkOutDate: "",
            guests: 1,
            billingAddress: "",
            phoneNumber: "",
        });

    useEffect(() => {
        const loadCamp = async () => {
            try {
                const data =
                    await getCampById(campId);

                setCamp(data);
            } catch {
                toast.error(
                    "Unable to load camp."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCamp();
    }, [campId]);

    const totalNights = useMemo(() => {
        if (
            !bookingData.checkInDate ||
            !bookingData.checkOutDate
        )
            return 0;

        const start = new Date(
            bookingData.checkInDate
        );

        const end = new Date(
            bookingData.checkOutDate
        );

        const diff =
            (end - start) /
            (1000 * 60 * 60 * 24);

        return diff > 0 ? diff : 0;
    }, [
        bookingData.checkInDate,
        bookingData.checkOutDate,
    ]);

    const subtotal =
        totalNights *
        (camp?.pricePerNight ?? 0);

    const serviceFee =
        subtotal > 0 ? 299 : 0;

    const total =
        subtotal + serviceFee;

    const handleChange = (e) => {
        setBookingData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookingData.checkInDate) {
            toast.error(
                "Please select check in date."
            );
            return;
        }

        if (!bookingData.checkOutDate) {
            toast.error(
                "Please select check out date."
            );
            return;
        }

        if (
            !bookingData.billingAddress.trim()
        ) {
            toast.error(
                "Billing address is required."
            );
            return;
        }

        if (
            !bookingData.phoneNumber.trim()
        ) {
            toast.error(
                "Phone number is required."
            );
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                campId,

                checkInDate:
                    bookingData.checkInDate,

                checkOutDate:
                    bookingData.checkOutDate,
guests: bookingData.guests,
                billingAddress:
                    bookingData.billingAddress,

                phoneNumber:
                    bookingData.phoneNumber,
            };

            const result =
                await createBooking(payload);

            toast.success(
                "Booking created successfully."
            );

navigate("/confirmation", {
  state: {
    bookingReference:
      result.bookingReference,
  },
});
        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                    "Booking failed."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">

                <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

            </div>
        );
    }

    if (!camp) {
        return (
            <div className="flex min-h-screen items-center justify-center">

                <h2 className="text-2xl font-bold">
                    Camp not found.
                </h2>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">



    {/* Header */}

    <section className="bg-slate-950">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-8 py-16 lg:flex-row lg:items-center">

            <div>

                <p className="text-lg font-medium text-emerald-400">
                    Booking
                </p>

                <h1 className="mt-3 text-5xl font-black text-white">
                    Complete Your Reservation
                </h1>

                <p className="mt-5 max-w-2xl text-lg text-slate-300">

                    Reserve your camping experience
                    safely and securely.

                </p>

            </div>

        </div>

    </section>

    {/* Main */}

    <section className="mx-auto max-w-7xl px-8 py-12">

        <div className="grid gap-10 lg:grid-cols-3">

            {/* LEFT */}

            <div className="lg:col-span-2">

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="text-3xl font-bold">

                        Booking Information

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Fill in your details to
                        confirm your booking.

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block font-medium">

                                    Check In

                                </label>

                             <input
  type="date"
  name="checkInDate"
  min={camp.startDate}
  max={camp.endDate}
  value={bookingData.checkInDate}
  onChange={handleChange}
  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-emerald-500"
/>

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">

                                    Check Out

                                </label>

                          <input
  type="date"
  name="checkOutDate"
  min={
    bookingData.checkInDate
      ? bookingData.checkInDate
      : camp.startDate
  }
  max={camp.endDate}
  value={bookingData.checkOutDate}
  onChange={handleChange}
  className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-emerald-500"
/>

                            </div>

                        </div>

                        <div>
  <label className="mb-2 block font-medium">
    Number of Guests
  </label>

  <input
    type="number"
    name="guests"
    min="1"
    max={camp.availableSeats}
    value={bookingData.guests}
    onChange={handleChange}
    className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-emerald-500"
  />

  <p className="mt-2 text-sm text-slate-500">
    Available Seats: {camp.availableSeats}
  </p>
</div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Billing Address

                            </label>

                            <textarea
                                rows="4"
                                name="billingAddress"
                                value={bookingData.billingAddress}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-emerald-500"
                                placeholder="Enter your billing address"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Phone Number

                            </label>

                            <input
                                type="text"
                                name="phoneNumber"
                                value={bookingData.phoneNumber}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-emerald-500"
                                placeholder="9876543210"
                            />

                        </div>

                        <button
                            disabled={submitting}
                            className="w-full rounded-2xl bg-emerald-500 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {submitting
                                ? "Creating Booking..."
                                : "Confirm Booking"}

                        </button>

                    </form>

                </div>

            </div>
                        {/* RIGHT */}

            <div>

                <BookingSummary
                    camp={camp}
                    totalNights={totalNights}
                    subtotal={subtotal}
                    serviceFee={serviceFee}
                    total={total}
                />

                <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

                    <h3 className="text-2xl font-bold">

                        Booking Guidelines

                    </h3>

                    <div className="mt-6 space-y-5 text-slate-600">

                        <div className="flex gap-3">

                            <div className="mt-2 h-3 w-3 rounded-full bg-emerald-500"></div>

                            <p>

                                Check-in starts from
                                <span className="font-semibold">
                                    {" "}02:00 PM
                                </span>

                            </p>

                        </div>

                        <div className="flex gap-3">

                            <div className="mt-2 h-3 w-3 rounded-full bg-blue-500"></div>

                            <p>

                                Check-out before
                                <span className="font-semibold">
                                    {" "}11:00 AM
                                </span>

                            </p>

                        </div>

                        <div className="flex gap-3">

                            <div className="mt-2 h-3 w-3 rounded-full bg-orange-500"></div>

                            <p>

                                Cancellation is allowed
                                before the check-in date.

                            </p>

                        </div>

                        <div className="flex gap-3">

                            <div className="mt-2 h-3 w-3 rounded-full bg-pink-500"></div>

                            <p>

                                Carry a valid government
                                ID during check-in.

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

export default BookingPage;