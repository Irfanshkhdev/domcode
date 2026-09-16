import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Check, Send, MessageCircle, Cpu, Layers, Code, Database, Server, Terminal } from 'lucide-react';
import MenuAppSimulator from './MenuAppSimulator';
import BookingAppSimulator from './BookingAppSimulator';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function ScrollytellingSection() {
  const sections = [
    {
      id: "menu-apps",
      stepNumber: "01",
      badge: "Custom Web Apps & Menu Systems",
      title: "Custom Web Applications & Digital Menu Solutions",
      description: "Fast, responsive web applications engineered for maximum conversions. We replace clunky legacy systems with instant table QR ordering, real-time kitchen displays, and zero-install client convenience.",
      highlights: [
        "Instant Table QR Ordering (No App Install Required)",
        "Real-Time Kitchen Display Sync & Order Status",
        "Multi-Currency & Custom Price Modifiers",
        "Sub-100ms Ultra Fast Page Speed"
      ],
      component: <MenuAppSimulator />
    },
    {
      id: "booking-systems",
      stepNumber: "02",
      badge: "Automation & Booking Engines",
      title: "Automated Booking Systems & Local Workflows",
      description: "Reclaim your time. We automate client appointments, consultations, and venue bookings with zero manual effort. Featuring integrated calendar sync, instant WhatsApp notifications, and custom dashboards.",
      highlights: [
        "Automated Calendar & Time Slot Allocation",
        "Instant WhatsApp & Email Confirmations",
        "Local Business Workflow Integration",
        "Revenue & Analytics Dashboard"
      ],
      component: <BookingAppSimulator />
    },
    {
      id: "direct-contact",
      stepNumber: "03",
      badge: "Direct Architecture & Full Stack",
      title: "Engineered By Irfan Shaikh — Lead Developer",
      description: "Direct collaboration with full-stack software expertise. No middlemen, no bloated agency fees. Just tailored web solutions designed and deployed specifically around your unique business operations.",
      techStack: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "PostgreSQL", "MongoDB"],
      socialButtons: true,
      component: <ContactQuickBox />
    }
  ];

  return (
    <section id="solutions" className="relative bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-24">
        {sections.map((sec) => (
          <motion.div
            key={sec.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Information Card & Interactive Simulator (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step Pill */}
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold tracking-wider">
                  STEP {sec.stepNumber} / 03
                </span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {sec.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                  {sec.title}
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                  {sec.description}
                </p>
              </div>

              {/* Bullet Highlights */}
              {sec.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {sec.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs font-mono text-zinc-300">
                      <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Marquee / Grid for Step 03 */}
              {sec.techStack && (
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Core Engineering Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sec.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Action Launchers */}
              {sec.socialButtons && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://wa.me/917262950982?text=Hi%20Irfan,%20I'd%20like%20to%20discuss%20a%20project%20with%20DomCode."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold flex items-center space-x-2 hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold flex items-center space-x-2 hover:bg-pink-500 hover:text-white transition-all"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="tel:+917262950982"
                    className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-mono font-semibold flex items-center space-x-2 hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 7262950982</span>
                  </a>
                </div>
              )}

              {/* Interactive Widget */}
              <div className="pt-2">
                {sec.component}
              </div>
            </div>

            {/* Right Column: Spacer reserved for single fixed root logo */}
            <div className="hidden lg:block lg:col-span-5 h-[350px] pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/**
 * Quick Direct Message Box Component
 */
function ContactQuickBox() {
  const [submitted, setSubmitted] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    // 1. Send quick inquiry to Irfan Shaikh via Web3Forms API
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "8eb59931-f151-4382-a5df-5dea3328fbf5",
          subject: `⚡ Quick Consultation Request from ${name.trim() || "Website Visitor"}`,
          from_name: "DomCode Quick Contact",
          name: name.trim() || "Website Visitor",
          phone: phone.trim() || "Not provided",
          message: msg.trim()
        })
      });
    } catch (err) {
      console.error("Web3Forms submission notice:", err);
    }

    // 2. Save message to localStorage so Admin Inbox receives it instantly!
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: name.trim() || "Website Visitor",
      email: "inquiry@client.com",
      phone: phone.trim() || "+91 7262950982",
      projectType: "Direct Developer Message",
      message: msg.trim(),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "unread"
    };

    try {
      const existing = JSON.parse(localStorage.getItem("domcode_messages") || "[]");
      const updated = [newMsg, ...existing];
      localStorage.setItem("domcode_messages", JSON.stringify(updated));
    } catch (err) {
      // fallback
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMsg('');
      setName('');
      setPhone('');
    }, 4000);
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>Direct Message to Irfan Shaikh</span>
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Instant Developer Inbox
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name (Optional)"
            className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-sans"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone / WhatsApp (Optional)"
            className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-sans"
          />
        </div>

        <textarea
          rows={2}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Describe your web application or business software needs..."
          className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors font-sans resize-none"
        />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-500">Fast response guaranteed</span>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            {submitted ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sent to Admin Inbox!</span>
              </>
            ) : (
              <>
                <span>Send Quick Message</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
