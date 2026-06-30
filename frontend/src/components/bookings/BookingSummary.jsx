import {
    CalendarDays,
    IndianRupee,
    ShieldCheck,
    Moon,
} from "lucide-react";

function BookingSummary({
    camp,
    totalNights,
    subtotal,
    serviceFee,
    total,
}) {
    return (
        <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-xl">

            {/* Camp Image */}

            <img
  src={
    camp?.imageUrl
      ? `http://localhost:5121/${camp.imageUrl.replace(/^\/?/, "")}`
      : "https://placehold.co/600x400?text=Camp"
  }
  alt={camp?.name}
  className="h-56 w-full object-cover"
/>

            <div className="p-8">

                <h2 className="text-2xl font-bold">
                    {camp?.name}
                </h2>

                <p className="mt-2 text-slate-500">
                    {camp?.description}
                </p>

                <div className="mt-8 space-y-5">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <IndianRupee
                                size={18}
                            />

                            Price / Night

                        </div>

                        <span className="font-semibold">
                            ₹{camp?.pricePerNight}
                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <Moon
                                size={18}
                            />

                            Nights

                        </div>

                        <span className="font-semibold">
                            {totalNights}
                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <CalendarDays
                                size={18}
                            />

                            Subtotal

                        </div>

                        <span className="font-semibold">
₹{subtotal.toLocaleString()}                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span>
                            Service Fee
                        </span>

                        <span className="font-semibold">
₹{serviceFee.toLocaleString()}                        </span>

                    </div>

                </div>

                <div className="mt-6 border-t pt-6">

                    <div className="flex items-center justify-between">

                        <h3 className="text-xl font-bold">
                            Total
                        </h3>

                        <h3 className="text-2xl font-black text-emerald-600">
₹{total.toLocaleString()}                        </h3>

                    </div>

                </div>

                <div className="mt-8 rounded-2xl bg-emerald-50 p-5">

                    <div className="flex items-center gap-3">

                        <ShieldCheck
                            className="text-emerald-600"
                        />

                        <span className="font-semibold text-emerald-700">

                            What's Included

                        </span>

                    </div>

                    <ul className="mt-5 space-y-3 text-slate-600">

                        <li>✓ Campfire Access</li>

                        <li>✓ Free Parking</li>

                        <li>✓ Hiking Trails</li>

                        <li>✓ Washroom Facilities</li>

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default BookingSummary;