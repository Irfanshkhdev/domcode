import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShoppingBag, Plus, Check, Utensils, Menu, Sparkles } from 'lucide-react';

export default function MenuAppSimulator() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const menuItems = [
    { id: 1, name: "Signature Espresso", category: "drinks", price: "$4.50", tag: "Popular" },
    { id: 2, name: "Truffle Wagyu Burger", category: "mains", price: "$18.00", tag: "Chef Special" },
    { id: 3, name: "Margherita Pizza", category: "mains", price: "$14.50", tag: "Woodfired" },
    { id: 4, name: "Organic Matcha Latte", category: "drinks", price: "$5.50", tag: "Organic" },
    { id: 5, name: "Dark Choco Fondant", category: "desserts", price: "$8.50", tag: "Decadent" },
  ];

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  const handleSimulateOrder = () => {
    if (cart.length === 0) return;
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
      setCart([]);
    }, 3000);
  };

  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-black border-[8px] border-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col justify-between text-white font-sans">
      
      {/* iPhone Dynamic Island Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 w-32 mx-auto rounded-b-xl z-20" />

      {/* Mobile Glass Header */}
      <div className="pt-7 px-4 pb-3 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 z-10 flex items-center justify-between">
        <button className="p-1 text-zinc-400 hover:text-white transition-colors">
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold font-mono tracking-wide text-white">Artisan Cafe</span>
          <span className="text-[9px] font-mono text-emerald-400">● Table #07 Active</span>
        </div>

        <div className="relative p-1.5 rounded-full bg-white/10 text-white">
          <ShoppingBag className="w-3.5 h-3.5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-black text-[8px] font-mono font-bold flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="px-3 pt-3 pb-1 border-b border-white/5 bg-zinc-950/50 flex space-x-1.5 overflow-x-auto scrollbar-none">
        {["all", "mains", "drinks", "desserts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-white text-black font-bold shadow-sm"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Screen Menu Items List */}
      <div className="flex-1 px-3 py-2.5 overflow-y-auto space-y-2 scrollbar-none">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all"
          >
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-white truncate">{item.name}</span>
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 whitespace-nowrap">
                  {item.tag}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">{item.price}</span>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors flex-shrink-0"
              title="Add to order"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Order Bar */}
      <div className="p-3 bg-zinc-950 border-t border-white/10 z-10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-zinc-400">Total Order:</span>
          <span className="text-white font-bold">{cart.length} items (${totalAmount})</span>
        </div>

        <button
          onClick={handleSimulateOrder}
          disabled={cart.length === 0}
          className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-95 ${
            cart.length > 0
              ? "bg-white text-black hover:bg-zinc-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              : "bg-white/10 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {showOrderSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sent to Kitchen!</span>
            </>
          ) : (
            <>
              <QrCode className="w-3.5 h-3.5" />
              <span>Simulate Order</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
