import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Card = ({ children, className, hover = false, padding = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2 } : undefined}
      className={cn(
        'rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
        padding && 'p-5 sm:p-6',
        hover && 'cursor-pointer transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
