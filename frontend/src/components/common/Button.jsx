import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const variants = {
  primary:
    'bg-[#D4A373] hover:bg-[#C89463] text-white shadow-sm hover:shadow-md',
  secondary:
    'bg-[#E7C8A0] hover:bg-[#D4A373] text-[#2D2A26] hover:text-white',
  outline:
    'border border-[#E8DDD0] text-[#2D2A26] hover:bg-[#FAEDCD] hover:border-[#D4A373]',
  ghost:
    'text-[#6B665F] hover:bg-[#FAEDCD] hover:text-[#2D2A26]',
  danger:
    'bg-[#C65A5A] hover:bg-[#B04A4A] text-white shadow-sm hover:shadow-md',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon: Icon,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      type={type}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
        className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#D4A373] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="w-4 h-4" aria-hidden="true" />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
