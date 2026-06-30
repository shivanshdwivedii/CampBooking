import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../features/auth/authThunks";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } =
    useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] =
    useState("");

  const handleChange = (e) => {
    setValidationError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setValidationError(
        "Passwords do not match"
      );

      return;
    }

    dispatch(
      register(
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-16 text-white">

          <div className="max-w-md">

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Start Your
              <br />
              Adventure
            </h1>

            <p className="mb-8 text-lg text-slate-300">
              Create your account and
              explore amazing camping
              experiences around the world.
            </p>

            <div className="space-y-5">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="font-semibold">
                  Explore Camps
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  Find beautiful campsites
                  and outdoor adventures.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="font-semibold">
                  Easy Reservations
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  Reserve your stay in just
                  a few clicks.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="font-semibold">
                  Trusted Community
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  Read genuine reviews from
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
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Join CampBooking today
              </p>

            </div>

            {(validationError || error) && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {validationError ||
                  (typeof error === "string"
                    ? error
                    : "Registration failed")}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

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

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            <div className="mt-6 text-center">

              <span className="text-slate-500">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 font-semibold text-slate-900"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default RegisterPage;