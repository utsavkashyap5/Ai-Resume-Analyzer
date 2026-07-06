import { Inbox, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

const StrengthsList = ({ strengths }) => {
  if (!strengths || strengths.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No strengths identified</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {strengths.map((strength, i) => (
        <Badge key={i} variant="success" size="lg" className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          {strength}
        </Badge>
      ))}
    </div>
  );
};

export default StrengthsList;
