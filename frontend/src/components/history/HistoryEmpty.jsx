import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const HistoryEmpty = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#E8DDD0]/50 flex items-center justify-center mb-4">
        <Clock className="w-8 h-8 text-[#6B665F]" />
      </div>
      <h3 className="text-lg font-semibold text-[#2D2A26] mb-1">No analysis history</h3>
      <p className="text-sm text-[#6B665F] max-w-sm mb-6">
        You haven&apos;t analyzed any resumes yet. Upload a resume and run your first analysis.
      </p>
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </motion.div>
  );
};

export default HistoryEmpty;
