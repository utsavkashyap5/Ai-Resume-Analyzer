import { Award, Inbox } from 'lucide-react';
import Badge from '../common/Badge';

const RecommendedCerts = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No certification recommendations</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {certifications.map((cert, i) => {
        const name = typeof cert === 'string' ? cert : cert.name || cert.title || cert;
        return (
          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F5F0] border border-[#E8DDD0]">
            <div className="w-8 h-8 rounded-full bg-[#D9A441]/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-[#D9A441]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2D2A26]">{name}</p>
            </div>
            <Badge variant="warning" size="sm">Recommended</Badge>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCerts;
