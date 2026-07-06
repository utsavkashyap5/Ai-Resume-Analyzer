import { BookOpen, Inbox } from 'lucide-react';
import Badge from '../common/Badge';

const SkillsGapCard = ({ skill }) => {
  const name = typeof skill === 'string' ? skill : skill.name || skill.skill || skill;
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F5F0] border border-[#E8DDD0]">
      <div className="w-8 h-8 rounded-lg bg-[#C65A5A]/10 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-4 h-4 text-[#C65A5A]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2D2A26]">{name}</p>
      </div>
      <Badge variant="error" size="sm">Gap</Badge>
    </div>
  );
};

const SkillsGapList = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No skills gap identified</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {skills.map((skill, i) => (
        <SkillsGapCard key={i} skill={skill} />
      ))}
    </div>
  );
};

export default SkillsGapList;
