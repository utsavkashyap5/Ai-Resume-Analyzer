import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/helpers';

const RecentAnalysisCard = ({ analysis, index }) => {
  const navigate = useNavigate();

  const fileName = analysis.resumeId?.fileName || 'Unknown Resume';
  const atsScore = analysis.analysisResult?.atsScore || analysis.analysisResult?.score || 'N/A';
  const createdAt = analysis.createdAt
    ? new Date(analysis.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const getScoreColor = () => {
    if (typeof atsScore !== 'number') return 'text-[#6B665F]';
    if (atsScore >= 80) return 'text-[#4F7D5C]';
    if (atsScore >= 60) return 'text-[#D9A441]';
    return 'text-[#C65A5A]';
  };

  const getScoreBg = () => {
    if (typeof atsScore !== 'number') return 'bg-[#6B665F]/10';
    if (atsScore >= 80) return 'bg-[#4F7D5C]/10';
    if (atsScore >= 60) return 'bg-[#D9A441]/10';
    return 'bg-[#C65A5A]/10';
  };

  const handleClick = () => {
    navigate('/results', { state: { analysis } });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      onClick={handleClick}
      className="w-full text-left rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] p-4 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#E8DDD0]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B5E3C]/10 transition-colors">
          <FileText className="w-5 h-5 text-[#6B665F] group-hover:text-[#8B5E3C] transition-colors" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#2D2A26] truncate">{fileName}</p>
          {createdAt && (
            <p className="text-xs text-[#6B665F] mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {createdAt}
            </p>
          )}
        </div>

        <div className={cn('flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', getScoreBg(), getScoreColor())}>
          <TrendingUp className="w-3 h-3" />
          {typeof atsScore === 'number' ? atsScore : atsScore}
        </div>
      </div>
    </motion.button>
  );
};

export default RecentAnalysisCard;
