import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();

  const bookingReference = location.state?.bookingReference;

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <CheckCircle
            size={80}
            className="text-green-500"
          />
        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          Booking Confirmed!
        </h1>

        <p className="mt-4 text-slate-600">
          Your camp booking has been completed successfully.
          We look forward to welcoming you on your adventure.
        </p>

        {bookingReference && (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm text-slate-500">
              Booking Reference
            </p>

            <p className="mt-2 text-lg font-bold text-emerald-700">
              {bookingReference}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/my-bookings"
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            My Bookings
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;