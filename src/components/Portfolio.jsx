import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Portfolio({ onBackToHome }) {
  const defaultProjects = [
    {
      id: 1,
      title: "Arfiya's Nailventure",
      subtitle: "Premium Nail Salon & Lookbook App",
      description: "A bespoke, mobile-first web application engineered for luxury salon services. Features a dynamic, interactive nail art lookbook and a frictionless appointment scheduling engine that automates client bookings.",
      image: "/portfolio/arfiya.png",
      tags: ["Next.js", "Tailwind CSS", "Booking Engine"],
      link: "#"
    },
    {
      id: 2,
      title: "Dr. Meenakshi ENT Clinic",
      subtitle: "Specialized Medical & Patient Triage Dashboard",
      description: "A comprehensive healthcare management portal streamlining patient intake. Built with a highly secure, intuitive dashboard for managing upcoming appointments, clinical history, and showcasing specialized ENT procedures.",
      image: "/portfolio/meenakshi.jpg",
      tags: ["React", "Node.js", "Patient CRM"],
      link: "#"
    },
    {
      id: 3,
      title: "VB Fitness",
      subtitle: "Gym CRM & Membership Automation Platform",
      description: "A high-performance digital ecosystem for a premier fitness center in Kondhwa Budruk. Features automated member onboarding, live class rosters for CrossFit and Zumba, and a complete administrative dashboard for trainers.",
      image: "/portfolio/vb_fitness.jpg",
      tags: ["Full Stack", "PostgreSQL", "Member Portal"],
      link: "#"
    },
    {
      id: 4,
      title: "Dona Cucina",
      subtitle: "Digital Menu & Real-Time Kitchen Sync",
      description: "An end-to-end restaurant automation system engineered for a high-volume cafe in Koregaon Park. Delivers instant QR-based table ordering, custom menu modifiers, and a live WebSocket-driven kitchen display system.",
      image: "/portfolio/dona_cucina.jpg",
      tags: ["WebSockets", "TypeScript", "Payment Gateway"],
      link: "#"
    }
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const savedProjects = localStorage.getItem("domcode_portfolio_projects");
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      } catch (err) {
        console.error("Failed to parse portfolio projects", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <span>← Back to DomCode Home</span>
          </button>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
            Featured Case Studies
          </span>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Recent Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 text-base sm:text-xl font-light leading-relaxed"
          >
            Engineering world-class logic and seamless digital experiences.
          </motion.p>
        </div>

        {/* 2-Column CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card rounded-2xl border border-white/10 p-4 sm:p-6 group hover:border-white/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Aspect-Video Image Container */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-zinc-900 border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* External Link Arrow Badge on Hover */}
                  <div className="absolute top-3 right-3 p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mb-1 group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <span className="text-xs text-zinc-500 font-normal font-sans group-hover:text-white transition-colors flex items-center">
                    View Project <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </h3>

                {/* Subtitle */}
                <div className="text-xs font-mono text-emerald-400 mb-3 font-semibold">
                  {project.subtitle}
                </div>

                {/* 2-Line Description */}
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl glass-card border border-white/15 text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white mb-3">
            Have a project in mind?
          </h3>
          <p className="text-zinc-400 text-sm max-w-lg mb-6 font-light">
            Direct collaboration with Lead Developer Irfan Shaikh. Let's engineer a solution around your business goals.
          </p>
          <button
            onClick={onBackToHome}
            className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            Start Your Business Project
          </button>
        </div>

      </div>
    </div>
  );
}
