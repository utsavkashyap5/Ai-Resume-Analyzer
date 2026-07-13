import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const JobDescriptionCard = ({ value, onChange, disabled }) => {
  const textareaRef = useRef(null);
  const maxChars = 5000;
  const charCount = value.length;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste or type the job description here..."
          maxLength={maxChars}
          rows={6}
          aria-label="Job description"
          className="w-full rounded-2xl border border-[#E8DDD0] bg-[#FFFCE0] px-5 py-4 text-sm text-[#2D2A26] placeholder-[#6B665F]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6B665F]">
          {charCount === 0
            ? 'Paste the target job description'
            : `${charCount.toLocaleString()} / ${maxChars.toLocaleString()} characters`}
        </p>
        {charCount > 0 && (
          <motion.span
            animate={{
              color:
                charCount > maxChars * 0.9
                  ? '#C65A5A'
                  : charCount > maxChars * 0.75
                  ? '#D9A441'
                  : '#6B665F',
            }}
            className="text-xs font-medium tabular-nums"
          >
            {maxChars - charCount} remaining
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default JobDescriptionCard;
