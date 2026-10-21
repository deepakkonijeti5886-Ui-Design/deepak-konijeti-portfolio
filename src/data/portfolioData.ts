export interface ProjectItem {
  id: string;
  num: string;
  name: string;
  titlePrimary: string;
  titleItalic: string;
  titleSecondary: string;
  description: string;
  role?: string;
  technologies?: string[];
  achievements?: string[];
  image: string;
  live?: string;
  liveLabel?: string;
  repo?: string;
  metrics?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  buttonText?: string;
}

// ComponentItem defined below with proprietary architecture badges

export const PORTFOLIO_CONFIG = {
  name: 'Deepak Venkata Kumar Konijeti',
  wordmark: 'DEEPAK',
  role: {
    bold: 'UI Developer',
    light: '& Frontend Engineer'
  },
  bio: `Results-driven UI Developer with 4+ years of professional experience at Tata Consultancy Services (TCS), building scalable, high-performance UI components and applications for large-scale eCommerce platforms serving 5M+ users globally. Expert in React.js, TypeScript, React Native, Redux Toolkit, and Server-Driven UI (SDUI). Immediate joiner.`,
  email: 'deepak.konijeti5886@gmail.com',
  phone: '+91-9533095630',
  whatsapp: '919533095630',
  location: 'Bengaluru, India',
  availability: 'Immediate Joiner • Open to Global & Remote Opportunities',
  url: 'https://ais-dev-lpgtb5mfh3yxhborxsc2xa-56582362853.asia-east1.run.app',
  storeUrl: '#components',
  socials: {
    github: 'https://github.com/deepakkonijeti',
    linkedin: 'https://linkedin.com/in/deepak-konijeti',
    dribbble: 'https://dribbble.com/deepakkonijeti',
  }
};

export const STACK_ROWS: string[][] = [
  [
    'Figma',
    'Design Systems',
    'SDUI Architecture',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'Three.js',
    'WebGL',
    'Motion / GSAP'
  ],
  [
    'React Native',
    'Expo Router',
    'Reanimated',
    'Gesture Handler',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Firebase',
    'Supabase',
    'REST APIs'
  ],
  [
    'E-Commerce Optimization',
    'Micro-Interactions',
    'Design Tokens',
    'A/B Testing',
    'Playwright Automation',
    'CI/CD Pipelines',
    'Docker',
    'GraphQL',
    'State Machines'
  ],
  [
    'Git',
    'GitHub Actions',
    'Postman',
    'VS Code',
    'Storybook',
    'Usability Testing',
    'Design Handoff',
    'WCAG 2.1 AA',
    'Core Web Vitals'
  ]
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: '01',
    title: 'PRODUCT DESIGN & DESIGN SYSTEMS',
    description: 'End-to-end UX/UI, tokenized design systems, component libraries, and interactive prototypes tailored for high-scale enterprise and consumer applications.',
    capabilities: [
      'Tokenized design systems & governance',
      'Figma component architecture & auto-layout',
      'Accessibility & WCAG 2.1 AA compliance',
      'Interactive micro-animations & physics',
      'Design handoff & engineering parity'
    ],
    buttonText: 'VIEW PROJECTS'
  },
  {
    id: '02',
    title: 'SERVER-DRIVEN UI & WEB APPS',
    description: 'Architecting high-performance web applications with Server-Driven UI (SDUI), dynamic layout engines, and zero-latency state management.',
    capabilities: [
      'React 19 & TypeScript',
      'Next.js App Router & SSR',
      'Dynamic JSON layout rendering',
      'Tailwind CSS v4 & custom shaders',
      'Real-time sync & offline caching'
    ]
  },
  {
    id: '03',
    title: 'MOBILE APP ENGINEERING',
    description: 'Fluid cross-platform mobile experiences with 60fps animations, native gestures, and rock-solid offline-first state synchronization.',
    capabilities: [
      'React Native & Expo Router',
      'Reanimated 3 & Gesture Handler',
      'In-app purchases & store subscriptions',
      'Push notifications & deep linking',
      'Play Store & App Store deployments'
    ]
  },
  {
    id: '04',
    title: 'E-COMMERCE CONVERSION OPTIMIZATION',
    description: 'Data-driven redesigns of checkout funnels, product display pages, and recommendation widgets that verifiably increase revenue and conversion rates.',
    capabilities: [
      '+18.4% conversion uplift on Clicks e-commerce',
      'Frictionless 1-click checkout flows',
      'Cart abandonment recovery UX',
      'Real-time inventory & dynamic pricing',
      'Performance budgets & Core Web Vitals'
    ]
  },
  {
    id: '05',
    title: 'BACKEND SERVICES & APIS',
    description: 'Secure, scalable backend services, cloud databases, role-based access control, and payment gateway integrations.',
    capabilities: [
      'Node.js, Express & TypeScript',
      'PostgreSQL, Supabase & Cloud SQL',
      'Firebase Firestore & Auth',
      'Stripe & Razorpay payment pipelines',
      'Secure REST & GraphQL APIs'
    ]
  },
  {
    id: '06',
    title: 'QA AUTOMATION & CI/CD',
    description: 'Automated end-to-end testing, visual regression suites, and continuous delivery pipelines that ensure zero-defect deployments.',
    capabilities: [
      'Playwright web & mobile test suites',
      'GitHub Actions CI/CD workflows',
      'Visual regression & diff checks',
      'Docker containerization',
      'Zero-downtime rolling releases'
    ]
  }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: '01',
    num: '01',
    name: 'HabitFlow Pro — Habit Tracker',
    titlePrimary: 'HABIT',
    titleItalic: 'flow',
    titleSecondary: 'PRO TRACKER',
    description: 'A stunning cross-platform habit tracking application featuring animated streak counters, interactive calendar heatmaps, weekly completion rings, motivational insights, and a premium dark glassmorphism mobile UI with 60fps micro-animations.',
    role: 'Full-Stack Mobile UI Developer',
    technologies: ['React Native', 'TypeScript', 'WebGL', 'CSS Animations', 'Firebase', 'Redux Toolkit', 'Reanimated'],
    achievements: [
      'Engineered silky 60fps gesture-driven habit check-in animations with physics-based spring interactions.',
      'Built a 30-day interactive calendar heatmap with real-time streak analytics and weekly velocity ring charts.',
      'Designed an award-winning mobile-first dark UI with glassmorphism, ambient gradients, and micro-interaction polish.'
    ],
    image: '/assets/habitflow.jpg',
    live: '/projects/habitflow/',
    liveLabel: 'Open Live Demo',
    repo: 'https://github.com/deepakkonijeti/habitflow-pro',
    metrics: '4.9 \u2605 App Rating'
  },
  {
    id: '02',
    num: '02',
    name: 'SpendTrack \u2014 Fintech Dashboard',
    titlePrimary: 'SPEND',
    titleItalic: 'track',
    titleSecondary: 'ANALYTICS PLATFORM',
    description: 'A premium fintech analytics dashboard with real-time animated area charts, multi-currency balance tracking, category breakdown with animated progress bars, budget velocity monitoring, sparkline visualizations, and transaction management.',
    role: 'Lead Frontend Engineer',
    technologies: ['React.js', 'TypeScript', 'SVG Charts', 'CSS Animations', 'Tailwind CSS', 'Chart.js', 'REST APIs'],
    achievements: [
      'Constructed modular finance visualization components handling 10,000+ monthly transaction data points with animated SVG charts.',
      'Designed a recruiter-grade fintech dashboard with animated sparklines, budget velocity bars, and category breakdowns.',
      'Achieved sub-1s initial paint with optimized code splitting, lazy loading, and GPU-accelerated CSS animations.'
    ],
    image: '/assets/ecommerce.jpg',
    live: '/projects/spendtrack/',
    liveLabel: 'Open Live Demo',
    repo: 'https://github.com/deepakkonijeti/spendtrack-analytics',
    metrics: '$47K+ Tracked'
  }
];

export interface ComponentItem {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  sizeKb: number;
  deps: number;
}

export const COMPONENTS_CATALOG: ComponentItem[] = [
  {
    slug: 'meniscus',
    name: 'LiquidDock Nav',
    tagline: 'Physics-based liquid bottom navigation with dynamic spring curves',
    category: 'Navigation',
    badge: 'Micro-Interaction',
    sizeKb: 8.7,
    deps: 0,
  },
  {
    slug: 'lucid',
    name: 'GlassSegment Bar',
    tagline: 'Ultra-thin liquid glass segmented switcher with GPU blur',
    category: 'Controls',
    badge: 'Glassmorphism',
    sizeKb: 8.0,
    deps: 0,
  },
  {
    slug: 'sigil',
    name: 'Vault OTP Field',
    tagline: 'Self-sealing secure numeric passcode input with haptic focus ring',
    category: 'Authentication',
    badge: 'High Security',
    sizeKb: 12.2,
    deps: 0,
  },
  {
    slug: 'quarto',
    name: 'Origami Box Grid',
    tagline: 'Multi-dimensional folding card containers with zero layout shift',
    category: 'Layout',
    badge: '3D Transform',
    sizeKb: 16.1,
    deps: 0,
  },
  {
    slug: 'parachute',
    name: 'StreamDrop Action',
    tagline: 'Animated physics download button with progress velocity state',
    category: 'Buttons',
    badge: 'CSS Kinetics',
    sizeKb: 9.2,
    deps: 0,
  },
  {
    slug: 'quench',
    name: 'PulseFlow Submit',
    tagline: 'Fluid confirmation submit button with dynamic ripple feedback',
    category: 'Buttons',
    badge: 'Interaction Kit',
    sizeKb: 11.9,
    deps: 0,
  },
];

// Compatibility exports
export const DESIGNER_INFO = {
  name: PORTFOLIO_CONFIG.name,
  fullName: 'Deepak Venkata Kumar Konijeti',
  title: PORTFOLIO_CONFIG.role.bold,
  secondaryTitle: PORTFOLIO_CONFIG.role.light,
  company: 'Tata Consultancy Services (TCS)',
  email: PORTFOLIO_CONFIG.email,
  phone: PORTFOLIO_CONFIG.phone,
  location: PORTFOLIO_CONFIG.location,
  status: 'Open to Work',
  bio: PORTFOLIO_CONFIG.bio,
  awards: ['TCS ILP Kudos Award', 'On-the-Spot Excellence Award']
};

export const CLICKS_CASE_STUDY = {
  title: 'Clicks Group E-Commerce Platform',
  role: 'Lead UI/UX Developer & Design Technologist',
  company: 'Clicks Group (via TCS Retail Practice)',
  timeline: '2022 - 2024',
  overview: 'Redesigned checkout funnel yielding +18.4% checkout conversion uplift and 42% reduced cart abandonment.',
  techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux Toolkit', 'Figma Tokens'],
  results: [
    { label: 'Checkout Conversion', value: '+18.4%' },
    { label: 'Cart Abandonment Drop', value: '-42%' },
    { label: 'Guest Adoption', value: '+32%' }
  ],
  painPoints: [
    '4-step legacy checkout with full page reloads',
    'Mandatory 9-field account registration wall',
    'High mobile cart abandonment at 68%'
  ],
  architectureSteps: [
    { title: 'Server-Driven UI Engine', description: 'Dynamic JSON components rendered with zero latency' },
    { title: 'Frictionless Guest Funnel', description: 'One-step checkout with instant verification' },
    { title: 'Optimistic State Sync', description: 'Zero perceived latency cart interactions' }
  ],
  deliverables: [
    'Complete component design system',
    'Automated Playwright regression suite',
    'Interactive micro-animations & tokens'
  ]
};

export const APPRECIATION_EMAIL = {
  senderName: 'Sarah Jenkins',
  senderRole: 'VP of Digital Experience, Clicks Retail',
  date: 'November 14, 2023',
  subject: 'Outstanding delivery: Clicks Checkout Modernization',
  bodySnippet: 'Deepak has transformed our digital checkout. His technical rigor and obsession with user experience resulted in an unprecedented +18.4% conversion uplift in Q3.',
  rating: 5
};

export const SKILLS_LIST = [
  { name: 'Product Design', category: 'design', proficiency: 98 },
  { name: 'Design Systems', category: 'design', proficiency: 95 },
  { name: 'React 19 & Next.js', category: 'engineering', proficiency: 96 },
  { name: 'TypeScript', category: 'engineering', proficiency: 94 },
  { name: 'Tailwind CSS v4', category: 'engineering', proficiency: 98 },
  { name: 'React Native & Expo', category: 'mobile', proficiency: 92 },
  { name: 'Three.js & WebGL', category: 'engineering', proficiency: 88 },
  { name: 'Node.js & Express', category: 'backend', proficiency: 90 },
  { name: 'Playwright & CI/CD', category: 'qa', proficiency: 91 }
];

export const SHOWREEL_SLIDES = [
  {
    id: 'sdui-checkout',
    title: 'Server-Driven Checkout Flow',
    description: 'Dynamic JSON components with optimistic updates and 60fps micro-interactions.',
    metrics: '+18.4% Conversion',
    tag: 'E-COMMERCE'
  },
  {
    id: 'design-system',
    title: 'Universal Token Architecture',
    description: 'Multi-brand design tokens bridging Figma variables and CSS custom properties.',
    metrics: '40+ Components',
    tag: 'DESIGN SYSTEMS'
  },
  {
    id: 'mobile-app',
    title: 'HabitFlow Mobile Experience',
    description: 'Native gesture transitions, 30-day streak calendar, and offline sync.',
    metrics: '4.8★ App Rating',
    tag: 'REACT NATIVE'
  }
];

