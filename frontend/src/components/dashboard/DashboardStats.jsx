import {
  Tent,
  CalendarCheck,
  Users,
  IndianRupee,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

const DashboardStats = ({ stats }) => {

  const icons = [
    <Tent size={28} />,
    <CalendarCheck size={28} />,
    <Users size={28} />,
    <IndianRupee size={28} />,
  ];

  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-orange-500",
    "bg-purple-600",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats?.map((item, index) => (

        <DashboardCard
          key={index}
          title={item.title}
          value={item.value}
          icon={icons[index]}
          color={colors[index]}
        />

      ))}

    </div>
  );
};

export default DashboardStats;