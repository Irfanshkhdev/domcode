import React from 'react';
import { ArrowUp, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer({ onBackToHome }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Developer Info */}
        <button 
          onClick={onBackToHome}
          className="flex items-center space-x-4 cursor-pointer text-left focus:outline-none"
        >
          <img src="/domcodelogo.png" alt="DomCode Logo" className="h-10 w-auto object-contain brightness-110" />
          <div>
            <div className="text-xs font-mono text-zinc-400 font-medium">
              Irfan Shaikh — Lead Developer (+91 7262950982)
            </div>
          </div>
        </button>

        {/* Tagline */}
        <div className="text-center md:text-right font-light text-xs text-zinc-400 max-w-sm">
          "We Build Software Around Your Business"
        </div>

        {/* Back To Top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600">
        <div>© {new Date().getFullYear()} DomCode. All rights reserved.</div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="https://wa.me/917262950982" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400">WhatsApp</a>
          <span>•</span>
          <a href="https://instagram.com/wardom.store" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400">Instagram @wardom.store</a>
          <span>•</span>
          <a href="tel:+917262950982" className="hover:text-zinc-400">+91 7262950982</a>
          <span>•</span>
          <a href="mailto:hello@wardom.store" className="hover:text-zinc-400">hello@wardom.store</a>
        </div>
      </div>
    </footer>
  );
}
