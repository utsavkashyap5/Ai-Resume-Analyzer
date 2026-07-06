import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const PageContainer = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7', className)}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;
