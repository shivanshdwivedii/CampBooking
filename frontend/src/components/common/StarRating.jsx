import { Star } from "lucide-react";

function StarRating({

    rating = 0,

    totalStars = 5,

    size = 22,

    interactive = false,

    onChange

}) {

    const handleClick = (value) => {

        if (!interactive) return;

        if (onChange) {

            onChange(value);

        }

    };

    return (

        <div className="flex items-center gap-1">

            {Array.from({

                length: totalStars

            }).map((_, index) => {

                const value = index + 1;

                const filled = value <= rating;

                return (

                    <button
                        key={value}
                        type="button"
                        disabled={!interactive}
                        onClick={() =>
                            handleClick(value)
                        }
                        className={`${

                            interactive
                                ? "cursor-pointer transition hover:scale-110"
                                : "cursor-default"

                        }`}
                    >

                        <Star
                            size={size}
                            fill={
                                filled
                                    ? "#FACC15"
                                    : "none"
                            }
                            className={`${

                                filled
                                    ? "text-yellow-400"
                                    : "text-slate-300"

                            }`}
                        />

                    </button>

                );

            })}

        </div>

    );

}

export default StarRating;