import { FolderKanban, Inbox } from 'lucide-react';

const RecommendedProjectCard = ({ project }) => {
  const name = typeof project === 'string' ? project : project.title || project.name || project;
  const desc = project.description || '';

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F5F0] border border-[#E8DDD0]">
      <div className="w-9 h-9 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center flex-shrink-0">
        <FolderKanban className="w-4.5 h-4.5 text-[#8B5E3C]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2D2A26]">{name}</p>
        {desc && <p className="text-xs text-[#6B665F] mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
};

const RecommendedProjects = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B665F] py-2">
        <Inbox className="w-4 h-4" />
        <span>No project recommendations</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {projects.map((project, i) => (
        <RecommendedProjectCard key={i} project={project} />
      ))}
    </div>
  );
};

export default RecommendedProjects;
