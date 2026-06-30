import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function Pagination({

    currentPage,

    totalPages,

    onPageChange

}) {

    if (totalPages <= 1)
        return null;

    const handlePrevious = () => {

        if (currentPage > 1) {

            onPageChange(currentPage - 1);

        }

    };

    const handleNext = () => {

        if (currentPage < totalPages) {

            onPageChange(currentPage + 1);

        }

    };

    const pages = [];

    for (

        let page = 1;

        page <= totalPages;

        page++

    ) {

        pages.push(page);

    }

    return (

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

            {/* Previous */}

            <button

                onClick={handlePrevious}

                disabled={currentPage === 1}

                className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

            >

                <ChevronLeft size={18} />

                Previous

            </button>

            {/* Pages */}

            {

                pages.map((page) => (

                    <button

                        key={page}

                        onClick={() =>

                            onPageChange(page)

                        }

                        className={`h-11 w-11 rounded-xl font-semibold transition ${

                            currentPage === page

                                ? "bg-emerald-600 text-white"

                                : "border border-slate-300 bg-white hover:bg-slate-100"

                        }`}

                    >

                        {page}

                    </button>

                ))

            }

            {/* Next */}

            <button

                onClick={handleNext}

                disabled={

                    currentPage === totalPages

                }

                className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

            >

                Next

                <ChevronRight size={18} />

            </button>

        </div>

    );

}

export default Pagination;