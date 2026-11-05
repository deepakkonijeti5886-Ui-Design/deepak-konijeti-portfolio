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
  bio: `Results-driven UI Developer with 5+ years of professional experience at Tata Consultancy Services (TCS), building scalable, high-performance UI components and applications for large-scale eCommerce platforms serving 10m+ users across Africa region. Expert in JavaScript, SAP Hybris, SmartEdit, Content Management Systems (CMS), and modern frontend architecture. 90 Days Notice Period.`,
  email: 'deepak.konijeti5886@gmail.com',
  phone: '+91-9533095630',
  whatsapp: '919533095630',
  location: 'Hyderabad, India',
  availability: '90 Days Notice Period • Open to Global & Remote Opportunities',
  url: 'https://deepak-konijeti-portfolio.vercel.app',
  storeUrl: '#components',
  socials: {
    github: 'https://github.com/deepakkonijeti5886-Ui-Design',
    linkedin: 'https://linkedin.com/in/deepak-konijeti',
    dribbble: 'https://dribbble.com/deepakkonijeti',
  }
};

export const STACK_ROWS: string[][] = [
  [
    'HTML5',
    'Javascript',
    'Jquery',
    'SASS/LESS',
    'Bootstrap',
    'Sap Hybris',
    'SAP Hybris (SmartEdit, JDK 21)',
    'Content management system (CMS)',
    'Backoffice',
    'HAC'
  ],
  [
    'Css3',
    'Eclipse',
    'Intellij',
    'react testing library',
    'Manual testing',
    'Scrum',
    'Agile methodolgy',
    'Salesforce Evergage',
    'Salesforce Marketing Cloud',
    'Solr'
  ],
  [
    'Algolia',
    'PayU',
    'GA4',
    'Google Tag Manager',
    'Modiface VTO',
    'SVN',
    'Bitbucket',
    'Apache Ant',
    'Grunt',
    'Webpack'
  ],
  [
    'Scrum Master (SCM)',
    'Agile/Scrum ceremonies',
    'stakeholder management',
    'team mentoring',
    'AI agent-assisted development',
    'E-Commerce Optimization',
    'Checkout Flow Redesign',
    'Payment Integrations'
  ]
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: '01',
    title: 'ENTERPRISE E-COMMERCE & SAP COMMERCE (HYBRIS)',
    description: 'Worked extensively with third-party platforms, payment providers, and the SAP Commerce team to build and maintain scalable e-commerce solutions for Clicks South Africa (clicks.co.za), enabling seamless customer journeys and secure online transactions.',
    capabilities: [
      'SAP Commerce Cloud (Hybris) & SmartEdit expertise',
      'Payment provider integrations and transaction workflows',
      'Third-party service integration and API coordination',
      'Checkout funnel redesign and customer journey optimization',
      'Cross-functional collaboration with SAP, QA, and business stakeholders'
    ],
    buttonText: 'VIEW PROJECTS'
  },
  {
    id: '02',
    title: 'CORE E-COMMERCE JOURNEYS & LOYALTY PLATFORMS',
    description: 'Redesigned core e-commerce experiences for Clicks South Africa (clicks.co.za), including Cart, Product Listing, Product Description, and Search pages. Built new ClubCard loyalty program experiences and contributed to a strategic Insurance Registration platform, enhancing customer engagement and supporting key business initiatives.',
    capabilities: [
      'Cart & Checkout Experience Redesign',
      'Product Listing & Search Experience Optimization',
      'Product Description Page (PDP) Enhancements',
      'ClubCard Loyalty Program Development',
      'Insurance Registration Journey Implementation'
    ]
  },
  {
    id: '03',
    title: 'TESTING, RELEASE MANAGEMENT & ZERO-DOWNTIME RELEASES',
    description: 'Performed thorough manual testing, managed code deployments through Git and Bitbucket, and leveraged SAP Commerce Cloud for testing and production releases. Ensured stable, low-risk deployments without any downtime through rigorous validation and cross-team collaboration.',
    capabilities: [
      'End-to-End Testing & Quality Assurance',
      'Bitbucket Workflow & Release Management',
      'SAP Commerce Cloud Deployments',
      'Cross-Functional Release Validation',
      'Stable, Zero-Downtime Production Releases'
    ]
  }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: '01',
    num: '01',
    name: 'Clicks — South African E-Commerce Retailer',
    titlePrimary: 'CLICKS',
    titleItalic: 'retail',
    titleSecondary: 'E-COMMERCE PLATFORM',
    description: 'A premier South African e-commerce retailer web application built with scalable architecture, streamlined checkouts, optimized product discovery, and friction-free user account onboarding.',
    role: 'Front End Developer',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'SAP Hybris', 'SmartEdit', 'Manual Testing', 'Agile Methodology'],
    achievements: [
      'Streamlined Checkout Funnel: Refactored a complex, multi-step checkout into a frictionless single-page checkout UI, reducing cart abandonment by 15% and boosting successful transactions.',
      'Onboarding & Account Creation Fix: Redesigned the user registration and instant guest-checkout flow, resulting in an immediate 22% increase in sign-ups within the first month.',
      'High-Converting Product Pages: Re-architected the Product Detail Page (PDP) layout to prioritize immediate calls-to-action (e.g., "Add to Cart", "Buy Now"), driving a 3.5% lift in total conversion rates.'
    ],
    image: '/assets/ecommerce.jpg',
    live: 'https://clicks.co.za',
    liveLabel: 'Visit Live Store',
    metrics: '+15% Checkout Funnel'
  },
  {
    id: '02',
    num: '02',
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
    live: 'https://habitflow-pro-virid.vercel.app',
    liveLabel: 'Open Live Demo',
    repo: 'https://github.com/deepakkonijeti5886-Ui-Design/habitflow-pro',
    metrics: '4.9 ★ App Rating'
  },
  {
    id: '03',
    num: '03',
    name: 'SpendTrack — Fintech Dashboard',
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
    image: '/assets/expense.jpg',
    live: 'https://spendtrack-analytics.vercel.app',
    liveLabel: 'Open Live Demo',
    repo: 'https://github.com/deepakkonijeti5886-Ui-Design/spendtrack-analytics',
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
  title: 'Clicks - A South African E-commerce Retailer',
  role: 'Front end developer',
  company: 'Clicks (TCS Project)',
  timeline: 'TCS Client Engagement',
  live: 'https://clicks.co.za',
  overview: 'A premier South African e-commerce retailer. Refactored checkout funnel, streamlined onboarding, and optimized product detail pages to boost conversion rates and user acquisition.',
  techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'SAP Hybris', 'SmartEdit', 'Manual Testing', 'Agile Methodology'],
  results: [
    { label: 'Cart Abandonment Drop', value: '-15%' },
    { label: 'Sign-Ups First Month', value: '+22%' },
    { label: 'Conversion Lift (PDP)', value: '+3.5%' }
  ],
  painPoints: [
    '4-step legacy checkout with full page reloads',
    'Mandatory 9-field account registration wall',
    'High mobile cart abandonment at 68%'
  ],
  architectureSteps: [
    { title: 'End-to-End Testing & QA', description: 'Rigorous manual and integration testing for all flows' },
    { title: 'Bitbucket & Git Releases', description: 'Structured workflow & branch management' },
    { title: 'SAP Commerce Deployments', description: 'Zero-downtime production deployments' }
  ],
  deliverables: [
    'Cart & Checkout Redesign',
    'PDP & Search Experience Optimization',
    'ClubCard & Insurance Registration'
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

