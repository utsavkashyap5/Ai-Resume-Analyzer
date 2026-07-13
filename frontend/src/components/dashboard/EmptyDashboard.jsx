import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyDashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FAEDCD] flex items-center justify-center mb-4">
        <BarChart3 className="w-7 h-7 text-[#D4A373]" />
      </div>
      <h3 className="text-sm font-semibold text-[#2D2A26] mb-1">No analyses yet</h3>
      <p className="text-xs text-[#6B665F] max-w-[200px] mb-5">
        Upload your first resume and paste a job description to get started.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4A373] hover:bg-[#C89463] text-white text-sm font-medium rounded-xl transition-colors duration-200"
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default EmptyDashboard;
