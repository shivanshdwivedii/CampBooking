import CampCard from "./CampCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

function CampList({
    camps = [],
    loading = false,
    error = null,
    showAdminActions = false,
    onDelete
}) {

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
            />
        );
    }

    if (camps.length === 0) {
        return (
            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                    alt="No Camps"
                    className="mx-auto h-40"
                />

                <h2 className="mt-6 text-3xl font-bold">

                    No Camps Found

                </h2>

                <p className="mt-3 text-slate-500">

                    Try changing your filters or
                    add a new camp.

                </p>

            </div>
        );
    }

    return (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {camps.map((camp) => (

                <CampCard
                    key={camp.id}
                    camp={camp}
                    showAdminActions={showAdminActions}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );

}

export default CampList;