import { Star } from "lucide-react";

function RatingStars({
  rating = 0,
  size = 22,
  interactive = false,
  onChange,
}) {
  const handleClick = (value) => {
    if (!interactive) return;

    onChange?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          disabled={!interactive}
          className={`transition-transform ${
            interactive
              ? "cursor-pointer hover:scale-110"
              : "cursor-default"
          }`}
        >
          <Star
            size={size}
            className={
              value <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default RatingStars;