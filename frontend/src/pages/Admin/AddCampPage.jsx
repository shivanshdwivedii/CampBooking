import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CampForm from "../../components/camps/CampForm";

import { addCamp } from "../../features/camps/campThunks";

function AddCampPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading } = useSelector(
        (state) => state.camps
    );

    const handleSubmit = async (formData) => {

        try {

            await dispatch(
                addCamp(formData)
            );

            navigate("/admin/manage-camps");

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-4xl font-black">

                        Add New Camp

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Create a new camping destination.

                    </p>

                </div>

                {/* Form */}

                <CampForm

                    loading={loading}

                    onSubmit={handleSubmit}

                />

            </div>

        </div>

    );

}

export default AddCampPage;