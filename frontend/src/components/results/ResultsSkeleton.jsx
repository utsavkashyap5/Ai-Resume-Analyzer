const ResultsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-8 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-[#E8DDD0] mb-4" />
            <div className="h-6 w-32 bg-[#E8DDD0] rounded" />
            <div className="h-4 w-24 bg-[#E8DDD0] rounded mt-2" />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-4">
              <div className="h-4 w-1/4 bg-[#E8DDD0] rounded mb-3" />
              <div className="h-2 w-full bg-[#E8DDD0] rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-6">
        <div className="h-4 w-24 bg-[#E8DDD0] rounded mb-3" />
        <div className="h-4 w-full bg-[#E8DDD0] rounded mb-2" />
        <div className="h-4 w-3/4 bg-[#E8DDD0] rounded" />
      </div>

      <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-6">
        <div className="h-4 w-20 bg-[#E8DDD0] rounded mb-3" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 bg-[#E8DDD0] rounded-full" />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-6">
        <div className="h-4 w-20 bg-[#E8DDD0] rounded mb-3" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-28 bg-[#E8DDD0] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsSkeleton;
