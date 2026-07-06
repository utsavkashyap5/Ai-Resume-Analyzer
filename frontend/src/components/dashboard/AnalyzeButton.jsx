import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '../../utils/helpers';

const AnalyzeButton = ({ onClick, analyzing, disabled, progress }) => {
  return (
    <motion.button
      whileHover={!disabled && !analyzing ? { scale: 1.01 } : undefined}
      whileTap={!disabled && !analyzing ? { scale: 0.99 } : undefined}
      onClick={onClick}
      disabled={disabled || analyzing}
      className={cn(
        'relative w-full py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden',
        analyzing
          ? 'bg-[#8B5E3C] text-white cursor-not-allowed'
          : disabled
          ? 'bg-[#E8DDD0] text-[#6B665F] cursor-not-allowed'
          : 'bg-[#8B5E3C] hover:bg-[#6F472D] text-white shadow-sm'
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
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 h-1 bg-[#C89F7B]/50"
        />
      )}
    </motion.button>
  );
};

export default AnalyzeButton;
