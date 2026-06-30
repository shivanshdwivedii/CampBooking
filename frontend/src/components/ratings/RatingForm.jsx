import { useState } from "react";
import RatingStars from "./RatingStars";

function RatingForm({
  loading = false,
  onSubmit,
}) {
  const [stars, setStars] =
    useState(5);

  const [review, setReview] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const validate = () => {
    const newErrors = {};

    if (stars === 0) {
      newErrors.stars =
        "Please select a rating.";
    }

    if (
      review.trim() &&
      review.trim().length < 10
    ) {
      newErrors.review =
        "Review must contain at least 10 characters.";
    }

    if (review.length > 500) {
      newErrors.review =
        "Review cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit?.({
      stars,
      review: review.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-8 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Rate Your Experience
      </h2>

      <p className="mt-2 text-slate-500">
        Share your feedback to help other campers.
      </p>

      <div className="mt-8">
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Rating
        </label>

        <RatingStars
          rating={stars}
          interactive
          onChange={setStars}
          size={34}
        />

        {errors.stars && (
          <p className="mt-2 text-sm text-red-600">
            {errors.stars}
          </p>
        )}
      </div>

      <div className="mt-8">
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Review
        </label>

        <textarea
          rows={5}
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          placeholder="Tell us about your camping experience..."
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        <div className="mt-2 flex justify-between">
          {errors.review ? (
            <span className="text-sm text-red-600">
              {errors.review}
            </span>
          ) : (
            <span className="text-sm text-slate-400">
              Optional (max 500 characters)
            </span>
          )}

          <span className="text-sm text-slate-500">
            {review.length}/500
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading
          ? "Submitting..."
          : "Submit Rating"}
      </button>
    </form>
  );
}

export default RatingForm;