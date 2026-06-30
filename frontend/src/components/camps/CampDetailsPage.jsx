import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampById } from "../../api/campApi";
import { getCampRatings } from "../../api/ratingApi";
import RatingDisplay from "../../components/ratings/RatingDisplay";


const amenityIcons = {
  WiFi: "📶",
  Parking: "🚗",
  Food: "🍽",
  "Swimming Pool": "🏊",
  Bonfire: "🔥",
  "Adventure Activities": "🥾",
  "Tent Rentals": "🏕",
  "Clean Washrooms": "🚿",
};

function CampDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();


  
const [camp, setCamp] = useState(null);
const [ratings, setRatings] = useState([]);
const [ratingsLoading, setRatingsLoading] =
  useState(true);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadCamp();
  loadRatings();
}, [id]);

const loadCamp = async () => {
  try {
    const data = await getCampById(id);
    setCamp(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const loadRatings = async () => {
  try {
    const data =
      await getCampRatings(id);

    setRatings(data);
  } catch (error) {
    console.error(error);
  } finally {
    setRatingsLoading(false);
  }
};

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="mt-4 text-xl font-semibold">
            Loading Camp...
          </p>
        </div>
      </div>
    );
  }

  if (!camp) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Camp Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

  

      {/* Hero */}

      <section className="relative h-[500px] overflow-hidden rounded-b-[40px]">

        <img
          src={
            camp.imageUrl
              ? `http://localhost:5121/${camp.imageUrl.replace(/^\/?/, "")}`
              : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
          }
          alt={camp.name}
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-12 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">

          <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            Available Now
          </span>

          <h1 className="mt-6 text-6xl font-bold text-white">
            {camp.name}
          </h1>

         <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-white md:text-base">

  <span className="flex items-center gap-2">
    📍 {camp.location}
  </span>

  <span className="flex items-center gap-2">
    ⭐ {camp.averageRating?.toFixed(1) ?? "0.0"}
  </span>

  <span className="flex items-center gap-2">
    💬 {ratings.length} Reviews
  </span>

  <span className="flex items-center gap-2">
    👥 {camp.availableSeats}/{camp.capacity}
  </span>

  <span className="flex items-center gap-2">
    🏕 {camp.category}
  </span>

</div>

        </div>

      </section>

      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Left Side */}

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold text-slate-900">
              About This Camp
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {camp.description}
            </p>

            {/* Dates */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-5 shadow">

                <h4 className="font-semibold">
                  Start Date
                </h4>

                <p className="mt-2 text-slate-600">
                  {formatDate(camp.startDate)}
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow">

                <h4 className="font-semibold">
                  End Date
                </h4>

                <p className="mt-2 text-slate-600">
                  {formatDate(camp.endDate)}
                </p>

              </div>

            </div>

            {/* Amenities */}
                        <div className="mt-16">

              <h3 className="text-3xl font-bold">
                Amenities
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {camp.amenities?.length > 0 ? (
                  camp.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-lg font-medium text-slate-800">

                        <span className="text-2xl">
                          {amenityIcons[amenity] || "✅"}
                        </span>

                        <span>{amenity}</span>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl bg-white p-6 text-center shadow">

                    <p className="text-slate-500">
                      No amenities available.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* Reviews */}

            <div className="mt-20">

              <h3 className="text-3xl font-bold">
                Guest Reviews
              </h3>

              <div className="mt-8">
  {ratingsLoading ? (
    <div className="rounded-3xl bg-white p-8 text-center shadow">
      Loading Reviews...
    </div>
  ) : (
    <RatingDisplay
      ratings={ratings}
    />
  )}
</div>

            </div>

          </div>

          {/* Booking Card */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-2xl">

              <div className="mb-8">

                <h3 className="text-4xl font-bold text-emerald-600">
                  ₹{camp.pricePerNight}
                </h3>

                <p className="text-slate-500">
                  per night
                </p>

              </div>

              {/* Camp Info */}

              <div className="mt-4 rounded-xl bg-slate-100 p-4 space-y-2">

                <p>
                  <strong>Available Seats:</strong> {camp.availableSeats}
                </p>

                <p>
                  <strong>Category:</strong> {camp.category}
                </p>

                <p>
                  <strong>Location:</strong> {camp.location}
                </p>

              </div>

              {/* Booking Form */}

              <div className="mt-6 space-y-4">

                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-emerald-500"
                />

                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-emerald-500"
                />

                <input
                  type="number"
                  placeholder="Guests"
                  min="1"
                  max={camp.availableSeats}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-emerald-500"
                />

              </div>
                            <button
                onClick={() => navigate(`/booking/${camp.id}`)}
                className="mt-6 w-full rounded-2xl bg-emerald-500 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-emerald-600"
              >
                Reserve Now
              </button>

              <div className="mt-8 border-t pt-6">

                <div className="flex justify-between">
                  <span>Price / Night</span>
                  <span>₹{camp.pricePerNight}</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span>Service Fee</span>
                  <span>₹199</span>
                </div>

                <div className="mt-5 flex justify-between border-t pt-5 text-lg font-bold">
                  <span>Total</span>

                  <span>
                    ₹{Number(camp.pricePerNight) + 199}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default CampDetailsPage;