import { cn } from '../../utils/helpers';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const Spinner = ({ size = 'md', className }) => {
  return (
    <div
      className={cn(
        'border-2 border-[#E8DDD0] border-t-[#8B5E3C] rounded-full animate-spin',
        sizes[size],
        className
      )}
    />
  );
};

export default Spinner;
