import Badge from '../common/Badge';
import { Inbox } from 'lucide-react';

const KeywordChips = ({ matched, missing }) => {
  const hasMatched = matched && matched.length > 0;
  const hasMissing = missing && missing.length > 0;

  if (!hasMatched && !hasMissing) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No keyword data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasMatched && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4F7D5C] mb-2.5">
            Matched Keywords
            <span className="ml-1.5 text-[#6B665F] font-normal">({matched.length})</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {matched.map((kw, i) => (
              <Badge key={i} variant="success" size="sm">
                {kw}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {hasMissing && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C65A5A] mb-2.5">
            Missing Keywords
            <span className="ml-1.5 text-[#6B665F] font-normal">({missing.length})</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((kw, i) => (
              <Badge key={i} variant="error" size="sm">
                {kw}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordChips;
