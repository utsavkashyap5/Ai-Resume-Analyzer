import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel } from '../../utils/analysis';

const ATSScoreCard = ({ score }) => {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E8DDD0"
            strokeWidth="12"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl font-bold tracking-tight"
            style={{ color }}
          >
            {score}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {getScoreLabel(score)}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
