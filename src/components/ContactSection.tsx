import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-28 overflow-hidden flex flex-col justify-center">
      {/* Background Ambient Video */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <video
          src="/assets/contact_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        {/* Massive Headline */}
        <div className="mb-16 md:mb-20">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-3 block">
            GET IN TOUCH
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-metallic leading-none">
            LET'S TALK
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Have an ambitious project, an enterprise design system requirement, or a full-stack engineering role? Let's build something exceptional together.
            </p>

            <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
              {/* Email */}
              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Email Directly</div>
                  <div className="text-sm md:text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {PORTFOLIO_CONFIG.email}
                  </div>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={`https://wa.me/${PORTFOLIO_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Phone / WhatsApp</div>
                  <div className="text-sm md:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {PORTFOLIO_CONFIG.phone}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Location</div>
                  <div className="text-sm md:text-base font-semibold text-gray-200">
                    {PORTFOLIO_CONFIG.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PORTFOLIO_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-semibold tracking-wider text-gray-300 hover:text-white transition-all inline-flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={PORTFOLIO_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-semibold tracking-wider text-gray-300 hover:text-white transition-all inline-flex items-center gap-1.5"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={PORTFOLIO_CONFIG.socials.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-semibold tracking-wider text-gray-300 hover:text-white transition-all inline-flex items-center gap-1.5"
              >
                <span>Dribbble</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-10 bg-[#0d0e12]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Thank you for reaching out. Deepak will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elon Musk"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elon@x.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enterprise Design System / Full-Stack Product"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your goals, timeline, and vision..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
