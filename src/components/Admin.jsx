import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Trash2, ShieldCheck, Plus, ExternalLink, Image, CheckCircle2, Clock, Sparkles, FolderPlus } from 'lucide-react';

export default function Admin({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState("inbox"); // "inbox" | "portfolio"
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  // Form State for Adding New Project
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    link: '#',
    tags: 'React, Tailwind CSS'
  });
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Initial seed demo messages if localStorage is empty
  const initialDemoMessages = [
    {
      id: "msg-1",
      name: "Ananya Deshmukh",
      email: "ananya@salonglow.com",
      phone: "+91 9823011223",
      projectType: "Digital Menu & Booking App",
      message: "Hi Irfan, we loved your menu app and booking system demos! We run a multi-branch wellness studio and need a custom booking workflow integrated with WhatsApp.",
      date: "Today at 09:15 AM",
      status: "unread"
    },
    {
      id: "msg-2",
      name: "Vikram Malhotra",
      email: "vikram@malhotraenterprises.in",
      phone: "+91 9811234567",
      projectType: "Custom Enterprise Web App",
      message: "Looking to overhaul our client onboarding portal with sub-100ms response times. Let's schedule an architecture sprint this week.",
      date: "Yesterday at 04:40 PM",
      status: "read"
    }
  ];

  // Initial default portfolio projects
  const defaultProjects = [
    {
      id: 1,
      title: "Yana Nail Studio",
      subtitle: "Bespoke Nail Salon Web App",
      description: "Custom luxury salon web application with integrated online appointment scheduling, service showcase, and instant WhatsApp booking sync.",
      image: "/portfolio/yana.jpg",
      tags: ["React", "Tailwind CSS", "Booking Sync"],
      link: "#"
    },
    {
      id: 2,
      title: "The Girlfriend Hour",
      subtitle: "Podcast & Media Platform",
      description: "High-converting dark mode podcast streaming and media platform featuring custom audio player components, episode archives, and sponsor integration.",
      image: "/portfolio/girlfriend.jpg",
      tags: ["Next.js", "Media Engine", "Tailwind"],
      link: "#"
    },
    {
      id: 3,
      title: "Amber ENT",
      subtitle: "Patient Intake & Triage Engine",
      description: "Futuristic medical healthcare patient triage system automating appointment requests, intake forms, and emergency urgency scoring.",
      image: "/portfolio/amber.jpg",
      tags: ["Full Stack", "TypeScript", "Node.js"],
      link: "#"
    },
    {
      id: 4,
      title: "Rishu Portfolio",
      subtitle: "High-Impact Digital Identity",
      description: "Bespoke personal brand identity and interactive portfolio platform engineered with high-end scroll physics and kinetic typography.",
      image: "/portfolio/rishu.jpg",
      tags: ["Framer Motion", "React", "Kinetic Design"],
      link: "#"
    }
  ];

  useEffect(() => {
    // Load Messages
    const savedMsgs = localStorage.getItem("domcode_messages");
    if (savedMsgs) {
      try {
        setMessages(JSON.parse(savedMsgs));
      } catch (err) {
        setMessages(initialDemoMessages);
      }
    } else {
      setMessages(initialDemoMessages);
      localStorage.setItem("domcode_messages", JSON.stringify(initialDemoMessages));
    }

    // Load Projects
    const savedProjects = localStorage.getItem("domcode_portfolio_projects");
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (err) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem("domcode_portfolio_projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const handleDeleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem("domcode_messages", JSON.stringify(updated));
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to remove this project from your portfolio?")) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem("domcode_portfolio_projects", JSON.stringify(updated));
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.subtitle) return;

    const projectToAdd = {
      id: Date.now(),
      title: newProject.title.trim(),
      subtitle: newProject.subtitle.trim(),
      description: newProject.description.trim() || "Custom tailored software solution engineered by DomCode.",
      image: newProject.image.trim() || "/portfolio/yana.jpg",
      link: newProject.link.trim() || "#",
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updated = [projectToAdd, ...projects];
    setProjects(updated);
    localStorage.setItem("domcode_portfolio_projects", JSON.stringify(updated));

    setShowAddSuccess(true);
    setNewProject({ title: '', subtitle: '', description: '', image: '', link: '#', tags: 'React, Tailwind CSS' });
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Top Navigation & Status Bar */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={onBackToHome}
              className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider mb-1.5 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>← Back to DomCode Website</span>
            </button>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">DomCode Admin Portal</h1>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                🔒 Irfan Shaikh Desk
              </span>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex space-x-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Developer Inbox ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "portfolio"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Portfolio Manager ({projects.length})
            </button>
          </div>
        </div>

        {/* ================= INBOX TAB ================= */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-mono text-white">Client Inbox & Direct Inquiries</h2>
                <p className="text-xs text-zinc-400 font-light">
                  Real-time list of all messages submitted through the website quick forms.
                </p>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Clear all inbox messages?")) {
                      setMessages([]);
                      localStorage.setItem("domcode_messages", JSON.stringify([]));
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                >
                  Clear Inbox
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border border-white/10">
                <Mail className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white font-mono">No New Messages</h3>
                <p className="text-xs text-zinc-400 font-light">Messages sent by client visitors will land here instantly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-emerald rounded-2xl p-6 space-y-4 relative"
                  >
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-bold text-base">
                          {msg.name ? msg.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div>
                          <div className="text-base font-bold text-white">{msg.name || "Anonymous Client"}</div>
                          <div className="text-xs font-mono text-emerald-400 font-semibold">{msg.projectType || "Consultation Request"}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono text-zinc-400 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{msg.date || "Recent"}</span>
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-black/70 rounded-xl p-4 border border-white/10 text-xs text-zinc-200 font-sans leading-relaxed">
                      "{msg.message}"
                    </div>

                    {/* Contact Channels & One-Click Triggers */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
                        {msg.email && (
                          <div className="flex items-center space-x-1.5">
                            <Mail className="w-4 h-4 text-sky-400" />
                            <span className="text-white font-medium">{msg.email}</span>
                          </div>
                        )}
                        {msg.phone && (
                          <div className="flex items-center space-x-1.5">
                            <Phone className="w-4 h-4 text-emerald-400" />
                            <span className="text-white font-medium">{msg.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {msg.phone && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(msg.name)},%20I'm%20Irfan%20Shaikh%20from%20DomCode.%20Received%20your%20message!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp Reply</span>
                          </a>
                        )}

                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}?subject=DomCode%20Consultation%20Reply`}
                            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-zinc-200 transition-all"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email Client</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PORTFOLIO MANAGER TAB ================= */}
        {activeTab === "portfolio" && (
          <div className="space-y-8">
            
            {/* Add New Project Card Form */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                <FolderPlus className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-lg font-bold font-mono text-white">Add New Portfolio Project</h2>
                  <p className="text-xs text-zinc-400 font-light">Upload a project to feature live on the /portfolio case studies grid.</p>
                </div>
              </div>

              {showAddSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Project successfully published to portfolio!</span>
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Apex Fitness App"
                      className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      Subtitle / Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.subtitle}
                      onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                      placeholder="e.g. Custom Workout Booking Web App"
                      className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Brief 2-line summary of project goals and features..."
                    className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white font-sans resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      Image URL or Upload File
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        placeholder="/portfolio/yana.jpg or https://..."
                        className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white font-sans"
                      />
                      <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black transition-all cursor-pointer flex items-center justify-center text-xs font-mono text-white whitespace-nowrap">
                        <Image className="w-4 h-4 mr-1" />
                        <span>File</span>
                        <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      placeholder="React, Next.js, Tailwind"
                      className="w-full bg-black/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Project to Portfolio</span>
                </button>
              </form>
            </div>

            {/* Active Projects List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-mono text-white">Active Case Studies ({projects.length})</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="glass-card rounded-2xl p-4 border border-white/10 flex items-start space-x-4">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-24 h-16 object-cover rounded-lg border border-white/10 bg-zinc-900"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white truncate font-mono">{proj.title}</h4>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          title="Remove project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 truncate">{proj.subtitle}</div>
                      <p className="text-[11px] text-zinc-400 font-light truncate mt-1">{proj.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
