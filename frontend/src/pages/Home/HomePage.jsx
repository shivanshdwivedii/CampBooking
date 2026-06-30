import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { getAllCamps } from "../../api/campApi";
import CampCard from "../../components/camps/CampCard";

function HomePage() {
  const [featuredCamps, setFeaturedCamps] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFeaturedCamps();
  }, []);

  const loadFeaturedCamps = async () => {
    try {
      const data =
        await getAllCamps();

      const topCamps =
        [...data]
          .sort(
            (a, b) =>
              b.averageRating -
                a.averageRating ||
              b.totalRatings -
                a.totalRatings
          )
          .slice(0, 3);

      setFeaturedCamps(topCamps);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800" />

        <div className="relative mx-auto max-w-7xl px-6 py-28">

          <div className="max-w-3xl">

            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              🌲 Explore Nature Like Never Before
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight text-white">
              Discover Amazing
              <span className="block text-emerald-400">
                Camping Experiences
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-300">
              Book beautiful camps, create unforgettable
              outdoor memories and explore nature with
              confidence.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/camps"
                className="rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600"
              >
                Explore Camps
              </Link>

              <Link
                to="/register"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-emerald-500">
              500+
            </h2>

            <p className="mt-2 text-slate-600">
              Camps Available
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-emerald-500">
              10K+
            </h2>

            <p className="mt-2 text-slate-600">
              Happy Campers
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-emerald-500">
              4.9
            </h2>

            <p className="mt-2 text-slate-600">
              Average Rating
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-emerald-500">
              24/7
            </h2>

            <p className="mt-2 text-slate-600">
              Customer Support
            </p>
          </div>

        </div>

      </section>

      {/* Featured Camps */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-14 text-center">

          <h2 className="text-5xl font-bold text-slate-900">
            Featured Camps
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Handpicked destinations loved by campers
          </p>

        </div>

        {loading ? (

          <div className="py-20 text-center">

            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />

            <p className="mt-5 text-lg font-semibold text-slate-600">
              Loading Featured Camps...
            </p>

          </div>

        ) : featuredCamps.length === 0 ? (

          <div className="rounded-3xl bg-white p-20 text-center shadow-lg">

            <h3 className="text-3xl font-bold">
              No Camps Available
            </h3>

            <p className="mt-4 text-slate-500">
              Featured camps will appear here.
            </p>

          </div>

        ) : (

<div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCamps.map((camp) => (
              <CampCard
                key={camp.id}
                camp={camp}
              />
            ))}

          </div>

        )}

      </section>

      {/* Why Choose Us */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-16 text-center">

            <h2 className="text-5xl font-bold text-slate-900">
              Why Choose CampBooking?
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl border p-8">
              <div className="mb-4 text-5xl">
                🏕️
              </div>

              <h3 className="text-2xl font-bold">
                Best Locations
              </h3>

              <p className="mt-4 text-slate-600">
                Discover handpicked camps in the
                most scenic locations.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <div className="mb-4 text-5xl">
                🔒
              </div>

              <h3 className="text-2xl font-bold">
                Secure Booking
              </h3>

              <p className="mt-4 text-slate-600">
                Reliable and secure reservation
                experience every time.
              </p>
            </div>

            <div className="rounded-3xl border p-8">
              <div className="mb-4 text-5xl">
                ⭐
              </div>

              <h3 className="text-2xl font-bold">
                Verified Reviews
              </h3>

              <p className="mt-4 text-slate-600">
                Read trusted reviews from real
                campers before booking.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-slate-950 py-24 text-center">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-5xl font-bold text-white">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            Join thousands of outdoor enthusiasts
            and start exploring today.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-block rounded-2xl bg-emerald-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
          >
            Start Exploring
          </Link>

        </div>

      </section>

    </div>
  );
}

export default HomePage;