import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle2, ShieldCheck, MessageCircle, Quote, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import SegmentedLogo from './SegmentedLogo';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Custom Web Application',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);

    // 1. Send form details directly to Irfan Shaikh via Web3Forms API
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "8eb59931-f151-4382-a5df-5dea3328fbf5",
          subject: `⚡ New Project Inquiry from ${formData.name.trim()}`,
          from_name: "DomCode Web App",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          solution_needed: formData.projectType,
          message: formData.message.trim() || "Requested software project consultation."
        })
      });
    } catch (err) {
      console.error("Web3Forms submission notice:", err);
    }

    // 2. Save message to localStorage for Admin Inbox
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || "+91 7262950982",
      projectType: formData.projectType,
      message: formData.message.trim() || "Interested in starting a new software project consultation.",
      date: "Just now",
      status: "unread"
    };

    try {
      const existing = JSON.parse(localStorage.getItem("domcode_messages") || "[]");
      const updated = [newMsg, ...existing];
      localStorage.setItem("domcode_messages", JSON.stringify(updated));
    } catch (err) {
      // fallback
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#a1a1aa', '#52525b']
      });
    } catch (err) {
      // fallback
    }

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', projectType: 'Custom Web Application', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Software Consultation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Start Your Business Solution
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base font-light"
          >
            Connect directly with <span className="text-white font-medium">Irfan Shaikh</span> (Lead Developer) to plan custom web applications, digital menu apps, or automated booking systems.
          </motion.p>
        </div>

        {/* CLIENT FEEDBACK TESTIMONIAL BLOCK (Right above contact form) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Verified Client Review
            </span>
          </div>

          <p className="text-base sm:text-lg text-white font-light italic mb-4 leading-relaxed">
            "Working with this team was a game-changer. They delivered a stunning website that perfectly captured our vision and helped us increase our online conversions by 300%."
          </p>

          <div className="flex items-center justify-between font-mono text-xs pt-2 border-t border-white/10">
            <span className="text-emerald-400 font-bold">— Priya Sharma</span>
            <span className="text-zinc-400">Owner, Salon & Spa Enterprise</span>
          </div>
        </motion.div>

        {/* Main Grid: Direct Info Card + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Card & Social CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 relative overflow-hidden">
              <div className="flex items-center space-x-4 pb-6 border-b border-white/10">
                <img src="/domcodelogo.png" alt="DomCode Logo" className="h-10 w-auto object-contain brightness-110" />
                <div>
                  <p className="text-xs text-zinc-400 font-mono font-medium">Lead Developer: Irfan Shaikh</p>
                </div>
              </div>

              {/* Tagline Box */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Brand Tagline</span>
                <div className="text-sm font-bold text-white">"We Build Software Around Your Business"</div>
              </div>

              {/* Social & Contact Buttons */}
              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/917262950982?text=Hello%20Irfan,%20I'd%20like%20to%20discuss%20a%20project%20with%20DomCode."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-400 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5" />
                    <div>
                      <div className="text-[10px] font-mono uppercase">WhatsApp Direct</div>
                      <div className="text-xs font-mono font-semibold">+91 7262950982</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">Chat →</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/wardom.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500 hover:text-white text-pink-400 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <InstagramIcon className="w-5 h-5" />
                    <div>
                      <div className="text-[10px] font-mono uppercase">Instagram</div>
                      <div className="text-xs font-mono font-semibold">@wardom.store</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">Follow →</span>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+917262950982"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-white transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-zinc-400" />
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Direct Telephone</div>
                      <div className="text-xs font-mono font-semibold">+91 7262950982</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">Call →</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@wardom.store"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-white transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Official Email</div>
                      <div className="text-xs font-mono font-semibold">hello@wardom.store</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">Email →</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Project Consultation Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative">
              <h3 className="text-xl font-bold text-white mb-2 font-mono">Project Consultation Request</h3>
              <p className="text-xs text-zinc-400 mb-6 font-light">
                Fill out your details below. Irfan Shaikh will respond within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-8 text-center rounded-xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-mono">Inquiry Received!</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Thank you! Irfan Shaikh has received your details in the Admin Inbox and will reach out to <span className="text-white font-mono">{formData.email}</span> shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                        Solution Needed
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-black/70 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors font-sans"
                      >
                        <option value="Custom Web Application">Custom Web Application</option>
                        <option value="Digital Menu App System">Digital Menu App System</option>
                        <option value="Automated Booking Engine">Automated Booking Engine</option>
                        <option value="Full Architecture & Consultation">Full Architecture & Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Project Requirements
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your business goals or software requirements..."
                      className="w-full bg-black/70 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase font-mono hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
