import { motion } from 'framer-motion';
import { BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const EmptyDashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-[#E8DDD0]/50 flex items-center justify-center mb-3">
        <BarChart3 className="w-7 h-7 text-[#6B665F]" />
      </div>
      <h3 className="text-sm font-semibold text-[#2D2A26] mb-1">No analyses yet</h3>
      <p className="text-xs text-[#6B665F] max-w-[200px] mb-4">
        Upload your first resume and paste a job description to get started.
      </p>
      <Button size="sm" variant="outline" icon={ArrowRight} onClick={() => navigate('/dashboard')}>
        Get Started
      </Button>
    </motion.div>
  );
};

export default EmptyDashboard;
