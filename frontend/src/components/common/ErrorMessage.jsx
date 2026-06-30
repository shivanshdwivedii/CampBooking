import { AlertTriangle, RotateCcw } from "lucide-react";

function ErrorMessage({

    message = "Something went wrong.",

    description = "Please try again after some time.",

    onRetry

}) {

    return (

        <div className="flex min-h-[300px] items-center justify-center">

            <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                    <AlertTriangle
                        size={42}
                        className="text-red-600"
                    />

                </div>

                {/* Title */}

                <h2 className="mt-6 text-2xl font-bold text-slate-800">

                    Oops!

                </h2>

                {/* Error */}

                <p className="mt-3 text-lg font-medium text-red-600">

                    {message}

                </p>

                {/* Description */}

                <p className="mt-2 text-slate-500">

                    {description}

                </p>

                {/* Retry */}

                {onRetry && (

                    <button
                        onClick={onRetry}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >

                        <RotateCcw size={18} />

                        Try Again

                    </button>

                )}

            </div>

        </div>

    );

}

export default ErrorMessage;