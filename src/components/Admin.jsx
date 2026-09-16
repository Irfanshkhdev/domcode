import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Trash2, ShieldCheck, Plus, ExternalLink, Image, CheckCircle2, Clock, Sparkles, FolderPlus, Lock, LogOut, KeyRound, UserCheck, AlertCircle } from 'lucide-react';

// Dynamic Daily Password Generator
// Formula: irfan@grind{day}{date} (e.g. irfan@grindwednesday16)
const getDailyPassword = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dateNum = today.getDate();
  return `irfan@grind${dayName}${dateNum}`;
};

const AUTHORIZED_EMAIL = "irfanshaikh3262@gmail.com";

export default function Admin({ onBackToHome }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("domcode_admin_auth") === "true";
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Dashboard State
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

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    const expectedPassword = getDailyPassword();
    const formattedEmail = loginEmail.trim().toLowerCase();

    if (formattedEmail === AUTHORIZED_EMAIL && loginPassword.trim() === expectedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("domcode_admin_auth", "true");
    } else {
      setLoginError("Invalid credentials. Please verify your authorized email and today's dynamic security password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("domcode_admin_auth");
    setLoginEmail('');
    setLoginPassword('');
  };

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

  // ================= 1. SECURE LOGIN SCREEN (IF NOT AUTHENTICATED) =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="max-w-md w-full bg-white text-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 relative overflow-hidden">
          
          {/* Top Security Banner */}
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">DomCode Developer Console</h1>
              <p className="text-xs text-slate-500 font-mono">Restricted Access • Irfan Shaikh Desk</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 font-medium">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                Authorized Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="irfanshaikh3262@gmail.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-mono flex justify-between">
                <span>Daily Security Password</span>
                <span className="text-[10px] text-indigo-600 font-normal">Dynamic Daily Auth</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs tracking-wider uppercase font-mono hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          {/* Return to Public Website */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-500 hover:text-slate-900 font-mono transition-colors"
            >
              ← Return to DomCode Public Site
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ================= 2. TRADITIONAL LIGHT SAAS DASHBOARD (AUTHENTICATED) =================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white pt-20 pb-16">
      
      {/* Top Traditional SaaS Header Bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-sm">
              DC
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono tracking-tight">DomCode Console</div>
              <div className="text-[10px] text-slate-500 font-mono">Developer Dashboard • Irfan Shaikh</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              ← Public Site
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-mono border border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer"
              title="End session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main SaaS Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Navigation Bar & Summary Stats */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl font-bold text-slate-900 font-mono">Console Overview</h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-light">
              Manage live client inquiries and maintain your portfolio case studies.
            </p>
          </div>

          {/* Crisp Traditional Tabs */}
          <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              Client Inbox ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "portfolio"
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              Portfolio Manager ({projects.length})
            </button>
          </div>
        </div>

        {/* ================= 1. CLIENT INBOX TAB ================= */}
        {activeTab === "inbox" && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Recent Client Messages ({messages.length})
              </h2>

              {messages.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm("Clear all inbox messages?")) {
                      setMessages([]);
                      localStorage.setItem("domcode_messages", JSON.stringify([]));
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-mono hover:bg-red-100 transition-all cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm space-y-2">
                <Mail className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800 font-mono">Inbox is Empty</h3>
                <p className="text-xs text-slate-500 font-light">Form submissions from site visitors will land here instantly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                          {msg.name ? msg.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{msg.name || "Anonymous Client"}</div>
                          <div className="text-xs font-mono text-indigo-600 font-semibold">{msg.projectType || "Consultation Request"}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{msg.date || "Recent"}</span>
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                      "{msg.message}"
                    </div>

                    {/* Action Triggers */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
                        {msg.email && (
                          <div className="flex items-center space-x-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-800 font-medium">{msg.email}</span>
                          </div>
                        )}
                        {msg.phone && (
                          <div className="flex items-center space-x-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-800 font-medium">{msg.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {msg.phone && (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(msg.name)},%20I'm%20Irfan%20Shaikh%20from%20DomCode.%20Received%20your%20message!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-mono font-semibold flex items-center space-x-1.5 hover:bg-emerald-700 transition-all shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Reply</span>
                          </a>
                        )}

                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}?subject=DomCode%20Consultation%20Reply`}
                            className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-mono font-semibold flex items-center space-x-1.5 hover:bg-sky-700 transition-all shadow-sm"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email Client</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ================= 2. PORTFOLIO MANAGER TAB ================= */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            
            {/* Add Project Form Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
                <FolderPlus className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">Publish New Portfolio Case Study</h3>
              </div>

              {showAddSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Project successfully added to portfolio!</span>
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Apex Fitness App"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Subtitle / Category *</label>
                    <input
                      type="text"
                      required
                      value={newProject.subtitle}
                      onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                      placeholder="e.g. Custom Workout Booking Web App"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Description *</label>
                  <textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Brief 2-line summary of project goals and features..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Image URL or File Upload</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        placeholder="/portfolio/yana.jpg or https://..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      <label className="px-3 py-2.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all cursor-pointer flex items-center justify-center text-xs font-mono whitespace-nowrap">
                        <Image className="w-4 h-4 mr-1" />
                        <span>File</span>
                        <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      placeholder="React, Next.js, Tailwind"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold font-mono text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all cursor-pointer shadow-sm flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Case Study</span>
                </button>
              </form>
            </div>

            {/* Active Case Studies List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Live Case Studies ({projects.length})</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start space-x-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-20 h-14 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate font-mono">{proj.title}</h4>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[10px] font-mono text-indigo-600 truncate">{proj.subtitle}</div>
                      <p className="text-[10px] text-slate-500 font-light truncate mt-0.5">{proj.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
