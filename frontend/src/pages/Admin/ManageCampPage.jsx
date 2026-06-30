import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Plus } from "lucide-react";

import CampList from "../../components/camps/CampList";
import CampFilters from "../../components/camps/CampFilters";

import {
    fetchCamps,
    removeCamp
} from "../../features/camps/campThunks";

function ManageCampPage() {

    const dispatch = useDispatch();

    const {
        camps,
        loading,
        error
    } = useSelector((state) => state.camps);

    const [filters, setFilters] = useState({

        search: "",

        location: "",

        category: "All",

        sort: "",

        availableOnly: false

    });

    useEffect(() => {

        dispatch(fetchCamps());

    }, [dispatch]);

    const handleDelete = (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this camp?"

        );

        if (!confirmed) return;

        dispatch(removeCamp(id));

    };

    const filteredCamps = useMemo(() => {

        let result = [...camps];

        // Search

        if (filters.search) {

            result = result.filter((camp) =>

                camp.name
                    .toLowerCase()
                    .includes(
                        filters.search.toLowerCase()
                    )

            );

        }

        // Location

        if (filters.location) {

            result = result.filter((camp) =>

                camp.location
                    .toLowerCase()
                    .includes(
                        filters.location.toLowerCase()
                    )

            );

        }

        // Category

        if (filters.category !== "All") {

            result = result.filter(

                (camp) =>
                    camp.category ===
                    filters.category

            );

        }

        // Available

        if (filters.availableOnly) {

            result = result.filter(

                (camp) =>
                    camp.availableSeats > 0

            );

        }

        // Sorting

        switch (filters.sort) {

            case "priceAsc":

                result.sort(
                    (a, b) =>
                        a.pricePerNight -
                        b.pricePerNight
                );

                break;

            case "priceDesc":

                result.sort(
                    (a, b) =>
                        b.pricePerNight -
                        a.pricePerNight
                );

                break;

            case "rating":

                result.sort(
                    (a, b) =>
                        b.averageRating -
                        a.averageRating
                );

                break;

            default:

                break;

        }

        return result;

    }, [camps, filters]);

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Header */}

                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-4xl font-black">

                            Manage Camps

                        </h1>

                        <p className="mt-3 text-slate-500">

                            View, edit and manage all camps.

                        </p>

                    </div>

                    <Link
                        to="/admin/add-camp"
                        className="inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >

                        <Plus size={20} />

                        Add Camp

                    </Link>

                </div>

                {/* Filters */}

                <CampFilters

                    filters={filters}

                    onChange={setFilters}

                    onReset={() =>
                        setFilters({

                            search: "",

                            location: "",

                            category: "All",

                            sort: "",

                            availableOnly: false

                        })
                    }

                />

                {/* Camp List */}

                <div className="mt-10">

                    <CampList

                        camps={filteredCamps}

                        loading={loading}

                        error={error}

                        showAdminActions

                        onDelete={handleDelete}

                    />

                </div>

            </div>

        </div>

    );

}

export default ManageCampPage;