import { useEffect, useState } from "react";
import {
  getAllCamps,
  searchCamps,
} from "../../api/campApi";
import CampCard from "../../components/camps/CampCard";
import toast from "react-hot-toast";

function CampsPage() {
  const [search, setSearch] = useState("");
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const today =
    new Date().toISOString().split("T")[0];

  const tomorrow =
    new Date(
      Date.now() + 86400000
    )
      .toISOString()
      .split("T")[0];

  const [checkInDate, setCheckInDate] =
    useState(today);

  const [checkOutDate, setCheckOutDate] =
    useState(tomorrow);

  const [capacity, setCapacity] =
    useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCamps();
  }, []);

  const loadCamps = async () => {
    try {
      setLoading(true);

      const data =
        await getAllCamps();

      setCamps(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      if (
        checkOutDate <= checkInDate
      ) {
        toast.error(
          "Check-out date must be after check-in date."
        );
        return;
      }

      setLoading(true);

      const data =
        await searchCamps({
          location: search,
          checkInDate,
          checkOutDate,
          capacity,
          page: 1,
          pageSize: 20,
        });

      setCamps(data);

      if (data.length === 0) {
        toast(
          "No camps found for selected dates."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to search camps."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredCamps = camps;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />

          <p className="mt-5 text-xl font-semibold text-slate-700">
            Loading Camps...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="relative overflow-hidden bg-slate-950 pb-32 pt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full bg-emerald-500/20 px-5 py-2 text-sm font-medium text-emerald-400">
            Discover Your Next Adventure
          </span>

          <h1 className="mt-8 text-6xl font-bold text-white">
            Explore Amazing
            <span className="block text-emerald-400">
              Camping Destinations
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Browse premium campsites, book
            unforgettable outdoor experiences
            and create lifelong memories.
          </p>
        </div>
      </section>

      {/* Search */}

      <section className="relative z-10 mx-auto mt-16 max-w-6xl px-6">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search Camps..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            />

            <input
              type="date"
              min={today}
              value={checkInDate}
              onChange={(e) =>
                setCheckInDate(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            />

            <input
              type="date"
              min={checkInDate}
              value={checkOutDate}
              onChange={(e) =>
                setCheckOutDate(
                  e.target.value
                )
              }
              className="rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            />

            <input
              type="number"
              placeholder="Guests"
              value={capacity}
              min={0}
              onChange={(e) =>
                setCapacity(
                  Number(
                    e.target.value
                  )
                )
              }
              className="rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-emerald-500"
            />

            <button
              onClick={handleSearch}
              className="rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-600"
            >
              Search Camps
            </button>
          </div>
        </div>
      </section>

      {/* Header */}

      <section className="mx-auto max-w-7xl px-6 pt-20">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Available Camps
            </h2>

            <p className="mt-2 text-slate-500">
              Find the perfect destination for
              your next trip.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-3 shadow">
            <span className="font-semibold">
              {filteredCamps.length}
            </span>{" "}
            Camps Found
          </div>
        </div>
      </section>

      {/* Camps */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {filteredCamps.length === 0 ? (
          <div className="rounded-3xl bg-white p-20 text-center shadow-lg">
            <h3 className="text-3xl font-bold">
              No Camps Found
            </h3>

            <p className="mt-4 text-slate-500">
              Try changing your search
              criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredCamps.map((camp) => (
              <CampCard
                key={camp.id}
                camp={camp}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}

      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-bold text-white">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            Explore premium camps and
            experience nature like never
            before.
          </p>

          <button className="mt-10 rounded-2xl bg-emerald-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600">
            Start Exploring
          </button>
        </div>
      </section>
    </div>
  );
}

export default CampsPage;