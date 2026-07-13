import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const PageContainer = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8', className)}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;
