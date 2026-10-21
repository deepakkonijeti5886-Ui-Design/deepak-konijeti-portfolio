import { PORTFOLIO_CONFIG, PROJECTS_LIST, SERVICES_LIST, COMPONENTS_CATALOG } from './portfolioData';

export interface TourStop {
  id: string;
  stepNumber: number;
  targetId: string;
  badge: string;
  title: string;
  shortSpeech: string;
  detailedNotes: string[];
  suggestedAction?: {
    label: string;
    sectionId: string;
  };
}

export interface BotQA {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  highlightFact?: string;
  relatedStopId?: string;
}

export const TOUR_STOPS: TourStop[] = [
  {
    id: 'home',
    stepNumber: 1,
    targetId: 'home',
    badge: 'Stop 01 // Interactive WebGL Mosaic',
    title: 'Interactive Particle Portrait & Wordmark',
    shortSpeech: "Hi there! I'm Deepak Konijeti. Welcome to my portfolio! Right here in the hero, notice the thousands of particle tiles forming my silhouette — they react to your mouse cursor in real-time, built with custom WebGL 2.0 shaders and atlas textures!",
    detailedNotes: [
      "Role: Senior Product Designer & Full-Stack Developer",
      "Interactive WebGL: Thousands of tiles mapped to custom GLSL shaders (uMouse physics & uScatter)",
      "Dynamic Wordmark: Letter bounce reveal transitioning into metallic PORTFOLIO typography"
    ],
    suggestedAction: {
      label: 'Explore Canvas',
      sectionId: 'home'
    }
  },
  {
    id: 'about',
    stepNumber: 2,
    targetId: 'about',
    badge: 'Stop 02 // Background & The Stack',
    title: 'Intro & 4-Row Marquee Stack',
    shortSpeech: "Let's walk down to my background! I bridge design systems and full-stack engineering. Check out my obsidian intro card and the 4 horizontal infinite marquee rows of technologies I work with every day.",
    detailedNotes: [
      "8+ years experience across high-impact enterprise & consumer products",
      "Ex-Tata Consultancy Services (TCS) Senior Engineer with ILP Kudos & Excellence Awards",
      "4-Row Infinite Marquee: Design Systems, SDUI, React 19, TypeScript, React Native, and CI/CD"
    ],
    suggestedAction: {
      label: 'Inspect Stack',
      sectionId: 'about'
    }
  },
  {
    id: 'service',
    stepNumber: 3,
    targetId: 'service',
    badge: 'Stop 03 // What We Can Do',
    title: 'Core Services & Engineering Capabilities',
    shortSpeech: "Here is 'WHAT WE CAN DO'! I've organized my work into 6 interactive accordion tiers: Product Design, Server-Driven UI, Mobile Apps, E-Commerce Optimization, Backend APIs, and QA Automation.",
    detailedNotes: [
      "01 Product Design: Tokenized design systems & Figma component architectures",
      "02 Server-Driven UI: Dynamic JSON layout rendering with zero-latency state machines",
      "03 Mobile Apps: 60fps gestures with React Native, Reanimated, and offline sync",
      "04 E-Commerce: High-converting checkouts (+18.4% conversion uplift)",
      "05 & 06: Production Node.js APIs and Playwright test automation"
    ],
    suggestedAction: {
      label: 'Expand Services',
      sectionId: 'service'
    }
  },
  {
    id: 'project',
    stepNumber: 4,
    targetId: 'project',
    badge: 'Stop 04 // Selected Work',
    title: 'Selected Work & Flagship Projects',
    shortSpeech: "Step over here to 'SELECTED work'! Take a look at Clicks E-Commerce (+18.4% checkout uplift), HabitFlow mobile app, MindPixel innovation studio, and the Kessler luxury storefront with 40+ accessible UI components.",
    detailedNotes: [
      "Clicks E-Commerce SDUI: Solved 68% cart abandonment with a single-page state machine",
      "HabitFlow: Mobile habit tracker with offline-first Firebase sync & streak analytics",
      "MindPixel: AI studio marketing portal with WebGL particle hero",
      "Kessler: High-fashion luxury storefront with unified design tokens"
    ],
    suggestedAction: {
      label: 'View Projects',
      sectionId: 'project'
    }
  },
  {
    id: 'components',
    stepNumber: 5,
    targetId: 'components',
    badge: 'Stop 05 // UI Lab & Catalogue',
    title: 'Plain HTML, CSS & JS Components',
    shortSpeech: "This is my UI Lab! 6 standalone components, 66.1 KB in total, every one built with plain HTML, CSS, and JavaScript with zero framework dependencies. You can watch the real reel videos running directly in the cards!",
    detailedNotes: [
      "Meniscus: Liquid bottom navigation (8.7 KB)",
      "Lucid: Liquid glass segmented bar (8.0 KB)",
      "Sigil: Code field that seals itself (12.2 KB)",
      "Quarto & Parachute: Foldable forms & animated download physics",
      "Zero build step & instant production readiness"
    ],
    suggestedAction: {
      label: 'Browse Carousel',
      sectionId: 'components'
    }
  },
  {
    id: 'contact',
    stepNumber: 6,
    targetId: 'contact',
    badge: 'Stop 06 // Direct Contact',
    title: "Let's Connect & Collaborate",
    shortSpeech: "And finally, stop 6: 'LET'S TALK'! You can message me directly through the form, email me at deepak.konijeti5886@gmail.com, or tap my phone/WhatsApp link (+91-9533095630). I'm open to remote and global projects!",
    detailedNotes: [
      "Email: deepak.konijeti5886@gmail.com",
      "Phone / WhatsApp: +91-9533095630",
      "Location: Hyderabad, India (Open to Remote / Global)",
      "Profiles: LinkedIn, GitHub, and Dribbble"
    ],
    suggestedAction: {
      label: 'Send a Message',
      sectionId: 'contact'
    }
  }
];

export const BOT_KNOWLEDGE_BASE: BotQA[] = [
  {
    id: 'bio',
    keywords: ['who', 'about', 'deepak', 'background', 'intro', 'summary', 'experience', 'person'],
    question: 'Tell me about Deepak Konijeti.',
    answer: "I am Deepak Konijeti, a Senior Product Designer & Full-Stack Developer with 8+ years crafting high-impact enterprise & consumer digital experiences. Previously at Tata Consultancy Services (TCS), I specialize in server-driven UI, tokenized design systems, and conversion-optimized e-commerce checkouts.",
    highlightFact: '8+ years experience • Ex-TCS Senior Engineer • ILP Excellence Winner',
    relatedStopId: 'about'
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'whatsapp', 'call', 'message', 'talk'],
    question: 'How do I contact or hire Deepak?',
    answer: "You can reach me directly via email at deepak.konijeti5886@gmail.com or WhatsApp / phone at +91-9533095630. I'm based in Hyderabad, India and open to global remote opportunities as well as on-site contracts.",
    highlightFact: 'deepak.konijeti5886@gmail.com • +91-9533095630 (WhatsApp)',
    relatedStopId: 'contact'
  },
  {
    id: 'clicks',
    keywords: ['clicks', 'conversion', 'uplift', 'checkout', 'sdui', 'ecommerce', 'case study', 'results', 'stats'],
    question: 'What results did Deepak deliver on the Clicks project?',
    answer: "On Clicks Group (South Africa's #1 retailer), I redesigned the mobile checkout from a sluggish 4-step reload gate into a server-driven single-page architecture. This delivered a verified +18.4% checkout conversion uplift, +32% guest checkout adoption, and reduced cart abandonment by 42%.",
    highlightFact: '+18.4% conversion uplift on Clicks e-commerce',
    relatedStopId: 'project'
  },
  {
    id: 'tech-stack',
    keywords: ['tech', 'stack', 'skills', 'tools', 'react', 'typescript', 'figma', 'code', 'technologies', 'tailwind'],
    question: 'What is Deepak’s core technology stack?',
    answer: "My stack includes Figma & Design Tokens, React 19, TypeScript, Next.js, Tailwind CSS v4, WebGL / Three.js, React Native, Expo Router, Reanimated, Node.js, Express, PostgreSQL, Firebase, and automated testing with Playwright & GitHub Actions.",
    highlightFact: 'Figma • React 19 • TypeScript • React Native • WebGL • Node.js',
    relatedStopId: 'about'
  },
  {
    id: 'components-lab',
    keywords: ['components', 'catalogue', 'plain', 'html', 'css', 'reels', 'templates', 'meniscus', 'lucid'],
    question: 'What is the Plain HTML/CSS UI Catalogue?',
    answer: "It's my collection of 6 micro-interaction components (66.1 KB total) built with pure HTML, CSS, and vanilla JS. Each includes a live video reel preview in the carousel, zero dependencies, and ready-to-paste production code.",
    highlightFact: '6 components • 66.1 KB total • 0 dependencies',
    relatedStopId: 'components'
  },
  {
    id: 'awards',
    keywords: ['award', 'tcs', 'recognition', 'kudos', 'achievement', 'honors'],
    question: 'What awards and recognitions has Deepak received?',
    answer: "At Tata Consultancy Services, I received the prestigious ILP Kudos Award for exceptional full-stack performance and the TCS On-the-Spot Recognition for zero-defect component delivery across mission-critical retail applications.",
    highlightFact: 'TCS ILP Kudos Award & On-the-Spot Excellence Award Winner',
    relatedStopId: 'about'
  }
];

export function findBestMatchingAnswer(query: string): BotQA {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return BOT_KNOWLEDGE_BASE[0];

  const words = cleanQuery.split(/\s+/).filter((w) => w.length > 2);

  let bestMatch: BotQA | null = null;
  let highestScore = 0;

  for (const item of BOT_KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw)) {
        score += 4;
      }
      for (const w of words) {
        if (kw === w) {
          score += 3;
        } else if (kw.includes(w) || w.includes(kw)) {
          score += 1.5;
        }
      }
    }

    if (item.question.toLowerCase().includes(cleanQuery)) {
      score += 6;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (highestScore >= 2.5 && bestMatch) {
    return bestMatch;
  }

  return BOT_KNOWLEDGE_BASE[0];
}
