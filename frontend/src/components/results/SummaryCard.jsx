import { Quote } from 'lucide-react';

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Quote className="w-4 h-4 text-[#8B5E3C]" />
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-2">AI Summary</h3>
          <p className="text-sm text-[#2D2A26] leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
