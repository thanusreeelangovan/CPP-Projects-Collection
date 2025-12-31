
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Terminal, 
  Code, 
  BookOpen, 
  Bot, 
  Layout, 
  ArrowLeft, 
  ExternalLink, 
  Copy,
  Check,
  Github,
  Linkedin,
  Cpu,
  Coffee,
  BrainCircuit,
  Lightbulb,
  Sparkles,
  Loader2
} from 'lucide-react';
import { PROJECTS } from './constants';
import { CppProject } from './types';
import ProjectCard from './components/ProjectCard';
import AiMentor from './components/AiMentor';
import { gemini } from './services/geminiService';

// --- Global Header ---
const Header = ({ onShowMentor }: { onShowMentor: () => void }) => (
  <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
    <Link to="/" className="flex items-center gap-2 group">
      <div className="bg-slate-900 text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
        <Cpu size={20} />
      </div>
      <span className="font-bold text-xl tracking-tight text-slate-800">C++<span className="text-blue-600">Port</span></span>
    </Link>
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
      <Link to="/" className="hover:text-blue-600 transition-colors">Showcase</Link>
      <a href="https://github.com" target="_blank" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        Github <ExternalLink size={14} />
      </a>
      <button 
        onClick={onShowMentor}
        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
      >
        <Bot size={16} /> AI Mentor
      </button>
    </nav>
  </header>
);

// --- Home Component ---
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
          <BrainCircuit size={16} />
          First-Year C++ Journey
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Modern CLI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Development</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Exploring foundational programming through performance-oriented C++. 
          This portfolio showcases clean, object-oriented solutions to everyday management problems.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            <Coffee size={20} className="text-amber-500" />
            <span className="font-medium text-slate-700">1000+ LoC</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            <Terminal size={20} className="text-slate-700" />
            <span className="font-medium text-slate-700">3 Core Projects</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            <Layout size={20} className="text-emerald-500" />
            <span className="font-medium text-slate-700">OOP Design</span>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={(p) => navigate(`/project/${p.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

// --- Project Detail Component ---
const ProjectDetail = () => {
  const { id } = useParams() as any;
  const project = PROJECTS.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'readme' | 'code' | 'terminal'>('readme');
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(project.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGetExplanation = async () => {
    setIsExplaining(true);
    const text = await gemini.getCodeExplanation(project.code, project.concept);
    setExplanation(text);
    setIsExplaining(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
        <ArrowLeft size={18} /> Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Sidebar - Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{project.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">Core Concept</h4>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-lg text-sm border border-slate-100">
                  <Code size={16} className="text-blue-500" />
                  {project.concept}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">Skills Mastery</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(s => (
                    <span key={s} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium border border-blue-100">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleGetExplanation}
              disabled={isExplaining}
              className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-100 transition-all disabled:opacity-50"
            >
              {isExplaining ? <Loader2 className="animate-spin" size={20} /> : <Lightbulb size={20} />}
              AI Code Explanation
            </button>
          </div>

          {explanation && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-amber-700 mb-2 font-bold text-sm">
                <Sparkles size={16} /> Mentor's Insight
              </div>
              <div className="text-amber-900 text-sm leading-relaxed whitespace-pre-wrap">
                {explanation}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - Tabs & Viewers */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[600px] flex flex-col">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setActiveTab('readme')}
                className={`px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === 'readme' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <BookOpen size={16} /> README.md
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === 'code' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Code size={16} /> main.cpp
              </button>
              <button 
                onClick={() => setActiveTab('terminal')}
                className={`px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === 'terminal' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Terminal size={16} /> Live Sample
              </button>
            </div>

            <div className="flex-1 overflow-auto p-0">
              {activeTab === 'readme' && (
                <div className="p-8 prose prose-slate max-w-none">
                  <div className="text-slate-800 space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">Technical Overview</h2>
                    <p className="whitespace-pre-wrap leading-relaxed">{project.readme}</p>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="relative h-full bg-slate-900">
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={handleCopy}
                      className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
                    >
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-6 font-mono text-sm leading-relaxed text-blue-300 overflow-auto h-full">
                    {project.code}
                  </pre>
                </div>
              )}

              {activeTab === 'terminal' && (
                <div className="h-full bg-black p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2">bash -- cli-preview</span>
                  </div>
                  <div className="text-emerald-500 mb-1">$ ./main</div>
                  <pre className="text-slate-200 leading-relaxed">
                    {project.terminalOutput}
                  </pre>
                  <div className="text-emerald-500 mt-4 animate-pulse">_</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="mt-20 border-t border-slate-200 bg-white py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-slate-900 text-white p-1 rounded">
            <Cpu size={16} />
          </div>
          <span className="font-bold text-lg text-slate-800">C++ Portfolio</span>
        </div>
        <p className="text-slate-500 text-sm">Built with React, C++, and a lot of caffeine.</p>
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={20} /></a>
        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin size={20} /></a>
      </div>
    </div>
  </footer>
);

// --- Main App Entry ---
const App = () => {
  const [showMentor, setShowMentor] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <Header onShowMentor={() => setShowMentor(true)} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>

        <Footer />

        {showMentor && (
          <AiMentor onClose={() => setShowMentor(false)} />
        )}
      </div>
    </Router>
  );
};

export default App;
