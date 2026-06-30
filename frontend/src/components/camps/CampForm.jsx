import { useEffect, useState } from "react";

import CampImageUpload from "./CampImageUpload";

const initialForm = {
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    capacity: "",
    availableSeats: "",
    startDate: "",
    endDate: "",
    category: "",
    amenities: [],
    image: null,
    imageUrl: ""
};

const availableAmenities = [
    "Parking",
    "WiFi",
    "Food",
    "Swimming Pool",
    "Bonfire",
    "Adventure",
    "Electricity",
    "Washroom",
    "Pets Allowed",
    "Security"
];

function CampForm({
    initialValues = initialForm,
    loading = false,
    onSubmit
}) {

    const [formData, setFormData] = useState({
        
        ...initialForm,
        ...initialValues
        
    })
    const today =
  new Date()
    .toISOString()
    .split("T")[0];

const hasBookings =
  initialValues?.hasBookings ?? false;

    useEffect(() => {

        if (initialValues) {

            setFormData({
                ...initialForm,
                ...initialValues,
                image: null
            });

        }

    }, [initialValues]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleAmenityChange = (amenity) => {

        setFormData((prev) => ({

            ...prev,

            amenities: prev.amenities.includes(
                amenity
            )
                ? prev.amenities.filter(
                      (item) =>
                          item !== amenity
                  )
                : [
                      ...prev.amenities,
                      amenity
                  ]

        }));

    };

    const handleImageChange = (
        file,
        preview
    ) => {

        setFormData((prev) => ({
            ...prev,
            image: file,
            imageUrl: preview
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("Name", formData.name);
        data.append("Location", formData.location);
        data.append("Description", formData.description);
        data.append(
            "PricePerNight",
            formData.pricePerNight
        );
        data.append(
            "Capacity",
            formData.capacity
        );
        data.append(
            "AvailableSeats",
            formData.availableSeats
        );
        data.append(
            "StartDate",
            formData.startDate
        );
        data.append(
            "EndDate",
            formData.endDate
        );
        data.append(
            "Category",
            formData.category
        );

        formData.amenities.forEach(
            (amenity) => {

                data.append(
                    "Amenities",
                    amenity
                );

            }
        );

        if (formData.image) {

            data.append(
                "Image",
                formData.image
            );

        }

        onSubmit(data);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="mb-8 text-3xl font-bold">

                    Camp Details

                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block font-medium">

                            Camp Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Camp Name"
                            className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Location

                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                            required
                        />

                    </div>
                                        <div>

                        <label className="mb-2 block font-medium">

                            Price Per Night

                        </label>

                        <input
                            type="number"
                            name="pricePerNight"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                            placeholder="₹ Price"
                            className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                            min="0"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Capacity

                        </label>

                        <input
  type="number"
  name="capacity"
  value={formData.capacity}
  onChange={handleChange}
  placeholder="Capacity"
  className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
  min="1"
  disabled={hasBookings}
  required
/>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Available Seats

                        </label>

                        <input
  type="number"
  name="availableSeats"
  value={formData.availableSeats}
  onChange={handleChange}
  placeholder="Available Seats"
  className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
  min="0"
  disabled={hasBookings}
  required
/>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Category

                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                            required
                        >

                            <option value="">

                                Select Category

                            </option>

                            <option value="Mountain">

                                Mountain

                            </option>

                            <option value="Forest">

                                Forest

                            </option>

                            <option value="Beach">

                                Beach

                            </option>

                            <option value="Adventure">

                                Adventure

                            </option>

                            <option value="Luxury">

                                Luxury

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Start Date

                        </label>

                        <input
  type="date"
  name="startDate"
  value={formData.startDate}
  onChange={handleChange}
  min={today}
  disabled={hasBookings}
  className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
  required
/>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            End Date

                        </label>

                      <input
  type="date"
  name="endDate"
  value={formData.endDate}
  onChange={handleChange}
  min={formData.startDate || today}
  disabled={hasBookings}
  className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
  required
/>
{hasBookings && (
  <p className="text-sm text-red-500 md:col-span-2">
    This camp already has bookings, so dates and capacity cannot be changed.
  </p>
)}

                    </div>

                </div>

                <div className="mt-8">

                    <label className="mb-2 block font-medium">

                        Description

                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Camp Description..."
                        className="w-full rounded-xl border p-4 outline-none focus:border-emerald-500"
                        required
                    />

                </div>
                                {/* Amenities */}

                <div className="mt-10">

                    <h3 className="mb-4 text-xl font-bold">

                        Amenities

                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {availableAmenities.map((amenity) => (

                            <label
                                key={amenity}
                                className="flex cursor-pointer items-center gap-3 rounded-xl border bg-slate-50 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
                            >

                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(
                                        amenity
                                    )}
                                    onChange={() =>
                                        handleAmenityChange(
                                            amenity
                                        )
                                    }
                                    className="h-5 w-5 accent-emerald-600"
                                />

                                <span className="font-medium">

                                    {amenity}

                                </span>

                            </label>

                        ))}

                    </div>

                </div>

                {/* Image Upload */}

                <div className="mt-10">

                    <CampImageUpload

                        imageUrl={formData.imageUrl}

                        onImageChange={
                            handleImageChange
                        }

                    />

                </div>

            </div>

            {/* Submit */}

            <div className="flex justify-end gap-4">

                <button

                    type="reset"

                    onClick={() =>
                        setFormData(initialForm)
                    }

                    className="rounded-xl border border-slate-300 px-8 py-3 font-semibold transition hover:bg-slate-100"

                >

                    Reset

                </button>

                <button

                    type="submit"

                    disabled={loading}

                    className="rounded-xl bg-emerald-600 px-10 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"

                >

                    {loading

                        ? "Saving..."

                        : initialValues?.id

                            ? "Update Camp"

                            : "Create Camp"}

                </button>

            </div>

        </form>

    );

}

export default CampForm;