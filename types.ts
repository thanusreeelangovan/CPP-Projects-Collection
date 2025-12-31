
export interface CppProject {
  id: string;
  title: string;
  description: string;
  concept: string;
  difficulty: 'Beginner' | 'Intermediate';
  skills: string[];
  code: string;
  terminalOutput: string;
  readme: string;
}

export interface MentorMessage {
  role: 'user' | 'assistant';
  content: string;
}
