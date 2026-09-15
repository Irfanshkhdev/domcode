import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, User, ChevronRight, Sparkles } from 'lucide-react';

export default function BookingAppSimulator() {
  const [selectedService, setSelectedService] = useState("Custom App Sprint");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { title: "Custom App Sprint", duration: "45 mins", desc: "Architecture & Blueprint" },
    { title: "Tech Stack Audit", duration: "30 mins", desc: "Performance Optimization" },
    { title: "Local Business Automation", duration: "60 mins", desc: "Booking & Workflow Integration" },
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
    }, 3500);
  };

  return (
    <div className="w-full glass-card rounded-2xl p-5 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">Automated Booking Engine</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          Syncs with Google / Outlook
        </span>
      </div>

      {/* Service Selection */}
      <div className="space-y-2 mb-4">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">1. Select Service</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {services.map((srv) => (
            <button
              key={srv.title}
              onClick={() => setSelectedService(srv.title)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                selectedService === srv.title
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.03] text-zinc-300 border-white/5 hover:border-white/20"
              }`}
            >
              <div className="text-xs font-semibold">{srv.title}</div>
              <div className={`text-[10px] font-mono mt-0.5 ${selectedService === srv.title ? "text-zinc-700" : "text-zinc-500"}`}>
                {srv.duration}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selector */}
      <div className="mb-4">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">2. Available Slots Today</label>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all whitespace-nowrap ${
                selectedTime === slot
                  ? "bg-zinc-200 text-black border-white font-semibold"
                  : "bg-white/5 text-zinc-400 border-white/5 hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation & CTA */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Selected Appointment</span>
          <span className="text-xs font-mono text-white font-medium">{selectedService} • {selectedTime}</span>
        </div>

        <button
          onClick={handleBook}
          className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-semibold flex items-center space-x-2 shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all cursor-pointer"
        >
          {isBooked ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confirmed!</span>
            </>
          ) : (
            <>
              <span>Instant Book</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
