import { motion } from 'framer-motion';
import { getScoreColor } from '../../utils/analysis';

const CategoryScoreBar = ({ label, score, index }) => {
  const color = getScoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="p-4 rounded-xl bg-[#F8F5F0] border border-[#E8DDD0]"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-medium text-[#2D2A26]">{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.06 }}
          className="text-sm font-semibold tabular-nums"
          style={{ color }}
        >
          {score}
        </motion.span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#E8DDD0] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 + index * 0.06 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
};

const labels = {
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  keywords: 'Keywords',
  formatting: 'Formatting',
};

const CategoryScoresGrid = ({ scores }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {Object.entries(labels).map(([key, label], i) => (
        <CategoryScoreBar
          key={key}
          label={label}
          score={scores[key] ?? 0}
          index={i}
        />
      ))}
    </div>
  );
};

export default CategoryScoresGrid;
