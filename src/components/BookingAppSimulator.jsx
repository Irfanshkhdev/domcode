import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, User, ChevronRight, Menu, Sparkles, Scissors } from 'lucide-react';

export default function BookingAppSimulator() {
  const [selectedService, setSelectedService] = useState("Premium Haircut & Fade");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { title: "Premium Haircut & Fade", duration: "45 mins", price: "₹499", desc: "Precision Cut & Styling" },
    { title: "Deep Tissue Massage", duration: "60 mins", price: "₹999", desc: "Therapeutic Relaxation" },
    { title: "Executive Grooming Package", duration: "90 mins", price: "₹1,499", desc: "Full Treatment & Shave" },
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "02:30 PM", "04:00 PM", "05:30 PM"];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
    }, 3500);
  };

  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-black border-[8px] border-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col justify-between text-white font-sans">
      
      {/* iPhone Dynamic Island Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 w-32 mx-auto rounded-b-xl z-20" />

      {/* App Mobile Glass Header */}
      <div className="pt-7 px-4 pb-3 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 z-10 flex items-center justify-between">
        <button className="p-1 text-zinc-400 hover:text-white transition-colors">
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold font-mono tracking-wide text-white">Luxe Salon & Spa</span>
          <span className="text-[9px] font-mono text-emerald-400">● Live Booking App</span>
        </div>

        <button className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <User className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Screen Content Body */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4 scrollbar-none">
        
        {/* Banner */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Automated Booking</div>
            <div className="text-xs font-bold text-white">Select Spa Service</div>
          </div>
          <Scissors className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">1. Service</label>
          <div className="space-y-1.5">
            {services.map((srv) => (
              <button
                key={srv.title}
                onClick={() => setSelectedService(srv.title)}
                className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  selectedService === srv.title
                    ? "bg-white text-black border-white shadow-md font-semibold"
                    : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="text-xs">{srv.title}</div>
                  <div className={`text-[9px] font-mono ${selectedService === srv.title ? "text-zinc-600" : "text-zinc-500"}`}>
                    {srv.duration} • {srv.desc}
                  </div>
                </div>
                <div className={`text-xs font-mono font-bold ${selectedService === srv.title ? "text-black" : "text-emerald-400"}`}>
                  {srv.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selector */}
        <div>
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">2. Available Today</label>
          <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono border transition-all whitespace-nowrap ${
                  selectedTime === slot
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold"
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
      <div className="p-3 bg-zinc-950 border-t border-white/10 z-10">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[170px]">
            {selectedService}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">{selectedTime}</span>
        </div>

        <button
          onClick={handleBook}
          className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          {isBooked ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Appointment Booked!</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>Confirm Instant Booking</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
