import RatingStars from "./RatingStars";

function RatingDisplay({ ratings = [] }) {
  if (ratings.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow">
        <h4 className="text-xl font-semibold">
          No Reviews Yet
        </h4>

        <p className="mt-3 text-slate-500">
          Be the first one to review this camp.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {ratings.map((rating) => (
        <div
          key={rating.id}
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {rating.userName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {new Date(
                  rating.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <RatingStars
              rating={rating.stars}
            />
          </div>

          <div className="mt-5">
            <p className="leading-7 text-slate-600">
              {rating.review ||
                "No comment provided."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RatingDisplay;