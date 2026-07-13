import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryEmpty = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FAEDCD] flex items-center justify-center mb-5">
        <Clock className="w-8 h-8 text-[#D4A373]" />
      </div>
      <h3 className="text-lg font-semibold text-[#2D2A26] mb-1">No analysis history</h3>
      <p className="text-sm text-[#6B665F] max-w-sm mb-6">
        You haven&apos;t analyzed any resumes yet. Upload a resume and run your first analysis.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#D4A373] hover:bg-[#C89463] text-white text-sm font-medium rounded-xl transition-colors duration-200"
      >
        Go to Dashboard
      </button>
    </motion.div>
  );
};

export default HistoryEmpty;
