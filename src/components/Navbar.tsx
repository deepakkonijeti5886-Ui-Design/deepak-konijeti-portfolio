import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'service', label: 'SERVICE' },
  { id: 'project', label: 'PROJECT' },
  { id: 'components', label: 'COMPONENTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Wordmark Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-sm md:text-base font-extrabold tracking-[0.2em] text-white uppercase transition-colors group-hover:text-gray-300 font-mono">
            {PORTFOLIO_CONFIG.name}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-xs font-semibold tracking-[0.16em] uppercase transition-colors py-1 cursor-pointer focus:outline-none ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2 rounded-full border border-white/20 hover:border-white text-white hover:text-black hover:bg-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-gray-300 focus:outline-none cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-semibold tracking-wider text-gray-300 hover:text-white py-2 border-b border-white/5 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-3 rounded-xl bg-white text-black text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
