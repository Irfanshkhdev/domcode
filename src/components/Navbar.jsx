import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, MessageCircle, Sparkles } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Navbar({ onBackToHome, onViewPortfolio }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Web & Menu Apps", href: "#solutions" },
    { label: "Booking Systems", href: "#solutions" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (onBackToHome) onBackToHome();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo Image -> Clicking takes user directly to HOMEPAGE */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center group py-2 text-left cursor-pointer focus:outline-none"
            title="Return to DomCode Homepage"
          >
            <img 
              src="/domcodelogo.png" 
              alt="DomCode Logo" 
              className="h-14 sm:h-16 md:h-18 w-auto object-contain brightness-110 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
            />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 font-mono relative py-1 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Buttons: View Portfolio, WhatsApp, Call */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* View Portfolio Outlined Pill Button */}
            <button
              onClick={onViewPortfolio}
              className="px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-mono font-semibold flex items-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>✦ View Portfolio</span>
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/917262950982?text=Hello%20Irfan,%20I'd%20like%20to%20discuss%20a%20project%20with%20DomCode."
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>

            {/* Instagram Link -> @wardom.store */}
            <a
              href="https://instagram.com/wardom.store"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
              title="Follow @wardom.store on Instagram"
            >
              <InstagramIcon className="w-4.5 h-4.5" />
            </a>

            {/* Call Direct */}
            <a
              href="tel:+917262950982"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <Phone className="w-4 h-4" />
              <span>+91 7262950982</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-black/95 px-4 pt-4 pb-6 space-y-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-sm uppercase tracking-wider text-zinc-300 hover:text-white font-mono py-2 border-b border-white/5 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => { setMobileOpen(false); onViewPortfolio(); }}
              className="w-full py-3 rounded-xl bg-white text-black text-xs font-mono font-bold flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>✦ View Portfolio</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
