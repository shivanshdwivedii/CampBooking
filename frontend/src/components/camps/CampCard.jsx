import {
    MapPin,
    Users,
    Star,
    IndianRupee,
    Pencil,
    Trash2,
    Eye
} from "lucide-react";


import { Link } from "react-router-dom";

function CampCard({
    camp,
    showAdminActions = false,
    onDelete
}) {

    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Camp Image */}

            <div className="relative h-60">

<img
  src={
    camp.imageUrl
      ? camp.imageUrl.startsWith("http")
        ? camp.imageUrl
        : `${import.meta.env.VITE_API_BASE_URL}/${camp.imageUrl.replace(/^\/?/, "")}`
      : "https://placehold.co/600x400?text=Camp"
  }
  alt={camp.name}
  className="h-full w-full object-cover"
/>

                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">

                    {camp.category}

                </span>

            </div>

            {/* Body */}

            <div className="space-y-5 p-6">

                <div>

                    <h2 className="text-2xl font-bold">

                        {camp.name}

                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-slate-500">

                        <MapPin size={18} />

                        <span>

                            {camp.location}

                        </span>

                    </div>

                </div>

                <p className="line-clamp-3 text-slate-600">

                    {camp.description}

                </p>

                {/* Stats */}

                <div className="grid grid-cols-3 gap-4">

                    <div className="rounded-xl bg-slate-100 p-3 text-center">

                        <IndianRupee
                            size={20}
                            className="mx-auto text-emerald-600"
                        />

                        <p className="mt-2 text-xs text-slate-500">

                            Price

                        </p>

                        <h4 className="font-bold">

                            ₹{camp.pricePerNight}

                        </h4>

                    </div>

                    <div className="rounded-xl bg-slate-100 p-3 text-center">

                        <Users
                            size={20}
                            className="mx-auto text-blue-600"
                        />

                        <p className="mt-2 text-xs text-slate-500">

                            Seats

                        </p>

                        <h4 className="font-bold">

                            {camp.availableSeats}/
                            {camp.capacity}

                        </h4>

                    </div>

                    <div className="rounded-xl bg-slate-100 p-3 text-center">

                        <Star
                            size={20}
                            className="mx-auto fill-yellow-400 text-yellow-400"
                        />

                        <p className="mt-2 text-xs text-slate-500">

                            Rating

                        </p>

                        <h4 className="font-bold">

                            {camp.averageRating ?? "0.0"}

                        </h4>

                    </div>

                </div>

                {/* Amenities */}

                <div className="flex flex-wrap gap-2">

                    {camp.amenities?.slice(0, 4).map((amenity) => (

                        <span
                            key={amenity}
                            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                        >

                            {amenity}

                        </span>

                    ))}

                </div>

                {/* Footer */}

                <div className="flex gap-3 pt-3">

                    <Link
                        to={`/camps/${camp.id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >

                        <Eye size={18} />

                        View

                    </Link>

                    {!showAdminActions && (

                        <Link
                            to={`/booking/${camp.id}`}
                            className="flex flex-1 items-center justify-center rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50"
                        >

                            Book Now

                        </Link>

                    )}

                </div>

                {/* Admin Actions */}

                {showAdminActions && (

                    <div className="mt-4 grid grid-cols-2 gap-3">

                        <Link
                            to={`/admin/edit-camp/${camp.id}`}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >

                            <Pencil size={18} />

                            Edit

                        </Link>

                        <button
                            onClick={() => onDelete?.(camp.id)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                        >

                            <Trash2 size={18} />

                            Delete

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default CampCard;