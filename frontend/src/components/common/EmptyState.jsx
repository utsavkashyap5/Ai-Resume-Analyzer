import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ title, description, icon: Icon, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-[#E8DDD0]/50 flex items-center justify-center mb-4">
        {Icon ? <Icon className="w-8 h-8 text-[#6B665F]" /> : <Inbox className="w-8 h-8 text-[#6B665F]" />}
      </div>
      <h3 className="text-lg font-semibold text-[#2D2A26] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#6B665F] text-center max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
