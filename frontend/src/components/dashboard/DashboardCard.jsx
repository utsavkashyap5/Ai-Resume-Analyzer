import Card from '../common/Card';
import { cn } from '../../utils/helpers';

const DashboardCard = ({ children, title, subtitle, className, icon: Icon }) => {
  return (
    <Card className={cn('h-full', className)}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-[#D4A373]/10 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-[#D4A373]" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-[#2D2A26]">{title}</h3>
            {subtitle && <p className="text-xs text-[#6B665F] mt-0.5">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </Card>
  );
};

export default DashboardCard;
