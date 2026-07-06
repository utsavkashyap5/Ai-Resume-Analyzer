import { cn } from '../../utils/helpers';

const SkeletonBlock = ({ className }) => (
  <div
    className={cn(
      'animate-pulse rounded-lg bg-[#E8DDD0]/60',
      className
    )}
  />
);

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-6 space-y-3">
            <SkeletonBlock className="h-5 w-3/5" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
            <div className="flex gap-2 pt-2">
              <SkeletonBlock className="h-8 w-20 rounded-full" />
              <SkeletonBlock className="h-8 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-[#FFFCF7] border border-[#E8DDD0]">
            <SkeletonBlock className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-2/5" />
              <SkeletonBlock className="h-3 w-3/5" />
            </div>
            <SkeletonBlock className="h-8 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-2">
        <div className="flex gap-4 p-4 border-b border-[#E8DDD0]">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <SkeletonBlock key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return <SkeletonBlock className={cn('h-4 w-full', className)} />;
};

export default LoadingSkeleton;
