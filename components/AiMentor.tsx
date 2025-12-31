
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { MentorMessage } from '../types';

interface AiMentorProps {
  onClose: () => void;
  initialContext?: string;
}

const AiMentor: React.FC<AiMentorProps> = ({ onClose, initialContext }) => {
  const [messages, setMessages] = useState<MentorMessage[]>([
    { role: 'assistant', content: "Hi there! I'm your C++ Mentor. I can explain code snippets, debug logic, or help you brainstorm new portfolio features. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: MentorMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await gemini.chatWithMentor(messages, input);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h2 className="font-bold">C++ AI Mentor</h2>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded transition-colors">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {m.role === 'user' ? <User size={12} /> : <Sparkles size={12} className="text-blue-500" />}
                <span className="text-[10px] font-bold uppercase opacity-70">
                  {m.role === 'user' ? 'You' : 'Mentor'}
                </span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
              <Loader2 className="animate-spin text-blue-500" size={16} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a C++ question..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiMentor;
