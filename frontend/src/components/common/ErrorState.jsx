import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ title, message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-[#C65A5A]/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-[#C65A5A]" />
      </div>
      <h3 className="text-lg font-semibold text-[#2D2A26] mb-1">{title || 'Something went wrong'}</h3>
      {message && (
        <p className="text-sm text-[#6B665F] text-center max-w-sm mb-6">{message}</p>
      )}
      {onRetry && (
        <Button variant="primary" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
