import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, User, ChevronRight, Menu, Sparkles, Scissors, X, Shield, Star, Award } from 'lucide-react';

export default function BookingAppSimulator() {
  const [selectedService, setSelectedService] = useState("Premium Haircut & Fade");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");
  const [isBooked, setIsBooked] = useState(false);
  
  // Interactive Modals State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const services = [
    { 
      title: "Premium Haircut & Fade", 
      duration: "45 mins", 
      price: "₹499", 
      desc: "Precision Cut & Styling",
      category: "hair",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=120&q=80"
    },
    { 
      title: "Deep Tissue Massage", 
      duration: "60 mins", 
      price: "₹999", 
      desc: "Therapeutic Relaxation",
      category: "spa",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=120&q=80"
    },
    { 
      title: "Executive Grooming Package", 
      duration: "90 mins", 
      price: "₹1,499", 
      desc: "Full Treatment & Shave",
      category: "package",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=120&q=80"
    },
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
    }, 3500);
  };

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-zinc-950 border-[9px] border-zinc-700/80 rounded-[2.5rem] shadow-[0_0_35px_rgba(255,255,255,0.15)] ring-1 ring-white/20 overflow-hidden flex flex-col justify-between text-white font-sans transition-all duration-300">
      
      {/* Metallic Phone Hardware Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800/90 w-32 mx-auto rounded-b-xl z-30 border-b border-white/10 flex items-center justify-center">
        <div className="w-10 h-1.5 rounded-full bg-zinc-900" />
      </div>

      {/* App Mobile Glass Header */}
      <div className="pt-7 px-4 pb-3 bg-zinc-900/95 backdrop-blur-md border-b border-white/10 z-20 flex items-center justify-between">
        <button 
          onClick={() => setShowMenuModal(true)}
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-90"
          title="Open Salon Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold font-mono tracking-wide text-white">Luxe Salon & Spa</span>
          <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Booking Engine
          </span>
        </div>

        {/* Working Profile Button */}
        <button 
          onClick={() => setShowProfileModal(true)}
          className="relative p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-90 border border-white/15"
          title="View Client Profile"
        >
          <User className="w-3.5 h-3.5 text-emerald-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>
      </div>

      {/* Main Screen Content Body */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-3 scrollbar-none relative z-10">
        
        {/* Banner */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">24/7 Appointment Booking</div>
            <div className="text-xs font-bold text-white">Select Spa Treatment</div>
          </div>
          <Scissors className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-none">
          {["all", "hair", "spa", "package"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black font-bold shadow-sm"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Selection with Service Images */}
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">1. Select Service</label>
          <div className="space-y-1.5">
            {filteredServices.map((srv) => (
              <button
                key={srv.title}
                onClick={() => setSelectedService(srv.title)}
                className={`w-full p-2 rounded-xl text-left border transition-all flex items-center space-x-2.5 cursor-pointer ${
                  selectedService === srv.title
                    ? "bg-white text-black border-white shadow-md font-semibold"
                    : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/20"
                }`}
              >
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs truncate">{srv.title}</div>
                  <div className={`text-[9px] font-mono truncate ${selectedService === srv.title ? "text-zinc-600" : "text-zinc-500"}`}>
                    {srv.duration} • {srv.desc}
                  </div>
                </div>
                <div className={`text-xs font-mono font-bold flex-shrink-0 ${selectedService === srv.title ? "text-black" : "text-emerald-400"}`}>
                  {srv.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selector */}
        <div>
          <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">2. Today's Open Slots</label>
          <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-mono border transition-all whitespace-nowrap cursor-pointer ${
                  selectedTime === slot
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm"
                    : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="p-3 bg-zinc-900 border-t border-white/10 z-20">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[9px] font-mono text-zinc-300 truncate max-w-[160px]">
            {selectedService}
          </span>
          <span className="text-[9px] font-mono text-emerald-400 font-bold">{selectedTime}</span>
        </div>

        <button
          onClick={handleBook}
          className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          {isBooked ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Booked & Synced!</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>Confirm Booking</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </>
          )}
        </button>
      </div>

      {/* CLIENT PROFILE MODAL */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md z-40 p-4 pt-9 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono text-white">Client VIP Profile</span>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="p-1 rounded-full bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm font-mono">
                    AM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Alex Morgan</div>
                    <div className="text-[9px] font-mono text-emerald-400 flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>VIP Member (450 Points)</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase">Active Booking</span>
                  <div className="text-xs font-medium text-white">{selectedService}</div>
                  <div className="text-[10px] font-mono text-emerald-400">Today at {selectedTime}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-mono font-bold"
            >
              Close Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SALON MENU MODAL */}
      <AnimatePresence>
        {showMenuModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md z-40 p-4 pt-9 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Scissors className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono text-white">Luxe Salon Info</span>
                </div>
                <button 
                  onClick={() => setShowMenuModal(false)}
                  className="p-1 rounded-full bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-white font-semibold">📍 Location & Hours</div>
                  <div className="text-[10px] font-mono text-zinc-400">Open 7 Days • 09:00 AM - 09:00 PM</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-white font-semibold">✨ Automated Sync</div>
                  <div className="text-[10px] font-mono text-emerald-400">Google & WhatsApp Calendar Integrated</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMenuModal(false)}
              className="w-full py-2 rounded-xl bg-white text-black text-xs font-mono font-bold"
            >
              Back to Booking
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
