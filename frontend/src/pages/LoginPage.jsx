import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../features/auth/authThunks";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } =
    useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      login(formData, navigate)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-slate-900 px-16 text-white">
          <div className="max-w-md">

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Welcome Back
            </h1>

            <p className="mb-8 text-lg text-slate-300">
              Continue your camping journey
              and manage all your bookings
              from one place.
            </p>

            <div className="space-y-5">

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">
                  Easy Camp Discovery
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Browse beautiful camps
                  and outdoor experiences.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">
                  Secure Booking
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Book with confidence and
                  manage reservations easily.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="font-semibold">
                  Real Reviews
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Read experiences shared by
                  fellow campers.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

            <div className="mb-8 text-center">

              <h2 className="text-3xl font-bold text-slate-900">
                Login
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to your account
              </p>

            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {typeof error === "string"
                  ? error
                  : "Login failed"}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <div className="mt-6 text-center">

              <span className="text-slate-500">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="ml-2 font-semibold text-slate-900"
              >
                Register
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;