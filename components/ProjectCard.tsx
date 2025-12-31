
import React from 'react';
import { CppProject } from '../types';
import { Terminal, Code2, BookOpen, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: CppProject;
  onClick: (project: CppProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Terminal size={24} />
        </div>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          project.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {project.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">{project.title}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        {project.skills.slice(0, 3).map((skill, idx) => (
          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        View Project <ChevronRight size={16} className="ml-1" />
      </div>
    </div>
  );
};

export default ProjectCard;
