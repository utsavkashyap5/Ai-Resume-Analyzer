import { motion } from 'framer-motion';
import { ArrowDown, Inbox } from 'lucide-react';

const WeakBulletCard = ({ bullet, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="p-3.5 rounded-xl bg-[#C65A5A]/5 border border-[#C65A5A]/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C65A5A] mb-1.5">Original</p>
        <p className="text-sm text-[#6B665F] leading-relaxed">{bullet.original}</p>
      </div>
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center">
          <ArrowDown className="w-3.5 h-3.5 text-[#8B5E3C]" />
        </div>
      </div>
      <div className="p-3.5 rounded-xl bg-[#4F7D5C]/5 border border-[#4F7D5C]/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#4F7D5C] mb-1.5">Improved</p>
        <p className="text-sm text-[#2D2A26] leading-relaxed">{bullet.rewritten}</p>
      </div>
    </motion.div>
  );
};

const WeakBulletsList = ({ bullets }) => {
  if (!bullets || bullets.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No weak bullet improvements needed</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bullets.map((bullet, i) => (
        <WeakBulletCard key={i} bullet={bullet} index={i} />
      ))}
    </div>
  );
};

export default WeakBulletsList;
