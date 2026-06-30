import { ArrowUpRight } from "lucide-react";

function DashboardCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-emerald-600",
  iconBg = "bg-emerald-100",
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${iconBg}
          `}
        >
          <Icon
            size={28}
            className={iconColor}
          />
        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 text-sm text-emerald-600">

        <ArrowUpRight
          size={16}
        />

        <span>
          Updated just now
        </span>

      </div>
    </div>
  );
}

export default DashboardCard;