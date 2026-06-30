import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import CampForm from "../../components/camps/CampForm";
import Loader from "../../components/common/Loader";

import {
    getCampById,
    updateCamp
} from "../../api/campApi";

function EditCampPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [camp, setCamp] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCamp();

    }, [id]);

    const loadCamp = async () => {

        try {

            setLoading(true);

            const data = await getCampById(id);

            setCamp(data);

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to load camp."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleUpdateCamp = async (formData) => {

        try {

            await updateCamp(id, formData);

            toast.success(

                "Camp updated successfully."

            );

            navigate("/admin/manage-camps");

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to update camp."

            );

        }

    };

    if (loading) {

        return (

            <Loader

                message="Loading Camp..."

            />

        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <section className="bg-slate-900 py-16">

                <div className="mx-auto max-w-7xl px-6">

                    <h1 className="text-4xl font-bold text-white">

                        Edit Camp

                    </h1>

                    <p className="mt-2 text-slate-300">

                        Update your campsite information.

                    </p>

                </div>

            </section>

            {/* Form */}

            <section className="mx-auto max-w-5xl px-6 py-12">

                <div className="rounded-3xl bg-white p-8 shadow-xl">

                    <CampForm

                        initialValues={camp}

                        loading={loading}

                        onSubmit={handleUpdateCamp}

                    />

                </div>

            </section>

        </div>

    );

}

export default EditCampPage;