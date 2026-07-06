const HistorySkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#E8DDD0] flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 w-2/5 bg-[#E8DDD0] rounded" />
              <div className="flex gap-3">
                <div className="h-3 w-32 bg-[#E8DDD0] rounded" />
                <div className="h-3 w-16 bg-[#E8DDD0] rounded" />
              </div>
            </div>
            <div className="h-7 w-16 rounded-full bg-[#E8DDD0] flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySkeleton;
