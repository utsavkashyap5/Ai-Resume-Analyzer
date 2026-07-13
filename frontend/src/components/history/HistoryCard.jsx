import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, Trash2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const HistoryCard = ({ analysis, index, onDelete }) => {
  const navigate = useNavigate();

  const fileName = analysis.resumeId?.fileName || 'Unknown Resume';
  const atsScore = analysis.analysisResult?.ats_score ?? analysis.analysisResult?.atsScore ?? null;
  const createdAt = analysis.createdAt
    ? new Date(analysis.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  const provider = analysis.provider || 'Groq';

  const getScoreColor = () => {
    if (atsScore === null) return 'text-[#6B665F]';
    if (atsScore >= 90) return 'text-[#4F7D5C]';
    if (atsScore >= 70) return 'text-[#D9A441]';
    return 'text-[#C65A5A]';
  };

  const getScoreBg = () => {
    if (atsScore === null) return 'bg-[#6B665F]/10';
    if (atsScore >= 90) return 'bg-[#4F7D5C]/10';
    if (atsScore >= 70) return 'bg-[#D9A441]/10';
    return 'bg-[#C65A5A]/10';
  };

  const handleClick = () => {
    navigate('/results', { state: { analysis } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      layout
      exit={{ opacity: 0, x: -20 }}
      className="group rounded-2xl bg-[#FCF4D7] border border-[#E8DDD0] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={handleClick}
        className="w-full text-left p-5 sm:p-6"
        aria-label={`View analysis for ${fileName}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#FAEDCD] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4A373]/10 transition-colors duration-200">
            <FileText className="w-5.5 h-5.5 text-[#6B665F] group-hover:text-[#D4A373] transition-colors duration-200" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#2D2A26] truncate">{fileName}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5">
                  {createdAt && (
                    <span className="text-xs text-[#6B665F] flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>{createdAt}</span>
                    </span>
                  )}
                  <span className="text-xs text-[#6B665F]">{provider}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-start">
                {atsScore !== null && (
                  <div className={cn('px-3 py-1 rounded-lg text-xs font-bold tabular-nums tracking-tight', getScoreBg(), getScoreColor())}>
                    {atsScore}
                  </div>
                )}
                {atsScore === null && (
                  <div className="px-3 py-1 rounded-lg text-xs font-medium text-[#6B665F] bg-[#6B665F]/10">
                    --
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      <div className="px-5 sm:px-6 pb-3 sm:pb-4 flex justify-end border-t border-[#E8DDD0]/50 pt-2">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(analysis._id); }}
          className="flex items-center gap-1.5 text-xs text-[#6B665F] hover:text-[#C65A5A] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#C65A5A]/5"
          aria-label={`Delete analysis for ${fileName}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
