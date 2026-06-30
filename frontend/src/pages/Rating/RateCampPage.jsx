import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import RatingForm from "../../components/ratings/RatingForm";
import { addRating } from "../../api/ratingApi";

function RateCampPage() {
  const { bookingId, campId } =
    useParams();

  const navigate = useNavigate();

  const handleSubmit =
    async (data) => {
      try {
        await addRating({
          bookingId,
          campId,
          stars: data.rating,
          review: data.comment,
        });

        toast.success(
          "Rating submitted."
        );

        navigate("/my-bookings");
      } catch (error) {
        toast.error(
          error?.response?.data ||
            "Failed to submit rating."
        );
      }
    };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <RatingForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default RateCampPage;