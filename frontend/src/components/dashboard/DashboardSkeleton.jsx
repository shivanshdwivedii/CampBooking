const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">

      <div className="bg-gray-200 rounded-xl h-28"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-gray-200 rounded-xl h-36"
          />
        ))}

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-gray-200 rounded-xl h-80"></div>

        <div className="bg-gray-200 rounded-xl h-80"></div>

      </div>

    </div>
  );
};

export default DashboardSkeleton;