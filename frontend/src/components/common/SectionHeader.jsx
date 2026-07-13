import { cn } from '../../utils/helpers';

const SectionHeader = ({ title, description, action, className }) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8', className)}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D2A26]">{title}</h1>
        {description && (
          <p className="text-sm text-[#6B665F] mt-1.5 max-w-xl">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
