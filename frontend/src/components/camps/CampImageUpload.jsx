import { useEffect, useRef, useState } from "react";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";

function CampImageUpload({
    imageUrl = "",
    onImageChange
}) {

    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(imageUrl);

    useEffect(() => {
        setPreview(imageUrl);
    }, [imageUrl]);

    const handleFileChange = (event) => {

        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");

            return;

        }

        // Preview only
        const previewUrl = URL.createObjectURL(file);

        setPreview(previewUrl);

        // Send file + preview to parent
        onImageChange?.(file, previewUrl);

    };

    const handleRemove = () => {

        setPreview("");

        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

        onImageChange?.(null, "");

    };

    return (

        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-xl font-bold">

                        Camp Image

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                        Upload an image for this camp.

                    </p>

                </div>

                {preview && (

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                    >

                        <Trash2 size={20} />

                    </button>

                )}

            </div>

            <div className="mt-6">

                {preview ? (

                    <img
                        src={preview}
                        alt="Camp Preview"
                        className="h-52 w-full rounded-2xl object-cover"
                    />

                ) : (

                    <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">

                        <ImageIcon
                            size={60}
                            className="text-slate-300"
                        />

                        <p className="mt-4 text-slate-500">

                            No Image Selected

                        </p>

                    </div>

                )}

            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >

                <Upload size={20} />

                {preview
                    ? "Change Image"
                    : "Upload Image"}

            </button>

        </div>

    );

}

export default CampImageUpload;