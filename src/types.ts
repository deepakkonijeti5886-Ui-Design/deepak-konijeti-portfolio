export interface ProjectMetric {
  label: string;
  value: string;
  change: string;
  description: string;
  subtext?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  deliverables: string[];
  metrics: string;
}

export interface ShowreelSlide {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
  gradient: string;
  type: 'checkout' | 'pdp' | 'onboarding' | 'sdui';
  duration: number; // in seconds
}

export interface SkillItem {
  name: string;
  category: 'design' | 'frontend' | 'architecture' | 'state';
  level: 'Expert' | 'Advanced' | 'Proficient';
  context: string;
}

export interface CollaboratorCursor {
  id: string;
  name: string;
  color: string;
  role: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
