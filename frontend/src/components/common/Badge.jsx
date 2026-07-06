import { cn } from '../../utils/helpers';

const variants = {
  default: 'bg-[#E8DDD0] text-[#6B665F]',
  primary: 'bg-[#8B5E3C]/10 text-[#8B5E3C]',
  success: 'bg-[#4F7D5C]/10 text-[#4F7D5C]',
  warning: 'bg-[#D9A441]/10 text-[#D9A441]',
  error: 'bg-[#C65A5A]/10 text-[#C65A5A]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({ children, variant = 'default', size = 'md', className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
