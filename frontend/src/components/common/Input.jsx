import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({ label, error, icon: Icon, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#2D2A26] mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-[#6B665F]" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-lg border border-[#E8DDD0] bg-[#FFFCF7] px-3 py-2.5 text-sm text-[#2D2A26] placeholder-[#6B665F]/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C]',
            Icon && 'pl-10',
            error && 'border-[#C65A5A] focus:ring-[#C65A5A]/30 focus:border-[#C65A5A]',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-[#C65A5A]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
