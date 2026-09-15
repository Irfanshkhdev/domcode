import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollytellingSection from './components/ScrollytellingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DomCodeLogo from './components/SegmentedLogo';
import Portfolio from './components/Portfolio';
import Admin from './components/Admin';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  
  const getViewFromURL = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === "#admin" || path === "/admin" || path.endsWith("/admin")) return "admin";
    if (hash === "#portfolio" || path === "/portfolio" || path.endsWith("/portfolio")) return "portfolio";
    return "home";
  };

  const [currentView, setCurrentView] = useState(getViewFromURL);

  React.useEffect(() => {
    const handleURLChange = () => {
      setCurrentView(getViewFromURL());
    };
    window.addEventListener("hashchange", handleURLChange);
    window.addEventListener("popstate", handleURLChange);
    return () => {
      window.removeEventListener("hashchange", handleURLChange);
      window.removeEventListener("popstate", handleURLChange);
    };
  }, []);

  // Global scroll Y position
  const { scrollY } = useScroll();

  // Stealth Eclipse Entrance Transforms
  // scale: 0.4 (400px) on load -> 1.0 (1000px) as scroll reaches 800px
  const logoScale = useTransform(scrollY, [0, 800], [0.4, 1]);

  // x: "0%" (fully on screen) on load -> "45%" (pushed halfway off right edge)
  const logoX = useTransform(scrollY, [0, 800], ["0%", "45%"]);

  // rotate: 1:1 ratio with scroll distance (value * 0.15)
  const logoRotation = useTransform(scrollY, (value) => value * 0.15);

  const handleExploreClick = () => {
    const el = document.getElementById("solutions");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Preloader Phase */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* 
        STEALTH ECLIPSE LOGO CONTAINER (z-index: 0)
        Only shown on home view
      */}
      {currentView === "home" && (
        <motion.div
          style={{
            scale: logoScale,
            x: logoX,
            rotate: logoRotation,
          }}
          className="fixed top-1/2 -translate-y-1/2 right-0 pointer-events-none z-0 hidden md:flex items-center justify-center transform-gpu"
        >
          <DomCodeLogo size={1000} />
        </motion.div>
      )}

      {/* PAGE CONTENT WRAPPER (z-index: 10) */}
      <div className="relative z-10 pointer-events-auto">
        <Navbar 
          onViewPortfolio={() => { setCurrentView("portfolio"); window.scrollTo({ top: 0 }); }}
          onOpenAdmin={() => { setCurrentView("admin"); window.scrollTo({ top: 0 }); }}
        />

        <main className="relative">
          {currentView === "home" && (
            <>
              <Hero 
                onExploreClick={handleExploreClick} 
                onViewPortfolio={() => { setCurrentView("portfolio"); window.scrollTo({ top: 0 }); }}
              />
              <ScrollytellingSection />
              <ContactSection />
            </>
          )}

          {currentView === "portfolio" && (
            <Portfolio onBackToHome={() => { setCurrentView("home"); window.scrollTo({ top: 0 }); }} />
          )}

          {currentView === "admin" && (
            <Admin onBackToHome={() => { setCurrentView("home"); window.scrollTo({ top: 0 }); }} />
          )}
        </main>

        <Footer onOpenAdmin={() => { setCurrentView("admin"); window.scrollTo({ top: 0 }); }} />
      </div>

      {/* PERSISTENT MOBILE FLOATING ACTION BUTTON (FAB: "✦ See My Work") */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            if (currentView === "portfolio") {
              setCurrentView("home");
              window.scrollTo({ top: 0 });
            } else {
              setCurrentView("portfolio");
              window.scrollTo({ top: 0 });
            }
          }}
          className="px-5 py-3.5 rounded-full bg-white text-black text-xs font-mono font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center space-x-2 cursor-pointer active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{currentView === "portfolio" ? "← Home" : "✦ See My Work"}</span>
        </button>
      </div>
    </div>
  );
}
