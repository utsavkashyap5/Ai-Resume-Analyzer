import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Textarea = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#2D2A26] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-[#E8DDD0] bg-[#FFFCF7] px-3 py-2.5 text-sm text-[#2D2A26] placeholder-[#6B665F]/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C] resize-y min-h-[80px]',
          error && 'border-[#C65A5A] focus:ring-[#C65A5A]/30 focus:border-[#C65A5A]',
          className
        )}
        {...props}
      />
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

Textarea.displayName = 'Textarea';

export default Textarea;
