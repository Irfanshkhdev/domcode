import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, MessageCircle, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onViewPortfolio }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Grid Pattern & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Text & CTAs (7 cols on Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Lead Developer Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md"
          >
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>Irfan Shaikh</span>
            <span className="text-zinc-600">•</span>
            <span className="text-white font-medium">Lead Developer</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            We Build Software <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500 underline decoration-white/20 underline-offset-8">
              Around Your Business
            </span>
          </motion.h1>

          {/* Sub-headline Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-400 font-light max-w-xl leading-relaxed"
          >
            Fast, responsive web applications engineered for maximum conversions. We replace clunky legacy systems with instant table QR ordering, real-time kitchen displays, and zero-install client convenience.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase font-mono hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Scroll To Explore</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={onViewPortfolio}
              className="px-6 py-4 rounded-xl border border-white/20 text-white font-mono text-xs font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>✦ View Portfolio</span>
            </button>

            <div className="flex items-center space-x-3">
              <a
                href="https://wa.me/917262950982?text=Hi%20Irfan,%20I'd%20like%20to%20discuss%20a%20project%20with%20DomCode."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold flex items-center justify-center space-x-2 hover:bg-emerald-500 hover:text-black transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Exact Updated Hero Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6"
          >
            {[
              { value: "7+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "0.1s", label: "Ultra Fast Load" },
              { value: "24/7", label: "Automated Booking" },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card p-3 rounded-xl text-center border border-white/5">
                <div className="text-base font-bold font-mono text-white mb-0.5">{stat.value}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Floating Business Value Badges in empty space */}
        <div className="hidden lg:block lg:col-span-5 relative h-[420px]">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 space-y-10 pointer-events-auto">
            
            {/* Badge 1: 🚀 Lightning Fast */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-white/30 transition-colors cursor-default"
            >
              <span>🚀</span>
              <span>Lightning Fast</span>
            </motion.div>

            {/* Badge 2: 🔒 Highly Secure (Staggered to left) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="-translate-x-10 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-white/30 transition-colors cursor-default"
            >
              <span>🔒</span>
              <span>Highly Secure</span>
            </motion.div>

            {/* Badge 3: 📱 App-Like Experience */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-white/30 transition-colors cursor-default"
            >
              <span>📱</span>
              <span>App-Like Experience</span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
