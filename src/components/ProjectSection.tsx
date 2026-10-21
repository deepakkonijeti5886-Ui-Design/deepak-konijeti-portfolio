import React from 'react';
import { PROJECTS_LIST } from '../data/portfolioData';

interface ProjectSectionProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <section id="project" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-28">
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-[-0.05em] uppercase select-none font-display">
              <span className="text-metallic">SELECTED</span>{' '}
              <span className="font-light italic text-gray-300 font-editorial lowercase">work</span>
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              As a product designer & full-stack engineer using modern architecture, high-conversion design systems, and universal visual craft tailored for measurable business impact.
            </p>
            <a
              href="#casestudy"
              onClick={(e) => {
                e.preventDefault();
                onOpenCaseStudy?.('01');
              }}
              className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Case Studies</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project Items in Alternating Showcase Layout */}
        <div className="flex flex-col gap-28 md:gap-36">
          {PROJECTS_LIST.map((proj, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Device Mockup */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:col-start-7' : ''}`}>
                  <a
                    href={proj.live || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121318] to-[#090a0d] border border-white/10 p-3 sm:p-5 shadow-2xl transition-all duration-500 hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-black/60">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                      
                      {/* Overlay indicator */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-white text-[11px] font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Open Live UI</span>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>

                    {/* Metrics badge if present */}
                    {proj.metrics && (
                      <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold tracking-wider">
                        ★ {proj.metrics}
                      </div>
                    )}
                  </a>
                </div>

                {/* Project Details */}
                <div className={`lg:col-span-6 flex flex-col justify-center ${isReversed ? 'lg:col-start-1' : ''}`}>
                  <span className="text-sm font-mono font-bold text-gray-500 mb-2">
                    {proj.num}
                  </span>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-none mb-6">
                    {proj.titlePrimary}{' '}
                    <span className="font-light italic text-gray-400 font-serif lowercase">
                      {proj.titleItalic}
                    </span>
                    <br />
                    <span className="text-gray-100">{proj.titleSecondary}</span>
                  </h3>

                  <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Role & Technologies */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mb-6">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-gray-400 uppercase block mb-2.5">
                        {proj.role ? `${proj.role} • Technologies:` : 'Technologies:'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Results & Achievements */}
                  {proj.achievements && proj.achievements.length > 0 && (
                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2.5">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase block">
                        Key Results & Achievements:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                        {proj.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5">
                            <span className="text-emerald-400 mt-1 shrink-0">✦</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Links / Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          // Allow standard navigation or open in new tab reliably
                          if (!e.ctrlKey && !e.metaKey) {
                            window.open(proj.live, '_blank', 'noopener,noreferrer');
                            e.preventDefault();
                          }
                        }}
                        className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2 shadow-lg hover:shadow-white/20 cursor-pointer pointer-events-auto"
                      >
                        <span>{proj.liveLabel || 'Live Demo'}</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}

                    {proj.repo && (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-black/40 hover:bg-white/10 text-white text-xs font-semibold tracking-wider transition-all duration-200 inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
