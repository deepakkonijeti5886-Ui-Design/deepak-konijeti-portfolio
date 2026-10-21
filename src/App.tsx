import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { MosaicHeroCanvas } from './components/MosaicHeroCanvas';
import { LetterIntroWordmark } from './components/LetterIntroWordmark';
import { AboutSection } from './components/AboutSection';
import { ServiceSection } from './components/ServiceSection';
import { ProjectSection } from './components/ProjectSection';
import { ComponentsSection } from './components/ComponentsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ShimejiDeepak } from './components/ShimejiDeepak';
import { PORTFOLIO_CONFIG } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const heroAnchorRef = useRef<HTMLImageElement | null>(null);
  const [heroPlay, setHeroPlay] = useState<boolean>(false);
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    return localStorage.getItem('deepak_custom_portrait') || '/assets/hero_center.png';
  });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection observer to track the active section for the navbar indicator
  useEffect(() => {
    const sectionIds = ['home', 'about', 'service', 'project', 'components', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-white selection:text-black">
      {/* Sticky Navigation Bar with active indicator */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="w-full flex flex-col">
        {/* SECTION 1: HERO (#home) */}
        <section
          id="home"
          className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 35%, #222222 0%, #000000 80%)',
          }}
        >
          {/* Subtle dark backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Anchor for portrait positioning matching reference site */}
          <div className="absolute inset-x-0 top-[15vh] sm:top-[8vh] md:top-[4vh] z-10 text-center text-white flex flex-col items-center w-full pointer-events-none">
            <img
              ref={heroAnchorRef}
              src={portraitSrc}
              alt=""
              aria-hidden="true"
              className="invisible w-auto max-w-none h-[85vh] sm:h-[95vh] md:h-[105vh] lg:h-[114vh] max-h-[860px]"
            />
          </div>

          {/* Interactive WebGL Mosaic Particles Canvas */}
          <MosaicHeroCanvas anchorRef={heroAnchorRef} play={heroPlay} className="z-10" />

          {/* Bouncing Dot Wordmark Intro -> Morphs into PORTFOLIO */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <LetterIntroWordmark
              wordmark={PORTFOLIO_CONFIG.wordmark}
              onStartParticles={() => setHeroPlay(true)}
              onScrollToContact={() => scrollToSection('contact')}
              onScrollToAbout={() => scrollToSection('about')}
            />
          </div>
        </section>

        {/* SECTION 2: ABOUT (#about) */}
        <AboutSection />

        {/* SECTION 3: SERVICE (#service) */}
        <ServiceSection onNavigateToProjects={() => scrollToSection('project')} />

        {/* SECTION 4: PROJECT (#project) */}
        <ProjectSection onOpenCaseStudy={() => scrollToSection('project')} />

        {/* SECTION 5: COMPONENTS (#components) */}
        <ComponentsSection />

        {/* SECTION 6: CONTACT (#contact) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentic Desktop Shimeji Deepak (Walks, Roams, Draggable, Speaks) */}
      <ShimejiDeepak onContactClick={() => scrollToSection('contact')} />

    </div>
  );
}
