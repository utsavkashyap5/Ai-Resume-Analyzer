import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../../utils/helpers';

const AnalyzeButton = ({ onClick, analyzing, disabled, progress }) => {
  return (
    <motion.button
      whileHover={!disabled && !analyzing ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled && !analyzing ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled || analyzing}
      className={cn(
        'relative w-full py-4 px-6 rounded-2xl text-sm font-semibold transition-all duration-300 overflow-hidden',
        analyzing
          ? 'bg-[#D4A373] text-white cursor-not-allowed'
          : disabled
          ? 'bg-[#E8DDD0] text-[#6B665F] cursor-not-allowed'
          : 'bg-[#D4A373] hover:bg-[#C89463] text-white shadow-sm hover:shadow-md'
      )}
    >
      {analyzing ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Analyzing Resume...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>Analyze Resume</span>
        </div>
      )}

      {analyzing && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 h-1 bg-[#E7C8A0]/60 rounded-full"
        />
      )}
    </motion.button>
  );
};

export default AnalyzeButton;
