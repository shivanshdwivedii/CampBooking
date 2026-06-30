import { Search, RotateCcw } from "lucide-react";

const categories = [
    "All",
    "Adventure",
    "Mountain",
    "Forest",
    "Beach",
    "Desert",
    "Wildlife"
];

const sortOptions = [
    {
        value: "",
        label: "Default"
    },
    {
        value: "priceAsc",
        label: "Price : Low to High"
    },
    {
        value: "priceDesc",
        label: "Price : High to Low"
    },
    {
        value: "rating",
        label: "Highest Rated"
    }
];

function CampFilters({

    filters,

    onChange,

    onReset

}) {

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        onChange({

            ...filters,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    return (

        <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Filters

                </h2>

                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
                >

                    <RotateCcw size={18} />

                    Reset

                </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                {/* Search */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Search

                    </label>

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-slate-400"
                        />

                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Camp name..."
                            className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
                        />

                    </div>

                </div>

                {/* Location */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Location

                    </label>

                    <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleChange}
                        placeholder="City..."
                        className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                    />

                </div>

                {/* Category */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Category

                    </label>

                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                    >

                        {categories.map(category => (

                            <option
                                key={category}
                                value={category}
                            >

                                {category}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Sort */}

                <div>

                    <label className="mb-2 block font-semibold">

                        Sort

                    </label>

                    <select
                        name="sort"
                        value={filters.sort}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
                    >

                        {sortOptions.map(option => (

                            <option
                                key={option.value}
                                value={option.value}
                            >

                                {option.label}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Available */}

                <div className="flex items-end">

                    <label className="flex cursor-pointer items-center gap-3">

                        <input
                            type="checkbox"
                            name="availableOnly"
                            checked={filters.availableOnly}
                            onChange={handleChange}
                            className="h-5 w-5 accent-emerald-600"
                        />

                        <span className="font-semibold">

                            Available Only

                        </span>

                    </label>

                </div>

            </div>

        </div>

    );

}

export default CampFilters;