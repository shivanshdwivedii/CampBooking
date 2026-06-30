import { Link } from "react-router-dom";

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  color = "bg-blue-600",
  to,
}) => {
  return (
    <Link
      to={to}
      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition p-5"
    >
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white mb-4`}
      >
        {Icon && <Icon size={24} />}
      </div>

      <h3 className="font-bold text-lg text-gray-800">
        {title}
      </h3>

      <p className="text-gray-500 mt-2 text-sm">
        {description}
      </p>
    </Link>
  );
};

export default QuickActionCard;