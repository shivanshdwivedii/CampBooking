import { AlertTriangle } from "lucide-react";

function ConfirmDialog({

    open,

    title = "Confirmation",

    message = "Are you sure?",

    confirmText = "Confirm",

    cancelText = "Cancel",

    loading = false,

    onConfirm,

    onCancel

}) {

    if (!open)
        return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                {/* Icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                    <AlertTriangle
                        size={40}
                        className="text-red-600"
                    />

                </div>

                {/* Title */}

                <h2 className="mt-6 text-center text-2xl font-bold text-slate-800">

                    {title}

                </h2>

                {/* Message */}

                <p className="mt-3 text-center leading-7 text-slate-500">

                    {message}

                </p>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed"
                    >

                        {cancelText}

                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
                    >

                        {loading
                            ? "Please Wait..."
                            : confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDialog;